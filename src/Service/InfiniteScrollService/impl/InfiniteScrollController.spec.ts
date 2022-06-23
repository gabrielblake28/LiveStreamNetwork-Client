import chai, { expect } from "chai";
import sinonchai from "sinon-chai";
import { InfiniteScrollController } from "./InfiniteScrollController";
import Sinon from "sinon";

chai.use(sinonchai);

let scrollController: InfiniteScrollController;
let sandBox: Sinon.SinonSandbox;
describe('Infinite Scroll Tests', () => {  
    before(() => {
        sandBox = Sinon.createSandbox();
        scrollController = new InfiniteScrollController()
    })
})