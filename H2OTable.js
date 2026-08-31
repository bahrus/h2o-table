// @ts-check

/** @import {FeatureSpawnContext, IH2OTable, H2OTableProps, CustomData, DataRecord} from './types/h2o-table/types' */

import {extractData} from './extractData.js';

/**
 * `H2OTable` ("HTML → Object Table") — a custom element feature that scrapes the
 * host's light-DOM `[itemscope]` rows into an array of plain objects, one key
 * per configured `itemprop` name. Exposed to the host as `host.h2oTable`.
 *
 * Wiring:
 * ```js
 * customElements.assignFeatures(MyElement, {
 *     h2oTable: { customData: { itemprops: ['key', 'value'] } }
 * });
 * ```
 *
 * Consumption:
 * ```js
 * el.h2oTable.data; // DataRecord[] — re-scraped from the DOM on every read
 * ```
 *
 * @implements {IH2OTable}
 */
export class H2OTable{

    /** @type {WeakRef<HTMLElement>} */
    #hostRef;

    /**
     * The live host element.
     * @returns {HTMLElement}
     * @throws {number} `404` if the host has already been garbage-collected.
     */
    get hostElement(){
        const h = this.#hostRef.deref();
        if(h === undefined) throw 404;
        return h;
    }

    /**
     * The host's `[itemscope]` rows projected onto {@link DataRecord}s using
     * {@link H2OTable#itemprops}. Re-scraped from the DOM on every read.
     * @returns {DataRecord[]}
     */
    get data(){
        return extractData(this.hostElement, this.#itemprops);
    }

    /**
     * The `itemprop` names to extract, in order (from {@link CustomData.itemprops}).
     * @type {string[]}
     */
    #itemprops;

    /**
     * @param {HTMLElement} hostElement - the custom element this feature is attached to
     * @param {FeatureSpawnContext} ctx - spawn context; `ctx.injection.customData` carries the {@link CustomData}
     * @param {Partial<H2OTableProps>} [_initVals] - unused; the feature has no writable state
     */
    constructor(hostElement, ctx, _initVals){
        this.#hostRef = new WeakRef(hostElement);
        /** @type {CustomData} */
        const customData = ctx?.injection?.customData ?? {};
        this.#itemprops = customData.itemprops ?? [];
    }
}
