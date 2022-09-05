import { GeoLocation } from "./geolocation";

const nameRegex = /^[A-Z]\w+(\s\w+)*$/;
const codeRegex = /^[A-Z]{3}$/;

export interface Node {
    getId(): string,
    cost(node: Node): number
}

export class Airport extends GeoLocation implements Node {
    name: string;
    country: string;
    code: string;

    constructor(name: string, country: string, code: string, lat: number, long: number) {
        if ( !nameRegex.test(name) ) throw new Error(`Invalid format of Airport name: ${name}`);
        if ( !nameRegex.test(country) ) throw new Error(`Invalid format of Airport country: ${country}`);
        if ( !codeRegex.test(code) ) throw new Error(`Invalid format of Airport code: ${code}`);
        super(lat, long);
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