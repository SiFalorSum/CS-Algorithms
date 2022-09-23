import { Astar } from '../graph_traversal/astar';
import { demoGraph } from '../util/graph_util';


async function aStarDemo() {
    try {
        const astar = new Astar(await demoGraph());
        console.log(astar.findPath("MAN", "FCO"));
    }
    catch (err) {
        console.error(err);
    }
}

aStarDemo();