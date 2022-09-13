export interface Angle {
    value: number,
    sin: number,
    cos: number,
}

/**
 * Demo class holding a coordinate pair in degrees and their coresponding sine and cosine values,
 * as well as a function for approximate distance to another GeoLocation object.
 * @constructor
 * @param {number} lat - Latitude in decimal degrees.
 * @param {number} long - Longitude in decimal degrees.
 *  */
export class GeoLocation {
    lat: Angle;
    long: Angle;

    // Earth's arithmetic mean radius in km as defined in WGS84.
    private EARTH_RADIUS = 6371.0088;

    constructor(lat: number, long: number) {
        this.checkCoord(lat, long);
        this.lat = {
            value: lat,
            sin: this.sin(lat),
            cos: this.cos(lat),
        }
        this.long = {
            value: long,
            sin: this.sin(long),
            cos: this.cos(long),
        }
    }

    /**
     * Calculates the approximate distance from this GeoLocation to another, assuming a spherical earth.
     * @method
     * @param {GeoLocation} loc 
     * @returns distance in km. Assume an error margin of 1%
     */
    distance(loc: GeoLocation): number {
        let x2 = (this.lat.cos*this.long.cos - loc.lat.cos*loc.long.cos) ** 2;
        let y2 = (this.lat.cos*this.long.sin - loc.lat.cos*loc.long.sin) ** 2;
        let z2 = (this.lat.sin - loc.lat.sin) ** 2;
        return 2 * this.EARTH_RADIUS * Math.asin( Math.sqrt(x2 + y2 + z2) / 2 );
    }

    // Converts degrees to radians.
    private deg2rad(deg: number): number {
        return deg * Math.PI / 180;
    }
    
    private sin(deg: number): number {
        return Math.sin(this.deg2rad(deg));
    }
    
    private cos(deg: number): number {
        return Math.cos(this.deg2rad(deg));
    }
    
    private checkCoord(lat: number, long: number) {
        if ( lat < -90 || lat > 90 ) throw new Error("Latitude out of bounds!");
        if ( long < -180 || long > 180 ) throw new Error("Longitude out of bounds!");
    }
}
