import { CarouselMovement } from "./CarouselMovement";

export interface ICarouselController {
  /**
   * Calculate the position of the progress bar and events in the carousel based on the screen size
   * @param screenSize size of the window
   * @param currentIndex the index of the first event on the current slide
   */
  CalculatePosition(screenSize: number, currentIndex: number): number;

  /**
   * Calculate the length of the progress bar based on the size of the screen
   * @param screenSize size of the window
   * @param numOfEvents number of events
   */
  CalculateProgressBarLength(screenSize: number, numOfEvents: number): number;

  /**
   * When resizing window, index needs to adjust when going from smaller screen to larger screen
   * @param screenSize size  of the window
   * @param index the index of the first event on the current slide
   * @param numOfEvents number of events
   * @returns relative amount the index needs to change
   */
  CalculateIndexOnWindowResize(
    screenSize: number,
    index: number,
    numOfEvents: number
  ): number;

  /**
   * Calculate the transform for a given screen size and index
   * @param screenSize size of the window
   * @param index the index of the first event on the current slide
   * @param numOfEvents number of events
   */
  CalculateTransform(
    screenSize: number,
    index: number,
    numOfEvents: number
  ): number;

  /**
   * Go to next slide in the carousel
   * @param screenSize size of the window
   * @param currentIndex index of the first event in the current slide of the carousel
   * @param numOfEvents number of events
   * @returns snapshot of a translation and position of carousel
   */
  NextSlide(
    screenSize: number,
    currentIndex: number,
    numOfEvents: number
  ): CarouselMovement;

  /**
   * Go to previous slide in the carousel
   * @param screenSize size of the window
   * @param currentIndex index of the first event in the current slide of the carousel
   * @param numOfEvents number of events
   * returns snapshot a translation and position of carousel
   */
  PrevSlide(
    screenSize: number,
    currentIndex: number,
    numOfEvents: number
  ): CarouselMovement;
}
