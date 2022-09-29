/**
 * Test and Demo utilities for {@link Graph|graph} traversal.
 */
import { Graph, Edge } from 'graph/graph'
import { Airport } from 'graph/demo/airport';
import { loadFile, parseJSONtoType } from 'util/common_util';
import type { Node } from 'graph/graph'

const AIRPORTS_PATH = 'data/example_airports.JSON';
const ROUTES_PATH = 'data/example_routes.JSON';

/**
 * Interface for example data from file, to be used for constructing {@link Airport|airport} {@link Node|nodes}. 
 */
interface AirportData {
    airport: string,
    country: string,
    iataAirportCode: string,
    timezone: number,
    altitudeFeet: number,
    altitudeMeter: number,
    latitude: number,
    longitude: number
}

/**
 * Type checker for objects, typically parsed from JSON, that should conform to the {@link AirportData} interface.
 * @param obj - Object to be type checked.
 * @returns True, if object conforms to the {@link AirportData} interface.
 */
function airportTypeGuard(obj: any): obj is AirportData {
    return "airport" in obj && typeof obj.airport === "string" &&
        "country" in obj && typeof obj.country === "string" &&
        "iataAirportCode" in obj && typeof obj.iataAirportCode === "string" &&
        "timezone" in obj && typeof obj.timezone === "number" &&
        "altitudeFeet" in obj && typeof obj.altitudeFeet === "number" &&
        "altitudeMeter" in obj && typeof obj.altitudeMeter === "number" &&
        "latitude" in obj && typeof obj.latitude === "number" &&
        "longitude" in obj && typeof obj.longitude === "number";
}

/**
 * Maps {@link AirportData} object to {@link Airport} object.
 * @param obj - AirportData object to be transformed.
 * @returns Returns new Airport object.
 */
function airportMapper(obj: AirportData): Airport {
    return new Airport(obj.airport, obj.country, obj.iataAirportCode, obj.latitude, obj.longitude)
}

/**
 * Type checker for objects, typically parsed from JSON, that should conform to the {@link Edge} type.
 * @param obj - Object to be type checked.
 * @returns True, if object conforms to the {@link Edge} type.
 */
export function edgeTypeGuard(obj: any): obj is Edge {
    return Array.isArray(obj) && obj.length === 2 && typeof obj[0] === "string" && typeof obj[1] === "string";
}

/**
 * Sets up and returns an array of {@link Airport|airport} nodes for demo and testing purposes. Used in conjunction with {@link demoEdges}.
 * @async
 * @returns Returns a Promise resolving to an {@link Airport} array.
 */
export async function demoAirports(): Promise<Airport[]> {
    return new Promise( async (resolve, reject) => {
        try {
            const airports = parseJSONtoType<AirportData>(await loadFile(AIRPORTS_PATH), airportTypeGuard).map(airportMapper);
            resolve(airports);
        }
        catch (err) {
            reject(err);
        }
    });
}

/**
 * Sets up and returns an array of {@link Edge|edges} for the nodes returned from {@link demoAirports}.
 * @async
 * @returns Returns a Promise resolving to an {@link Edge} array.
 */
export async function demoEdges(): Promise<Edge[]> {
    return new Promise( async (resolve, reject) => {
        try {
            const routes = parseJSONtoType<Edge>(await loadFile(ROUTES_PATH), edgeTypeGuard);
            resolve(routes);
        }
        catch (err) {
            reject(err);
        }
    });
}

/**
 * Sets up and returns a graph for demo and testing purposes.
 * @async
 * @returns Returns a Promise resolving to a {@link Graph}, preloaded with {@link Airport} nodes and edges.
 */
export async function demoGraph(): Promise<Graph<Airport>> {
    return new Promise( async (resolve, reject) => {
        try {
            const graph = new Graph<Airport>(await demoAirports(), await demoEdges());
            resolve(graph);
        }
        catch (err) {
            reject(err);
        }
    });
}

/**
 * Prints out items of the example Airport class as a table.
 * @param airports Array of {@link Airport} objects.
 * @returns A multiline string with formatted airport data.
 */
export function airportPrinter(airports: Airport[]): string {
    let out = "";
    airports.forEach(apt => {
        out += `${apt.code}: ${apt.name.padEnd(32)} (${apt.country.padEnd(22)}) - lat: ${apt.lat.value.toFixed(2)}, long: ${apt.long.value.toFixed(2)}\n`;
    });
    return out;
}