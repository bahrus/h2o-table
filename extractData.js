//@ts-check
import 'assign-gingerly/object-extension.js';
import {registryItem} from 'assign-gingerly/inferencer/inferencer.js';

/**
 * 
 * @param {Element} el 
 * @param {string[]} itemprops 
 * @returns 
 */
export function extractData(el, itemprops) {
    const data = [];
    const itemScopes = el.querySelectorAll('[itemscope]');
    for (const itemScope of itemScopes) {
        /** @type {any} */
        const item = {};
        for (const prop of itemprops) {
            const itemProp = itemScope.querySelector(`[itemprop="${prop}"]`);
            if (itemProp === null) {
                continue;
            }
            const inferencer = itemProp.enh.get(registryItem)
            item[prop] = inferencer.value;
        }
        data.push(item);
    }
    return data;
}
