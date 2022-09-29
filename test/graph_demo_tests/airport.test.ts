import { describe, expect, test } from '@jest/globals';
import { Airport } from 'graph/demo/airport';

describe("Airport tests", () => {
    const goodName = "Goodest of Names";
    const IATA = "ABC";
    const badIATA1 = "ABCD";
    const badIATA2 = "abc";

    test("Valid names and IATA code should not cause an exception", () => {
        expect(() => {new Airport(goodName, goodName, IATA, 0, 0)}).not.toThrow();
    });

    test("Incorrect IATA codes should cause an exception", () => {
        expect(() => {new Airport(goodName, goodName, badIATA1, 0, 0)}).toThrow(`Invalid format of Airport code: ${badIATA1}`);
        expect(() => {new Airport(goodName, goodName, badIATA2, 0, 0)}).toThrow(`Invalid format of Airport code: ${badIATA2}`);
    });
});