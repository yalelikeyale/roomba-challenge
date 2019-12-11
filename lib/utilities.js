'use strict';
const isEqual = require('lodash.isequal');

// check if the roombas current position matches any of the dirt positions
const checkForDirt = (roombaPosition, dirtPositions) => {
	for (let i = dirtPositions.length - 1; i >= 0; i--){
		if(isEqual(dirtPositions[i], roombaPosition)){
			return i
			break
		}
	}
}

//validate that the roomba is able to move in a proposed direction
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

//validate that the roomba falls within the boundaries of the room
const validateRoombaInput = (roombaPosition, roomDimensions) => {
	let xR = roombaPosition[0];
	let yR = roombaPosition[1];
	let xLim = roomDimensions[0];
	let yLim = roomDimensions[1];
	return new Promise((resolve,reject)=>{
		(xR >= 0 && yR >= 0 && xR <= xLim && yR <=yLim) ? resolve(roombaPosition) : reject("Invalid Roomba Position")
	})
}


//validate that each input instruction is either N,S,E,W
const validateInstructions = (movementInstructions) => {
	let validInstructions = ['N','S','E','W'];
	return new Promise((resolve,reject)=>{
		let distinctInstructions = new Set(movementInstructions);
		let valid = true;
		distinctInstructions.forEach(instruction=>{
			if(!(validInstructions.includes(instruction))){
				valid = false
			}
		})
		if(valid){
			resolve(movementInstructions)
		} else {
			reject("Invalid Movement in Instructions List")
		}
	})
}

// validate that each dirt position falls within the boundaries of the room
const validateDirt = (dirtPositions, roomDimensions) => {
	return new Promise((resolve,reject)=>{
		try{
			let xLim = roomDimensions[0]
			let yLim = roomDimensions[1]
			for (let i = dirtPositions.length - 1; i >= 0; i--) {
				let dirtSpot = dirtPositions[i]
				let dirtX = dirtSpot[0]
				let dirtY = dirtSpot[1]
			    if (dirtX < 0 || dirtY < 0 || dirtX > xLim || dirtY > yLim) { 
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

//validate that the dimensions of the room are positive x,y values
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

