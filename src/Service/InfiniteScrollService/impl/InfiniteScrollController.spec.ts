import chai, { expect } from "chai";
import sinonchai from "sinon-chai";
import { InfiniteScrollController } from "./InfiniteScrollController";
import Sinon from "sinon";
import { MockEventProvider } from "./MockEventProvider";
import { ElementverticalPosition } from "../def/ElementPosition";

chai.use(sinonchai);

let sc: InfiniteScrollController;
let sandBox: Sinon.SinonSandbox;
describe.only("Infinite Scroll Tests", () => {
  before(() => {
    sandBox = Sinon.createSandbox();
  });

  beforeEach(() => {
    sc = new InfiniteScrollController(new MockEventProvider(), 1250);
  });

  it("Should set the proper default values when constructed", () => {
    expect(sc.CurrentPage).to.equal(0);
    expect(sc.Limit).to.equal(24);
    expect(sc.MaxElementsToRender).to.equal(Infinity);
  });

  it("Should add a page of events", async () => {
    const result = await sc.NextPage();

    expect(sc.CurrentPage).to.equal(1);

    expect(result.length).to.equal(24);
  });
  describe("Handle screen resize", () => {
    it("Should return events buckets on screen resize", async () => {
      await sc.NextPage();

      expect(sc.CurrentPage).to.equal(1);
      expect(sc.Limit).to.equal(24);

      let result = await sc.CalculatePagesOnScreenResize(900);

      expect(sc.Limit).to.equal(18);
      expect(sc.CurrentPage).to.equal(1);

      expect(result[0].length).to.equal(18);
      expect(result[1].length).to.equal(18);

      result = await sc.CalculatePagesOnScreenResize(1600);

      expect(sc.Limit).to.equal(30);

      expect(sc.CurrentPage).to.equal(1);

      expect(result[0].length).to.equal(30);
      expect(result[1].length).to.equal(30);

      result = await sc.CalculatePagesOnScreenResize(2100);

      expect(sc.Limit).to.equal(36);

      expect(sc.CurrentPage).to.equal(1);

      expect(result[0].length).to.equal(36);

      expect(result[1].length).to.equal(36);

      result = await sc.CalculatePagesOnScreenResize(600);

      expect(sc.Limit).to.equal(12);

      expect(sc.CurrentPage).to.equal(7);

      expect(result[0].length).to.equal(12);
      expect(result[1].length).to.equal(12);
      expect(result[2].length).to.equal(12);
      expect(result[3].length).to.equal(12);
      expect(result[4].length).to.equal(12);
      expect(result[5].length).to.equal(12);
      expect(result[6].length).to.equal(6);
    });

    it("Test going from a smaller screen width to a larger screen width", async () => {
      sc = new InfiniteScrollController(new MockEventProvider(), 600);

      expect(sc.Limit).to.equal(12);
      expect(sc.CurrentPage).to.equal(0);

      await sc.NextPage();

      expect(sc.CurrentPage).to.equal(1);

      const result = await sc.CalculatePagesOnScreenResize(2100);

      expect(sc.Limit).to.equal(36);
      expect(sc.CurrentPage).to.equal(0);

      expect(result.length).to.equal(1);

      expect(result[0].length).to.equal(36);
    });
  });

  it("Should return true when ViewPort Position when ViewPort intersects a page", async () => {
    let result = sc.IsPageInViewPort(
      {
        Height: 500,
        PositionY: 1000,
      },
      {
        Height: 300,
        PositionY: 1400,
      }
    );

    expect(result).to.equal(true);

    result = sc.IsPageInViewPort(
      { Height: 1000, PositionY: 10000 },
      { PositionY: 10100, Height: 300 }
    );

    expect(result).to.equal(true);

    result = sc.IsPageInViewPort(
      { Height: 500, PositionY: 1000 },
      { PositionY: 2000, Height: 300 }
    );

    expect(result).to.equal(false);

    result = sc.IsPageInViewPort(
      { Height: 500, PositionY: 1000 },
      { PositionY: 0, Height: 300 }
    );

    expect(result).to.equal(false);

    result = sc.IsPageInViewPort(
      { Height: 500, PositionY: 1000 },
      { PositionY: 1000, Height: 300 }
    );

    expect(result).to.equal(true);
  });

  it("Should return false when elements.length is greater than MaxElementsToRender", async () => {
    sc.MaxElementsToRender = 30;

    await sc.NextPage();
    await sc.NextPage();

    const result = sc.ShouldGetPage();

    expect(result).to.equal(false);
  });

  it("Should return true when elements.length is less than MaxElementsToRender", async () => {
    sc.MaxElementsToRender = 30;
    let result = sc.ShouldGetPage();
    await sc.NextPage();

    result = sc.ShouldGetPage();

    expect(result).to.equal(true);

    await sc.NextPage();

    result = sc.ShouldGetPage();

    expect(result).to.equal(false);
  });
});
