import { GeoLocation } from "./geolocation";
import { Node } from "./graph";

/* *
 * Example class implementing the {@link Node} interface to be used in a {@link undirectedGraph.Graph|graph}. FIXME!
 * @constructor
 * @param {string} name - The full name of the airport, with initial capital letter.
 * @param {string} country - The country name, with initial capital letter.
 * @param {string} code - The IATA airport code, used as node id.
 * @param {number} lat - Latitude in decimal degrees.
 * @param {number} long - Longitude in decimal degrees.
 * @extends GeoLocation
 * @implements {Node}
 */
export class Airport extends GeoLocation implements Node {
    name: string;
    country: string;
    code: string;

    private nameRegex = /^[A-Z]\w+(\s\w+)*$/;
    private codeRegex = /^[A-Z]{3}$/;

    constructor(name: string, country: string, code: string, lat: number, long: number) {
        super(lat, long);
        if ( !this.nameRegex.test(name) ) throw new Error(`Invalid format of Airport name: ${name}`);
        if ( !this.nameRegex.test(country) ) throw new Error(`Invalid format of Airport country: ${country}`);
        if ( !this.codeRegex.test(code) ) throw new Error(`Invalid format of Airport code: ${code}`);
        this.name = name;
        this.country = country;
        this.code = code;
    }

    getId(): string {
        return this.code;
    }

    cost(node: Airport): number {
        return this.distance(node);
    }
}