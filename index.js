'use strict';

const {processInput, genNextMove} = require('./lib');
let {roomConstructor} = require('./lib');
let pathName = './input.txt'

const reportResults = (Room) =>{
	console.log(`Roomba Search & Destroy Complete. Here are the results of the hunt: \n
	Final Position: ${Room.roombaPosition} \n
	Dirt Spots Destroyed: ${Room.cleanUpCount} \n`)
}

//is there a better way to use a generator
//should check if dirt positions is empty and end job 
const startCleaning = (Room) => {
	let possibleMoves;
	for (let i of genNextMove()){
		Room.runRoombaVacuum()
		possibleMoves = Room.runRoombaSensors();
		let movementRequest = Room.movementInstructions[i]
		if(possibleMoves.includes(movementRequest)){
			Room.updateRoombaPosition(movementRequest)
		} 
	}
	reportResults(Room)
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