import home from './pages/homePage';
import singleitem from './pages/singleitemPages';
import favourites from './pages/favouritesPage';
import bids from './pages/bidsPage';
import error from './pages/errorPages';
import EventEmitter from './utils/EventEmitter';
import Favourites from './favours/favoursModel';

// глобальный объект для хранения и предоставления данных другим компонентам приложения
const state = {
    results: [],
    emitter: new EventEmitter(),
    favourites: new Favourites(),
} 



// Только для тестирования!!!!!!!!!!
window.state = state;


const routes = [
    { path: '/', component: home },
    { path: 'item', component: singleitem },
    { path: 'favourites', component: favourites },
    { path: 'bids', component: bids },
    { path: 'error', component: error },
];


function findComponentByPath(path, routes){
    return routes.find(function(route){
        // console.log("функция find" ,route)
        return route.path === path;
    })
}

function router(){

    const pathArray = location.hash.split('/'); 
    // console.log(" pathArray:", pathArray) 

    let currentPath = pathArray[0] ==='' ? '/': pathArray[1]; // условие ? выражение1 : выражение2
    currentPath = currentPath === '' ? '/': currentPath; 

    // сохраняем в state под ключем routeParams: id - адрес карточки 
    state.routeParams = pathArray[2] ? pathArray[2] : "";

    const { component = error } = findComponentByPath(currentPath, routes) || {};

    component(state);
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);