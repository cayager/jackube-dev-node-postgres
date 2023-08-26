const { Client } = require("pg");

let client;

async function init() {
	
	client = new Client({
	  password: "{password}",
	  user: "root",
	  host: "postgres",
	  database: "root",
	});
	
	await client.connect();
	return
}

async function teardown() {
    await client.end();
	return
}

async function getList(req) {
	const queryR = "SELECT * FROM employees";
	console.log(`Executing PG query ${queryR}`);
	
	const results = await client
		.query(queryR)
		.then((payload) => {
		  return payload.rows;
		})
		.catch(() => {
		  throw new Error("Query failed");
    });
	
	console.log(`Employee object PG Query executed...`);
	console.log(results);
	return results;
}

module.exports = {
	init,
    teardown,
    getList,
};
