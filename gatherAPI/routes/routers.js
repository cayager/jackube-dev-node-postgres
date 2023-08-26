//Route Objects
const employees = require("./employees"); // Quick Demo Test 
const adTrack = require("./adtrack"); // adTrack app

module.exports = async (req, res) => {
	
	const routerR = req.params.router;
	const methodR = req.params.method;
	
	console.log(`Router calling route:${routerR} method:${methodR} ...`);

	//Send Response back to the requester
	const sendR = (results) => {
		res.setHeader("Content-Type", "application/json");
		res.status(200);
		res.send(JSON.stringify(results));
	};
	
	//When Shutting down, teardown Route Objects
	const gracefulShutdown = () => {
		console.log(`Shutting down route objects ...`);
		
		adTrack.teardown()
		employees.teardown()
			.catch(() => {})
			.then(() => process.exit());
	};
	
	process.on('SIGINT', gracefulShutdown);
	process.on('SIGTERM', gracefulShutdown);
	process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon
	
	
	//****************************
	// Route Object Bindings
	//****************************
	
	//Employees Route Binding
	if (routerR == "employees"){
		employees.init();
		const results = await employees[methodR](req);
		sendR(results);
	}
	
	//adTrack Route Binding
	if (routerR == "adTrack"){
		adTrack.init();
		const results = await adTrack[methodR](req);
		sendR(results);
	}
	
	
};