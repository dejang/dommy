import { rawCreateElement, apply } from "./util";
import { markNode } from "./isolation";
export function factoryCreateElement(key) {
    return function createElement(...args) {
        const el = apply(rawCreateElement, this, args);
        markNode(el, key);
        return el;
    };
}
//# sourceMappingURL=document.js.map