const geo = require('../out/geolocation');

test("Calculate great circle distance between two points on a globe", () => {
    const pt1 = new geo.GeoLocation(55.617777777777775, 12.655833333333334); // Copenhagen
    const pt2 = new geo.GeoLocation(59.651944444444446, 17.91861111111111); // Stockholm / Arlanda
    const dist1 = pt1.distance(pt2);
    const dist2 = pt2.distance(pt1);
    const dist0 = pt1.distance(pt1);
    const facit = 544; // km
    expect( Math.abs(dist1-facit) ).toBeLessThan(10);
    expect( dist1 ).toBe( dist2 );
    expect( dist0 ).toBe( 0 );
});