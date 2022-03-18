/**
 * @jest-environment jsdom
 */

const { test, expect } = require('@jest/globals');
const lib = require('../main.js');

test('inputElement ', () => {
    expect(lib.updateInputValue()).toEqual(undefined);
});