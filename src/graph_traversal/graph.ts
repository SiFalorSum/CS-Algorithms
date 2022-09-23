/**
 * An interface for objects that are nodes in a {@link Graph|graph}.
 * @interface
 */
export interface Node {
    /**
     * @function
     * @returns {string} A unique identifier for the node.
     */
    getId(): string,

    /**
     * @function
     * @param {Node} node
     * @returns {number} A "cost", eg. a weight for an edge between the two nodes, or a heuristic if the nodes are not directly linked.
     */
    cost(node: Node): number
}

/**
 * Defines an edge between two nodes as a pair of their ID's: `[node1.getId(): string, node2.getId(): string]`
 */
export type Edge = [string, string];

/**
 * An object holding a collection of {@link Node|nodes} and the edges connecting them. The graph is defined as an _undirected, simple graph_ and may contain unlinked nodes,
 * but not multiple edges between the same two nodes, nor looping edges back to the same node.
 * @constructor
 * @param {Iterable<T extends Node>} nodes - An iterable containing node objects. Duplicates will be ignored.
 * @param {Iterable<Edge>} edges - An iterable containing _unordered pairs_ of node identifiers [_a,b_], where _a_ &ne; _b_, [_a,b_] &equiv; [_b,a_] and [_a,b_] &sube; `nodes`.
 */
export class Graph<T extends Node> {
    protected adjacencyList = new Map<string, Set<string>>();
    protected nodeList = new Map<string, T>();

    constructor(nodes?: Iterable<T>, edges?: Iterable<Edge>) {
        if ( nodes !== undefined ) {
            this.addNodes(nodes);
            if ( edges !== undefined ) {
                this.addEdges(edges);
            }
        }
    }

    has(nodeId: string): boolean {
        return this.nodeList.has(nodeId);
    }

    /**
     * @throws Will throw an error if no node with the given identifier can be found.
     */
    get(nodeId: string): T {
        this.checkIfInGraph(nodeId);
        return this.nodeList.get(nodeId)!;
    }

    /**
     * @throws Will throw an error if no node with the given identifier can be found.
     */
    getNeighbors(nodeId: string): Set<string> {
        this.checkIfInGraph(nodeId);
        return this.adjacencyList.get(nodeId)!;
    }

    addNodes(nodes: Iterable<T>) {
        for (const n of nodes) {
            this.addNode(n);
        }
    }

    addNode(node: T) {
        if ( !this.adjacencyList.has(node.getId()) ) {
            this.adjacencyList.set(node.getId(), new Set<string>());
            this.nodeList.set(node.getId(), node);
        }
    }

    removeNode(nodeId: string) {
        if ( this.adjacencyList.has(nodeId) ) {
            this.adjacencyList.get(nodeId)!.forEach(n => this.adjacencyList.get(n)!.delete(nodeId));
            this.adjacencyList.delete(nodeId);
            this.nodeList.delete(nodeId);
        }
    }

    addEdges(edges: Iterable<Edge>) {
        for ( const edge of edges ) {
            this.addEdge(...edge);
        }
    }

    addEdge(nodeId1: string, nodeId2: string) {
        this.checkIfInGraph(nodeId1);
        this.checkIfInGraph(nodeId2);
        if ( nodeId1 === nodeId2 ) throw new Error(`Loop edge from node ${nodeId1} to itself not allowed by graph definition.`);

        this.adjacencyList.get(nodeId1)!.add(nodeId2);
        this.adjacencyList.get(nodeId2)!.add(nodeId1);
    }

    removeEdge(nodeId1: string, nodeId2: string) {
        if ( !this.adjacencyList.has(nodeId1) || !this.adjacencyList.has(nodeId2) ) return;
        this.adjacencyList.get(nodeId1)!.delete(nodeId2);
        this.adjacencyList.get(nodeId2)!.delete(nodeId1);
    }

    private checkIfInGraph(nodeId: string) {
        if ( !this.nodeList.has(nodeId) ) throw new Error(`No node with id ${nodeId} in graph!`);
    }

}
