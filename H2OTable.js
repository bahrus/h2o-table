// @ts-check

import {extractData} from './extractData.js';

export class H2OTable{
    /** @type {any} */
    #data;

    get data(){
        return this.#data;
    }
    /**
     * 
     * @param {HTMLElement} hostElement 
     */
    constructor(hostElement){
        this.#data = extractData(hostElement)
    }
}