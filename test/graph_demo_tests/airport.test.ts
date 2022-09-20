import { describe, expect, test } from '@jest/globals';
import { Airport } from '../../src/graph_demo/airport';

describe("Airport tests", () => {
    test("Incorrect name or IATA code formats should cause an exception", () => {
        const goodName = "Goodest of Names";
        const badName1 = " Bad";
        const badName2 = "Bad ";
        const badName3 = "bad";
        const badName4 = "123";
        const IATA = "ABC";
        const badIATA1 = "ABCD";
        const badIATA2 = "abc";

        // Valid name formats 
        expect(() => {new Airport(goodName, goodName, IATA, 0, 0)}).not.toThrow();

        // Invalid IATA codes
        expect(() => {new Airport(goodName, goodName, badIATA1, 0, 0)}).toThrow(`Invalid format of Airport code: ${badIATA1}`);
        expect(() => {new Airport(goodName, goodName, badIATA2, 0, 0)}).toThrow(`Invalid format of Airport code: ${badIATA2}`);

        // Invalid airport or country names
        expect(() => {new Airport(goodName, badName1, IATA, 0, 0)}).toThrow(`Invalid format of Airport country: ${badName1}`);
        expect(() => {new Airport(badName2, goodName, IATA, 0, 0)}).toThrow(`Invalid format of Airport name: ${badName2}`);
        expect(() => {new Airport(badName3, goodName, IATA, 0, 0)}).toThrow(`Invalid format of Airport name: ${badName3}`);
        expect(() => {new Airport(badName4, goodName, IATA, 0, 0)}).toThrow(`Invalid format of Airport name: ${badName4}`);
    });
    // test("", () => {});
});