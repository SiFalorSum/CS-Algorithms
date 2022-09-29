import { Astar } from 'graph/astar';
import { demoGraph, airportPrinter } from 'util/graph_util';


async function aStarDemo() {
    try {
        const astar = new Astar(await demoGraph());
        console.log(airportPrinter(astar.findPath("MAN", "FCO")));
    }
    catch (err) {
        console.error(err);
    }
}

aStarDemo();