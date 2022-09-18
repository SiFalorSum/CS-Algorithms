import { Graph, Node } from './graph';

/**
 * Breadth first search through a {@link Graph|graph} for given start and target {@link Node|nodes}.
 * The traversal order depends on the insertion order of the edges of the graph.
 * @param {Graph} graph - The graph to be searched.
 * @param {string} start - Identifier for the start node.
 * @param {string} target - Identifier for the target node.
 * @returns Returns an array of the nodes in the found path, or an empty array if no path is possible.
 */
export function bfs<T extends Node>(graph: Graph<T>, start: string, target: string): T[] {
    const visited = new Set([start]);
    const parent = new Map([[start, ""]]);
    const queue = [start];
    while ( queue.length > 0 ) {
        let nodeId = queue.shift() ?? "";
        graph.getNeighbors(nodeId).forEach(c => {
            if ( !visited.has(c) ) {
                visited.add(c);
                queue.push(c);
                parent.set(c, nodeId);
                if ( c === target ) {
                    const path = [c];
                    while ( !!parent.get(path[0]) ) {
                        path.unshift(parent.get(path[0])!);
                    }
                    return path.flatMap(nodeId => graph.get(nodeId));
                }
            }
        });
    }
    return [];
}

/** 
 * Depth first search through a {@link Graph|graph} for given start and target {@link Node|nodes}.
 * The traversal order depends on the insertion order of the edges of the graph.
 * @param {Graph} graph - The graph to be searched.
 * @param {string} start - Identifier for the start node.
 * @param {string} target - Identifier for the target node.
 * @param {Set<string>} visited - OPTIONAL: A set of already visited nodes. If `start` is in the set, the function will return an empty array.
 * @returns Returns an array of the nodes in the found path, or an empty array if no path is possible.
 * @todo Refactor code to avoid recursive calls.
*/
export function dfs<T extends Node>(graph: Graph<T>, start: string, target: string, visited = new Set<string>()): T[] {
    let path: T[] = []
    if ( visited.has(start) ) return path;
    if ( start === target ) return [graph.get(target)];

    visited.add(start);
    for (const node of graph.getNeighbors(start)) {
        path = path.concat(...dfs(graph, node, target, visited));
    }
    return path;
}