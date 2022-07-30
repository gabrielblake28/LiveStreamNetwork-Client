import { CarouselMovement } from "../def/CarouselMovement";
import { ICarouselController } from "../def/ICarouselController";

export class CarouselController implements ICarouselController {
  CalculateIndexOnWindowResize(
    screenSize: number,
    index: number,
    numOfEvents: number
  ): number {
    if (index >= numOfEvents) return 0;
    if (screenSize <= 0) return 0;
    if (index < 0) return 0;

    if (this.GetNumberOfEventsPerSlide(screenSize) + index > numOfEvents) {
      return numOfEvents - this.GetNumberOfEventsPerSlide(screenSize) - index;
    }

    return 0;
  }
  CalculatePosition(screenSize: number, currentIndex: number): number {
    return Math.ceil(currentIndex / this.GetNumberOfEventsPerSlide(screenSize));
  }

  CalculateProgressBarLength(screenSize: number, numOfEvents: number): number {
    return Math.ceil(numOfEvents / this.GetNumberOfEventsPerSlide(screenSize));
  }

  CalculateTransform(
    screenSize: number,
    index: number,
    numOfEvents: number
  ): number {
    if (this.GetNumberOfEventsPerSlide(screenSize) + index > numOfEvents) {
      return (
        (100 / this.GetNumberOfEventsPerSlide(screenSize)) * index -
        (this.GetNumberOfEventsPerSlide(screenSize) + index - numOfEvents) *
          (100 / this.GetNumberOfEventsPerSlide(screenSize))
      );
    }
    return (100 / this.GetNumberOfEventsPerSlide(screenSize)) * index;
  }

  NextSlide(
    screenSize: number,
    currentIndex: number,
    numOfEvents: number
  ): CarouselMovement {
    const evalIndex = this.GetNumberOfEventsPerSlide(screenSize) + currentIndex;

    if (numOfEvents - evalIndex <= 0)
      return {
        index: 0,
        translation: 0,
      };
    if (currentIndex < 0) return { index: 0, translation: 0 };
    if (screenSize <= 0)
      return {
        index: 0,
        translation: 0,
      };

    return numOfEvents - evalIndex >= this.GetNumberOfEventsPerSlide(screenSize)
      ? { index: this.GetNumberOfEventsPerSlide(screenSize), translation: 100 }
      : {
          index: numOfEvents - evalIndex,
          translation:
            (numOfEvents - evalIndex) *
            (100 / this.GetNumberOfEventsPerSlide(screenSize)),
        };
  }
  PrevSlide(
    screenSize: number,
    currentIndex: number,
    numOfEvents: number
  ): CarouselMovement {
    if (currentIndex > numOfEvents) {
      return { index: 0, translation: 0 };
    }

    if (currentIndex <= 0) return { index: 0, translation: 0 };

    if (currentIndex < this.GetNumberOfEventsPerSlide(screenSize)) {
      return {
        index: currentIndex,
        translation:
          currentIndex * (100 / this.GetNumberOfEventsPerSlide(screenSize)),
      };
    }

    return {
      index: this.GetNumberOfEventsPerSlide(screenSize),
      translation: 100,
    };
  }

  private GetNumberOfEventsPerSlide(screenSize: number): number {
    let numberOfEvents: number;

    if (screenSize >= 2200) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents2200;
    } else if (screenSize >= 1950) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents1950;
    } else if (screenSize >= 1600) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents1600;
    } else if (screenSize >= 1250) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents1250;
    } else if (screenSize >= 900) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents900;
    } else if (screenSize >= 500) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents500;
    } else {
      numberOfEvents = ScreenSizeConstants.numberOfEventsMin;
    }

    return numberOfEvents;
  }
}

export class ScreenSizeConstants {
  static numberOfEvents2200: number = 7;
  static numberOfEvents1950: number = 6;
  static numberOfEvents1600: number = 5;
  static numberOfEvents1250: number = 4;
  static numberOfEvents900: number = 3;
  static numberOfEvents500: number = 2;
  static numberOfEventsMin: number = 1;

  static GetNumberOfEventsPerSlide(screenSize: number): number {
    let numberOfEvents: number;

    if (screenSize >= 2200) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents2200;
    } else if (screenSize >= 1950) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents1950;
    } else if (screenSize >= 1600) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents1600;
    } else if (screenSize >= 1250) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents1250;
    } else if (screenSize >= 900) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents900;
    } else if (screenSize >= 500) {
      numberOfEvents = ScreenSizeConstants.numberOfEvents500;
    } else {
      numberOfEvents = ScreenSizeConstants.numberOfEventsMin;
    }

    return numberOfEvents;
  }
}
