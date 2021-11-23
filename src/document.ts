import { rawCreateElement, apply } from "./util"
import { markNode } from "./isolation";

export function factoryCreateElement(key: string) {
    return function createElement(this: any, ...args: Parameters<typeof Document.prototype.createElement>): ReturnType<typeof Document.prototype.createElement> {
        const el = apply(rawCreateElement, this, args);
        markNode(el, key);
        return el;
    }
}