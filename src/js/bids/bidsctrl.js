import * as view from "./bidsview";
import Bids from "./bidsmodel";
import { async } from "regenerator-runtime";

export default async function (state){
    

    if (!state.bids) state.bids = new Bids();

    await state.bids.getBids();

    view.renderBids(state.bids.bids);
}