const Gremlin = require("gremlin");

// const traversal = gremlin.process.AnonymousTraversalSource.traversal;
// const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;

const client = new Gremlin.driver.Client("ws://localhost:8182/gremlin");

// const g = traversal().withRemote(
//   new DriverRemoteConnection("ws://localhost:8182/gremlin")
// );

// const countNodes = () => {
//   console.log("Counting nodes ..");
//   g.V()
//     .count()
//     .next()
//     .then((d) => {
//       console.log(`Node count: ${d}`);
//     });
// };

function dropGraph() {
  console.log("Running Drop");

  client.submit("g.V().drop()", {}).then((x: any) => {
    console.log(x);
  });
}

client
  .open()
  .then(dropGraph)
  .then(() => {
    console.log("Closing connection");
    client.close();
    process.stdin.resume();
    process.stdin.on("data", process.exit.bind(process, 0));
  });

// const createVertex = async (name: string) => {
//   const vertex = await g.addV("Traveler").property("name", name).next();
//   return vertex.value;
// };

// const createTraveler = async (name: string) => {
//   console.log(`Adding new traveler: ${name}`);
//   const v = g.addV("Traveler").property("name", name);
// };

// const getAllTravelers = async () => {
//   console.log("Getting all travelers");
//   return await g.V().hasLabel("Traveler").values("name").toList();
// };

// countNodes();

// dropGraph().then((x) => console.log("graph dropped."));
// createTraveler("bob").then((x) => console.log("bob added"));
// getAllTravelers((x: any) => console.log(x));
// b().then();

// const x = g
//   .V()
//   .elementMap()
//   .toList()
//   .then((n: any) => console.log(n));

// getAll();

// g.V()
//   .toList()
//   .then((names: any) => {
//     return console.log(names);
//   });

// DriverRemoteConnection.close();
