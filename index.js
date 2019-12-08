'use strict';

const {processInput, genNextMove} = require('./lib');
let {roomConstructor} = require('./lib');
let pathName = './input.txt'

//create output handler

const startCleaning = (Room) => {
	let possibleMoves;
	console.log(Room.dirtPositions)
	// for (let i of genNextMove()){
	// 	Room.runRoombaVacuum()
	// 	possibleMoves = Room.runRoombaSensors();
	// 	let movementRequest = Room.movementInstructions[i]
	// 	if(possibleMoves.includes(movementRequest)){
	// 		Room.updateRoombaPosition(movementRequest)
	// 	} 
	// }
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