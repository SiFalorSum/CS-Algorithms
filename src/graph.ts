/** @module undirectedGraph */

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
 * An object holding a collection of {@link Node|nodes} and the edges connecting them. The graph is defined as an _undirected, simple graph_ and may contain unlinked nodes,
 * but not multiple edges between the same two nodes, nor looping edges back to the same node.
 * @constructor
 * @param {Iterable<T extends Node>} nodes - An iterable containing node objects. Duplicates will be ignored.
 * @param {Iterable<[string, string]>} edges - An iterable containing _unordered pairs_ of node identifiers [_a,b_], where _a_ &ne; _b_, [_a,b_] &equiv; [_b,a_] and [_a,b_] &sube; `nodes`.
 */
export class Graph<T extends Node> {
    protected adjacencyList = new Map<string, Set<string>>();
    protected nodeList = new Map<string, T>();

    constructor(nodes?: Iterable<T>, edges?: Iterable<[string, string]>) {
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

    get(nodeId: string): T {
        if ( !this.nodeList.has(nodeId) ) {
            throw new Error(`No node with id ${nodeId} in graph!`);
        }
        else {
            return this.nodeList.get(nodeId)!;
        }
    }

    getNeighbors(nodeId: string): Set<string> {
        return this.adjacencyList.get(nodeId) ?? new Set<string>();
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

    addEdges(edges: Iterable<[string, string]>) {
        for ( const edge of edges ) {
            this.addEdge(...edge);
        }
    }

    addEdge(nodeId1: string, nodeId2: string) {
        if ( nodeId1 === nodeId2 ) throw new Error(`Loop edge from node ${nodeId1} to itself not allowed by graph definition.`);
        if ( !this.adjacencyList.has(nodeId1) || !this.adjacencyList.has(nodeId2) ) return;
        this.adjacencyList.get(nodeId1)!.add(nodeId2);
        this.adjacencyList.get(nodeId2)!.add(nodeId1);
    }

    removeEdge(nodeId1: string, nodeId2: string) {
        if ( !this.adjacencyList.has(nodeId1) || !this.adjacencyList.has(nodeId2) ) return;
        this.adjacencyList.get(nodeId1)!.delete(nodeId2);
        this.adjacencyList.get(nodeId2)!.delete(nodeId1);
    }

    bfs(start: string, target: string): string[] {
        const visited = new Set([start]);
        const parent = new Map([[start, ""]]);
        const queue = [start];
        while ( queue.length > 0 ) {
            let nodeId = queue.shift() ?? "";
            this.adjacencyList.get(nodeId)?.forEach(c => {
                if ( !visited.has(c) ) {
                    visited.add(c);
                    queue.push(c);
                    parent.set(c, nodeId);
                    if ( c === target ) {
                        const path = [c];
                        while ( !!parent.get(path[0]) ) {
                            path.unshift(parent.get(path[0])!);
                        }
                        return path;
                    }
                }
            });
        }
        return [];
    }

    dfs(start: string, target: string, visited = new Set<string>()): string[] {
        if ( visited.has(start) ) return [];
        if ( start === target ) return [target];
    
        visited.add(start);
        let path = [...(this.adjacencyList.get(start) ?? [])].map(node => this.dfs(node, target, visited)).find(arr => !!arr.length);
        return path ? [start].concat(path) : [];
    }
}
