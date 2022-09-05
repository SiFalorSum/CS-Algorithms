import { Node } from './airport'

export class Graph<T extends Node> {
    adjacencyList = new Map<string, Set<string>>();
    nodeList = new Map<string, T>();

    constructor(nodeList?: Array<T>) {
        if ( nodeList !== undefined ) {
            this.addNodes(nodeList);
        }
    }

    private getNodeId(node: T | string) {
        return typeof node === 'string' ? node : node.getId();
    }

    has(node: T | string): boolean {
        return this.nodeList.has(this.getNodeId(node));
    }

    get(nodeId: string): T {
        if ( !this.nodeList.has(nodeId) ) {
            throw new Error(`No node with id ${nodeId} in graph!`);
        }
        else {
            return this.nodeList.get(nodeId)!;
        }
    }

    getNeighbors(node: T | string): Set<string> {
        return this.adjacencyList.get(this.getNodeId(node)) ?? new Set<string>();
    }

    addNodes(nodeList: Array<T>) {
        nodeList.forEach(n => {
            this.addNode(n);
        });
    }

    addNode(node: T) {
        if ( !this.adjacencyList.has(node.getId()) ) {
            this.adjacencyList.set(node.getId(), new Set<string>());
            this.nodeList.set(node.getId(), node);
        }
    }

    removeNode(node: T | string) {
        const id = this.getNodeId(node);
        if ( this.adjacencyList.has(id) ) {
            this.adjacencyList.get(id)?.forEach(n => this.adjacencyList.get(n)?.delete(id));
            this.adjacencyList.delete(id);
            this.nodeList.delete(id);
        }
    }

    addEdge(node1: T | string, node2: T | string) {
        const id1 = this.getNodeId(node1), id2 = this.getNodeId(node2);
        if ( !this.adjacencyList.has(id1) || !this.adjacencyList.has(id2) ) return;
        this.adjacencyList.get(id1)?.add(id2);
        this.adjacencyList.get(id2)?.add(id1);
    }

    removeEdge(node1: T | string, node2: T | string) {
        const id1 = this.getNodeId(node1), id2 = this.getNodeId(node2);
        if ( !this.adjacencyList.has(id1) || !this.adjacencyList.has(id2) ) return;
        this.adjacencyList.get(id1)?.delete(id2);
        this.adjacencyList.get(id2)?.delete(id1);
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
