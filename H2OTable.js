// @ts-check

import {extractData} from './extractData.js';

export class H2OTable{

    /** @type {WeakRef<HTMLElement>} */
    #hostRef;

    get hostElement(){
        const h = this.#hostRef.deref();
        if(h === undefined) throw 404;
        return h;
    }

    get data(){
        return extractData(this.hostElement, this.#itemprops);
    }

    /**
     * @type {string[]}
     */
    #itemprops;
    /**
     * 
     * @param {HTMLElement} hostElement 
     * @param {FeatureSpawnContext} ctx
     * @param {Partial<H2OTableProps>} [initVals]
     */
    constructor(hostElement, ctx, initVals){
        this.#hostRef = new WeakRef(hostElement);
        const {injection} = ctx;
        const {customData} = injection;
        const {itemprops} = customData;
        this.#itemprops = itemprops;
        
    }
}