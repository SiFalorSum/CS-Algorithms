const EARTH_RADIUS = 6371;

function deg2rad(deg: number): number {
    return deg * Math.PI / 180;
}

function sin(deg: number): number {
    return Math.sin(deg2rad(deg));
}

function cos(deg: number): number {
    return Math.cos(deg2rad(deg));
}

function checkCoord(lat: number, long: number) {
    if ( lat < -90 || lat > 90 ) throw new Error("Latitude out of bounds!");
    if ( long < -180 || long > 180 ) throw new Error("Longitude out of bounds!");
}

export interface Angle {
    value: number,
    sin: number,
    cos: number,
}

export class GeoLocation {
    lat: Angle;
    long: Angle;

    constructor(lat: number, long: number) {
        checkCoord(lat, long);
        this.lat = {
            value: lat,
            sin: sin(lat),
            cos: cos(lat),
        }
        this.long = {
            value: long,
            sin: sin(long),
            cos: cos(long),
        }
    }

    distance(loc: GeoLocation): number {
        let x2 = Math.pow( (this.lat.cos*this.long.cos - loc.lat.cos*loc.long.cos), 2);
        let y2 = Math.pow( (this.lat.cos*this.long.sin - loc.lat.cos*loc.long.sin), 2);
        let z2 = Math.pow( (this.lat.sin - loc.lat.sin), 2);
        return 2 * EARTH_RADIUS * Math.asin( Math.sqrt(x2 + y2 + z2) / 2 );
    }
}
