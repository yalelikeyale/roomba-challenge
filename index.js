'use strict';

const {processInput, genNextMove} = require('./lib');
let {roomConstructor} = require('./lib');
let pathName = './input.txt'


const reportResults = (Room) =>{
	let x = Room.roombaPosition[0]
	let y = Room.roombaPosition[1]
	let cleanUpCount = Room.cleanUpCount
	console.log(`${x} ${y}\n${cleanUpCount}`)
}

const startCleaning = async (Room) => {
	try {
		let possibleMoves;
		let doneCleaning;
		let movementRequest;
		//movement generator function returns the next move upon request
		let moveInstructor = Room.movementGenerator()
		while (!doneCleaning){
			// clean the current position
			await Room.runRoombaVacuum();
			// return array of which directions the roomba can go in
			possibleMoves = await Room.runRoombaSensors();
			// get next move from generator function
			movementRequest = moveInstructor.next()
			// if generator returns state of done = true finish while loop
			if(movementRequest.done){
				doneCleaning = movementRequest.done
			// check that next move is within possible moves
			} else if(possibleMoves.includes(movementRequest.value)){
				// update roomba position
				Room.updateRoombaPosition(movementRequest.value)
			}
		}
		reportResults(Room)
	} catch(err){
		console.log(err)
	}
}

const startJob = async () => {
	try{
		// process the input.txt file with lib/inputHandler.js
		const inputObj = await processInput(pathName);
		// create a new room class with the validated data from input.txt
		let Room = new roomConstructor(inputObj)
		// begin job
		startCleaning(Room)
	}
	catch(err){
		throw(err)
	}
}

if (require.main === module) {
  startJob().catch(err => console.error(err));
};



