'use strict';
const array = require('lodash/array');
const isEqual = require('lodash.isequal');

//need to remove dirt once found

const checkForDirt = (roombaPosition, dirtPositions) => {
	for(let position in dirtPositions){
		if(isEqual(dirtPositions[position], roombaPosition)){
			return true
			break
		}
	}
}

const validateRoombaMove = (roombaPosition, roomDimensions) => {
	let xR = roombaPosition[0];
	let yR = roombaPosition[1];
	let xLim = roomDimensions[0];
	let yLim = roomDimensions[1];
	if(xR >= 0 && yR >= 0 && xR <= xLim && yR <=yLim) {
		return(true)
	} else {
		return(false)
	} 
}

const validateRoombaInput = (roombaPosition, roomDimensions) => {
	let xR = roombaPosition[0];
	let yR = roombaPosition[1];
	let xLim = roomDimensions[0];
	let yLim = roomDimensions[1];
	return new Promise((resolve,reject)=>{
		(xR >= 0 && yR >= 0 && xR <= xLim && yR <=yLim) ? resolve(roombaPosition) : reject("Invalid Roomba Position")
	})
}

const validateInstructions = (movementInstructions) => {
	let validInstructions = ['N','S','E','W'];
	return new Promise((resolve,reject)=>{
		let distinctInstructions = new Set(movementInstructions);
		distinctInstructions = Array.from(distinctInstructions)
		if(isEqual(validInstructions.sort(), distinctInstructions.sort())){
			resolve(movementInstructions)
		} else {
			reject("Invalid Movement in Instructions List")
		}
	})
}

//Broken
const validateDirt = (dirtPositions, roomDimensions) => {
	return new Promise((resolve,reject)=>{
		try{
			dirtPositions = array.uniqWith(dirtPositions, isEqual);
			let xLim = roomDimensions[0]
			let yLim = roomDimensions[1]
			for (let i = dirtPositions.length - 1; i >= 0; i--) {
				let dirtSpot = dirtPositions[i]
				let dirtX = dirtSpot[0]
				let dirtY = dirtSpot[1]
			    if (dirtX < 0 || dirtY < 0 || dirtX >= xLim || dirtY >= yLim) { 
			        dirtPositions.splice(i, 1);
			    }
			}
			if(dirtPositions.length > 0){
				resolve(dirtPositions)
			} else {
				throw("No Valid Dirt Positions to Clean")
			}
		} catch(err) {
			reject(err);
		}
	});
}

const validateBoundaries = (roomDimensions) => {
	let x = roomDimensions[0];
	let y = roomDimensions[1];
	return new Promise((resolve,reject)=>{
		(x >= 0 && y >= 0) ? resolve([x,y]) : reject("This is not Stranger Things, the upside down world does not exist! Only Positive Boundaries")
	})
}

module.exports = {
	validateRoombaInput,
	validateRoombaMove,
	validateBoundaries,
	validateDirt,
	validateInstructions,
	checkForDirt
}

