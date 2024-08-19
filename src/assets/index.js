
/**
 * imports images and related from process of JS, rather than after 
 * due to issues with deployment.
 */

import CityScapeData from "./tiledAssets/mapTest3/map.json"
import CityScape from "./terrain.png"

import playerAtlasData from "./atlas/blah.json"
import test from './atlas/blah.png'
// import test from "./atlas"

export const atlas = {
    playerAtlas : playerAtlasData,
    image : test
}

export const moveMeLater = {
    map : CityScape,
    tileData : CityScapeData,
    player:test
}