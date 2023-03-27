import filter from './../filter/filterCtrl';
import listing from '../listing/listingCtrl';
import { async } from 'regenerator-runtime';

export default async function(state){
    document.querySelector("#app").innerHTML = "";
    await filter(state);
    listing(state);
}