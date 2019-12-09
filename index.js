'use strict';

const {processInput, genNextMove} = require('./lib');
let {roomConstructor} = require('./lib');
let pathName = './input.txt'


const reportResults = (Room) =>{
	console.log(`Roomba Search & Destroy Mission Complete. Here are the results of the hunt:
	Final Position: ${Room.roombaPosition}
	Dirt Spots Destroyed: ${Room.cleanUpCount}`)
}

const startCleaning = async (Room) => {
	try {
		let possibleMoves;
		let doneCleaning;
		let movementRequest;
		let instructor = Room.movementGenerator()
		while (!doneCleaning){
			await Room.runRoombaVacuum();
			possibleMoves = await Room.runRoombaSensors();
			movementRequest = instructor.next()
			if(movementRequest.done){
				doneCleaning = movementRequest.done
			} else if(possibleMoves.includes(movementRequest.value)){
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
		const inputObj = await processInput(pathName);
		let Room = new roomConstructor(inputObj)
		startCleaning(Room)
	}
	catch(err){
		throw(err)
	}
}

if (require.main === module) {
  startJob().catch(err => console.error(err));
};



