import { hasKey, markNode, scanAndExecute } from '../dist/lib';

it('markNode success', () => {
    const element = document.createElement('div');
    markNode(element, 'foo');
    expect(hasKey(element, 'foo')).toBe(true);
});

it('scanAndExecute success', () => {
    const el = document.createElement('div');
    el.innerHTML = `<div><div><div></div></div></div>`;
    scanAndExecute(el, (node) => markNode(node, 'foo'));
    expect(el.outerHTML).toBe('<div _key_="foo"><div _key_="foo"><div _key_="foo"><div _key_="foo"></div></div></div></div>');
});