export const { apply, getOwnPropertyDescriptor } = Reflect;
export const { createElement: rawCreateElement } = Document.prototype;
export const { getAttribute: rawGetAttribute, querySelectorAll: rawQuerySelectorAll, setAttribute: rawSetAttribute, } = HTMLElement.prototype;
export const rawChildNodes = getOwnPropertyDescriptor(Node.prototype, 'childNodes').get;
//# sourceMappingURL=util.js.map