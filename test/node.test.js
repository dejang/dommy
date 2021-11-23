import { factoryChildNodes, hasKey } from '../dist/lib'
import { apply } from '../dist/util';

it('childNodes', () => {
    const childNodes = factoryChildNodes('foo');

    const el = document.createElement('div');
    el.innerHTML = '<div _key_="bar"></div><div _key_="foo"></div>this text';
    const nodes = apply(childNodes, el, []);
    expect(nodes.length).toBe(2);
    expect(nodes[0].nodeType).toBe(1);
    expect(hasKey(nodes[0], 'foo')).toBe(true);
    expect(nodes[1].nodeType).toBe(3);
});