export declare const apply: typeof Reflect.apply, getOwnPropertyDescriptor: typeof Reflect.getOwnPropertyDescriptor;
export declare const rawCreateElement: {
    <K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions | undefined): HTMLElementTagNameMap[K];
    <K_1 extends keyof HTMLElementDeprecatedTagNameMap>(tagName: K_1, options?: ElementCreationOptions | undefined): HTMLElementDeprecatedTagNameMap[K_1];
    (tagName: string, options?: ElementCreationOptions | undefined): HTMLElement;
};
export declare const rawGetAttribute: (qualifiedName: string) => string | null, rawQuerySelectorAll: {
    <K extends keyof HTMLElementTagNameMap>(selectors: K): NodeListOf<HTMLElementTagNameMap[K]>;
    <K_1 extends keyof SVGElementTagNameMap>(selectors: K_1): NodeListOf<SVGElementTagNameMap[K_1]>;
    <E extends Element = Element>(selectors: string): NodeListOf<E>;
}, rawSetAttribute: (qualifiedName: string, value: string) => void;
export declare const rawChildNodes: () => any;
export declare const rawNextSibling: () => any;
export declare const rawParentElement: () => any;
export declare const rawParentNode: () => any;
export declare const rawPreviousSibling: () => any;
export declare const rawTextContent: () => any;
//# sourceMappingURL=util.d.ts.map