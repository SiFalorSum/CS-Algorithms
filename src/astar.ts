import { Graph, Node } from './graph';

/**
 * Implementation of the A* search algorithm for a weighted {@link Graph|graph}.
 * @constructor
 * @param {Graph<T>} graph
 */
export class Astar<T extends Node> {
    graph: Graph<T>;
    private open = new Set<string>();
    private closed = new Set<string>();
    private hCost = new Map<string, number>();
    private gCost = new Map<string, number>();
    private parent = new Map<string, string>();

    constructor(graph: Graph<T>) {
        this.graph = graph;
    }

    /**
     * A* search through a {@link Graph|graph} for given start and target {@link Node|nodes}.
     * @param {string} start - Identifier for the start node.
     * @param {string} target - Identifier for the target node.
     * @returns Returns an array of the nodes in the shortest found path, or an empty array if no path is possible.
     */
    findPath(start: string, target: string): T[] {
        if ( !this.graph.has(start) || !this.graph.has(target) ) throw new Error(`Start node ${start} or target node ${target} not part of graph!`);
        this.open.add(start);
        this.parent.set(start, "");
        this.hCost.set(start, this.getHcost(start, target));
        this.gCost.set(start, 0);

        while ( this.open.size > 0 ) {
            const current = this.findNodeInOpenWithLowestFcost();
            this.open.delete(current);
            this.closed.add(current);
            if ( current === target ) return this.getPath(current);
            this.addNeighborsToOpen(current, target);
        }

        return [];
    }

    private getHcost(nodeId: string, target: string): number {
        return this.graph.get(nodeId).cost(this.graph.get(target));
    }

    private addNeighborsToOpen(current: string, target: string) {
        let pgc = this.gCost.get(current)!;
        this.difference(this.graph.getNeighbors(current), this.closed).forEach(neighbor => {
            this.open.add(neighbor);
            this.hCost.set(neighbor, this.getHcost(neighbor, target));
            let ngc = pgc + this.getHcost(current, neighbor);
            if ( !this.gCost.has(neighbor) || this.gCost.get(neighbor)! > ngc ) {
                this.gCost.set(neighbor, ngc);
                this.parent.set(neighbor, current);
            }
        });
    }

    private findNodeInOpenWithLowestFcost(): string {
        let minVal = Number.MAX_SAFE_INTEGER;
        let minNode = "";
        this.open.forEach(nodeId => {
            let hc = this.hCost.get(nodeId)!
            let fc = this.gCost.get(nodeId)! + hc;
            if ( fc < minVal || ( fc === minVal && hc < this.hCost.get(minNode)! ) ) {
                minNode = nodeId;
                minVal = fc;
            }
        });
        return minNode;
    }

    private difference(setA: Set<string>, setB: Set<string>): Set<string> {
        const diff = new Set<string>(setA);
        setB.forEach(nodeId => diff.delete(nodeId));
        return diff;
    }

    private getPath(nodeId: string): T[] {
        const path = [nodeId];
        while ( !!this.parent.get(path[0]) ) {
            path.unshift(this.parent.get(path[0])!);
        }
        return path.map(id => this.graph.get(id));
    }
}