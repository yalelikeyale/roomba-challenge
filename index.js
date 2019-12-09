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
		let moveInstructor = Room.movementGenerator()
		while (!doneCleaning){
			await Room.runRoombaVacuum();
			possibleMoves = await Room.runRoombaSensors();
			movementRequest = moveInstructor.next()
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



