import { hasKey } from "./isolation";
import { apply, rawChildNodes } from "./util";
// childNodes
export function factoryChildNodes(key) {
    return function childNodes() {
        const nodes = apply(rawChildNodes, this, []);
        const filteredNodes = [];
        for (let i = 0, len = nodes.length; i < len; i++) {
            const n = nodes[i];
            if (n.nodeType === 1 && hasKey(n, key)) {
                filteredNodes.push(n);
            }
            else if (n.nodeType !== 1) {
                filteredNodes.push(n);
            }
        }
        return filteredNodes;
    };
}
//# sourceMappingURL=node.js.map