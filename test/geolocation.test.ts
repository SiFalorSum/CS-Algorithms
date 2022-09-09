import { describe, expect, test } from '@jest/globals';
import { GeoLocation } from '../src/geolocation';

describe("GeoLocation tests", () => {
    const pt1 = new GeoLocation(55.617777777777775, 12.655833333333334); // Copenhagen
    const pt2 = new GeoLocation(59.651944444444446, 17.91861111111111); // Stockholm/Arlanda

    test("Calculate great circle distance between two points on a globe", () => {
        const dist1 = pt1.distance(pt2);
        const facit = 547.9872; // km
        expect( Math.abs(dist1-facit) ).toBeLessThan(dist1*0.01);
    });
    
    test("Distance should be equal in both directions", () => {
        const dist1 = pt1.distance(pt2);
        const dist2 = pt2.distance(pt1);
        expect( dist1 ).toBe( dist2 );
    });
    
    test("Distance to itself should be zero", () => {
        const dist0 = pt1.distance(pt1);
        expect( dist0 ).toBe( 0 );
    });
    // test("", () => {});
});