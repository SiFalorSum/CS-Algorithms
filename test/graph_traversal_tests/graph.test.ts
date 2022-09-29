import { describe, expect, test, beforeAll, beforeEach } from '@jest/globals';
import { Airport } from 'graph/demo/airport';
import { Graph, Edge } from 'graph/graph';
import { demoAirports, demoEdges } from 'util/graph_util';

describe("Graph tests", () => {
    var nodes: Airport[];
    var edges: Edge[];
    var graph: Graph<Airport>;

    const NODE_ID = "ALA";
    const BAD_ID = "badId";
    const EDGE: Edge = ["ALA", "OVB"];
    const BAD_EDGE: Edge = ["ALA", "ALA"];
    const SXF = "SXF";
    const sxfAirport = new Airport(
        "Berlin Schönefeld Airport",
        "Germany",
        "SXF",
        52.38,
        13.5225);

    beforeAll(async () => {
        nodes = await demoAirports();
        edges = await demoEdges();
    });

    beforeEach(() => {
        graph = new Graph(nodes, edges);
    });

    test("Referencing a non-existent node should cause an exception", () => {
        expect(() => { graph.get(BAD_ID) }).toThrow(`No node with id ${BAD_ID} in graph!`);
        expect(() => { graph.getNeighbors(BAD_ID) }).toThrow(`No node with id ${BAD_ID} in graph!`);
        expect(() => { graph.addEdge(BAD_ID, NODE_ID) }).toThrow(`No node with id ${BAD_ID} in graph!`);
    });

    test("Adding a loop edge should cause an exception", () => {
        expect(() => { graph.addEdge(...BAD_EDGE) }).toThrow(`Loop edge from node ${NODE_ID} to itself not allowed by graph definition.`);
    });

    test("Add and remove node", () => {
        graph.addNode(sxfAirport);
        expect(graph.get(SXF)).toBe(sxfAirport);
        
        graph.removeNode(SXF);
        expect(() => { graph.get(SXF) }).toThrow(`No node with id ${SXF} in graph!`);
    });

    test("Add and remove edge", () => {
        graph.addEdge(...EDGE);
        expect( graph.getNeighbors(EDGE[0]).has(EDGE[1]) ).toBe(true);
        expect( graph.getNeighbors(EDGE[1]).has(EDGE[0]) ).toBe(true);
        
        graph.removeEdge(...EDGE);
        expect( graph.getNeighbors(EDGE[0]).has(EDGE[1]) ).toBe(false);
        expect( graph.getNeighbors(EDGE[1]).has(EDGE[0]) ).toBe(false);
        expect( graph.has(EDGE[1]) ).toBe(true);
        expect( graph.has(EDGE[0]) ).toBe(true);
    });
});