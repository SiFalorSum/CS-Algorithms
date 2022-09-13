import { Graph } from './graph';
import { Airport } from './airport';
import { Astar } from './astar';
import * as fs from 'node:fs';

const AIRPORTS_PATH = '../data/example_airports.JSON';
const ROUTES_PATH = '../data/example_routes.JSON';

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

function loadFile(fileName: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
}

function parseAirportData(data: string): Airport[] {
    return (JSON.parse(data) as AirportData[])
        .map(apt => new Airport(apt.airport, apt.country, apt.iataAirportCode, apt.latitude, apt.longitude));
}

function parseRouteData(data: string): [[string, string]] {
    return JSON.parse(data);
}

async function initGraph(): Promise<Graph<Airport>> {
    return new Promise( async (resolve, reject) => {
        try {
            const airports = parseAirportData(await loadFile(AIRPORTS_PATH));
            const routes = parseRouteData(await loadFile(ROUTES_PATH));
            const graph = new Graph<Airport>(airports);
            routes.forEach(route => graph.addEdge(...route));
            resolve(graph);
        }
        catch (err) {
            reject(err);
        }
    });
}

async function main() {
    try {
        const astar = new Astar(await initGraph());
        console.log(astar.findPath("MAN", "FCO"));
    }
    catch (err) {
        console.error(err);
    }
}

main();