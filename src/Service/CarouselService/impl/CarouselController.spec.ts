import sinon, { SinonSandbox } from "sinon";
import chai, { expect } from "chai";
import sinonchai from "sinon-chai";
import { CarouselController } from "./CarouselController";
import { Calculate } from "@mui/icons-material";

chai.use(sinonchai);

let sandBox: SinonSandbox;
let carouselController: CarouselController;

describe("CarouselControllerTest", () => {
  before(() => {
    sandBox = sinon.createSandbox();
    carouselController = new CarouselController();
  });

  beforeEach(() => {});

  afterEach(() => {});

  describe("calculate correct position for screen size and index", () => {
    it("when index is 0 the position returned should also be 0", () => {
      let position = carouselController.CalculatePosition(2200, 0);

      expect(position).to.equal(0);
    });

    it("return the expected position for each screensize and position passed", () => {
      let position = carouselController.CalculatePosition(2200, 3);

      expect(position).to.equal(1);

      position = carouselController.CalculatePosition(2200, 12);

      expect(position).to.equal(2);

      position = carouselController.CalculatePosition(2200, 23);

      expect(position).to.equal(4);

      position = carouselController.CalculatePosition(1950, 0);

      expect(position).to.equal(0);

      position = carouselController.CalculatePosition(1950, 6);

      expect(position).to.equal(1);

      position = carouselController.CalculatePosition(900, 23);

      expect(position).to.equal(8);

      position = carouselController.CalculatePosition(1250, 15);

      expect(position).to.equal(4);

      position = carouselController.CalculatePosition(1600, 9);

      expect(position).to.equal(2);

      position = carouselController.CalculatePosition(1600, 19);

      expect(position).to.equal(4);

      position = carouselController.CalculatePosition(1600, 21);

      expect(position).to.equal(5);
    });
  });

  it("calculate the length of the progress bar", () => {
    let length = carouselController.CalculateProgressBarLength(2200, 0);

    expect(length).to.equal(0);

    length = carouselController.CalculateProgressBarLength(2200, 20);

    expect(length).to.equal(3);

    length = carouselController.CalculateProgressBarLength(2200, 24);

    expect(length).to.equal(4);

    length = carouselController.CalculateProgressBarLength(1650, 24);

    expect(length).to.equal(5);

    length = carouselController.CalculateProgressBarLength(1699, 24);

    expect(length).to.equal(5);

    length = carouselController.CalculateProgressBarLength(950, 24);

    expect(length).to.equal(8);

    length = carouselController.CalculateProgressBarLength(950, 19);

    expect(length).to.equal(7);

    length = carouselController.CalculateProgressBarLength(300, 25);

    expect(length).to.equal(25);
  });
  it("get the next slide in the carousel", () => {
    let slide = carouselController.NextSlide(2200, 0, 24);
    expect(slide).to.eql({ index: 7, translation: 100 });

    slide = carouselController.NextSlide(2200, 21, 24);

    expect(slide).to.eql({ index: 0, translation: 0 });

    slide = carouselController.NextSlide(1950, 18, 24);
    expect(slide).to.eql({ index: 0, translation: 0 });

    slide = carouselController.NextSlide(1950, 1, 24);
    expect(slide).to.eql({ index: 6, translation: 100 });

    slide = carouselController.NextSlide(1250, 6, 13);
    expect(slide).to.eql({ index: 3, translation: (100 / 4) * 3 });

    slide = carouselController.NextSlide(952, 3, 0);
    expect(slide).to.eql({ index: 0, translation: 0 });

    slide = carouselController.NextSlide(700, -1000, 50);
    expect(slide).to.eql({ index: 0, translation: 0 });

    slide = carouselController.NextSlide(-1600, 2, 24);
    expect(slide).to.eql({ index: 0, translation: 0 });
  });
  it("get the previous slide in the carousel", () => {
    let slide = carouselController.PrevSlide(2200, 0, 24);
    expect(slide).to.eql({ index: 0, translation: 0 });

    slide = carouselController.PrevSlide(2200, 10, 24);
    expect(slide).to.eql({ index: 7, translation: 100 });

    slide = carouselController.PrevSlide(2200, 3, 35);
    expect(slide).to.eql({ index: 3, translation: (100 / 7) * 3 });

    slide = carouselController.PrevSlide(2200, 22, 24);
    expect(slide).to.eql({ index: 7, translation: 100 });

    slide = carouselController.PrevSlide(300, 1, 25);
    expect(slide).to.eql({ index: 1, translation: 100 });

    slide = carouselController.PrevSlide(600, 1, 24);
    expect(slide).to.eql({ index: 1, translation: 50 });

    slide = carouselController.PrevSlide(600, 1, 23);
    expect(slide).to.eql({ index: 1, translation: 50 });

    slide = carouselController.PrevSlide(2200, -5, 24);
    expect(slide).to.eql({ index: 0, translation: 0 });

    slide = carouselController.PrevSlide(2200, 0, 1000);
    expect(slide).to.eql({ index: 0, translation: 0 });

    slide = carouselController.PrevSlide(2200, 2, 24);
    expect(slide).to.eql({ index: 2, translation: (100 / 7) * 2 });

    slide = carouselController.PrevSlide(1600, 4, 24);
    expect(slide).to.eql({ index: 4, translation: (100 / 5) * 4 });

    slide = carouselController.PrevSlide(1600, 22, 24);
    expect(slide).to.eql({ index: 5, translation: 100 });
  });

  it("calculate the transform for given screensize and index", () => {
    let transform = carouselController.CalculateTransform(2200, 15, 24);

    expect(transform).to.equal((100 / 7) * 15);

    transform = carouselController.CalculateTransform(2200, 0, 24);

    expect(transform).to.equal((100 / 7) * 0);

    transform = carouselController.CalculateTransform(1500, 20, 24);

    expect(transform).to.equal((100 / 4) * 20);
  });

  it("calculate the index on screen resize", () => {
    let index = carouselController.CalculateIndexOnWindowResize(2200, 2, 24);

    expect(index).to.equal(0);

    index = carouselController.CalculateIndexOnWindowResize(2200, 18, 24);

    expect(index).to.equal(-1);

    index = carouselController.CalculateIndexOnWindowResize(1950, 20, 24);

    expect(index).to.equal(-2);

    index = carouselController.CalculateIndexOnWindowResize(-500, 4, 24);

    expect(index).to.equal(0);

    index = carouselController.CalculateIndexOnWindowResize(700, 50, 24);

    expect(index).to.equal(0);

    index = carouselController.CalculateIndexOnWindowResize(1200, -3, 40);

    expect(index).to.equal(0);
  });
});
