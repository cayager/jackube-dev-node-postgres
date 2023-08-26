const { Client } = require("pg"); // Postgres client

let dbClient;

async function init() {
	
	dbClient = new Client({
	  password: "{password}",
	  user: "root",
	  host: "postgres",
	  database: "adTrack",
	});
	
	await dbClient.connect();
	return
}

async function teardown() {
    await dbClient.end();
	return
}

async function getList(req) {
	const queryR = "SELECT * FROM employees";
	console.log(`Executing PG query ${queryR}`);
	
	const results = await dbClient
		.query(queryR)
		.then((payload) => {
		  return payload.rows;
		})
		.catch(() => {
		  console.log(`Query ${queryR} failed`);
		  throw new Error("Query failed");
    });
	
	console.log(results);
	return results;
}

module.exports = {
	init,
    teardown,
    getList,
};
