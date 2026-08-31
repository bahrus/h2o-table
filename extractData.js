//@ts-check
import 'assign-gingerly/object-extension.js';
import {registryItem} from 'assign-gingerly/inferencer/inferencer.js';

/** @import {DataRecord} from './types/h2o-table/types' */

/**
 * Scrape every `[itemscope]` descendant of `el` into a plain object, reading the
 * listed `itemprop` names through the assign-gingerly inferencer (so `<data>` /
 * `<input type=number>` yield numbers, `<time>` yields a date string, form
 * controls yield their `value`, and anything else yields `textContent`).
 *
 * @param {Element} el - container to search (typically the host custom element)
 * @param {string[]} itemprops - `itemprop` names to pull from each row, in order
 * @returns {DataRecord[]} one record per `[itemscope]`, in document order
 */
export function extractData(el, itemprops) {
    /** @type {DataRecord[]} */
    const data = [];
    const itemScopes = el.querySelectorAll('[itemscope]');
    for (const itemScope of itemScopes) {
        /** @type {DataRecord} */
        const item = {};
        for (const prop of itemprops) {
            const itemProp = itemScope.querySelector(`[itemprop="${prop}"]`);
            if (itemProp === null) {
                continue;
            }
            const inferencer = /** @type {any} */ (itemProp).enh.get(registryItem);
            item[prop] = inferencer.value;
        }
        data.push(item);
    }
    return data;
}
