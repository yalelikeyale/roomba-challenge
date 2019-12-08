'use strict';


const fs = require('fs').promises
const {validateRoombaInput, validateBoundaries, validateDirt, validateInstructions} = require('./utilities')

const convertToInt = (num) => {
	return parseInt(num);
}

const cleanInputObj = async (inputObj) => {
	try{
			let roomDimensions = await validateBoundaries(inputObj.roomDimensions);
			let roombaPosition = await validateRoombaInput(inputObj.roombaPosition, inputObj.roomDimensions);
			let dirtPositions = await validateDirt(inputObj.dirtPositions, inputObj.roomDimensions);
			let movementInstructions = await validateInstructions(inputObj.movementInstructions);
		return {
			roomDimensions,
			roombaPosition,
			dirtPositions,
			movementInstructions
		}
	} catch (err){
		throw(err);
	}
}


const createInputObj = async (inputSets) => {
	let inputObj = {
		'dirtPositions':[]
	}
	try {
		for(let i=0;i<inputSets.length;i++){
			switch(true){

				case i===0 :

					if(/\d\s\d/.test(inputSets[i])){
						inputObj['roomDimensions'] = inputSets[i].split(' ').map(convertToInt);
					} else {
						throw("Invalid Room Dimensions")
					}
					break
				case i===1 :
					if(/\d\s\d/.test(inputSets[i])){
						inputObj['roombaPosition'] = inputSets[i].split(' ').map(convertToInt);
					} else {
						throw("Invalid Roomba Position")
					}
					break
				case i != (inputSets.length -1) :
					if(/\d\s\d/.test(inputSets[i])){
						inputObj['dirtPositions'].push(inputSets[i].split(' ').map(convertToInt))
					} else {
						"Invalid Dirt Position"
					}
					break
				default : 
					inputObj['movementInstructions'] = inputSets[i].split('');
			}
		}		
	} catch(err) {
		throw(err)
	}

	return inputObj
}



const processInput = async (pathName) => {
	try{
		const inputData = await fs.readFile(pathName, 'utf8');
		let inputObj = await createInputObj(inputData.trim().split('\n'));
		inputObj = await cleanInputObj(inputObj);
		return(inputObj)
	} catch (err) {
		throw(err);
	}

}

module.exports = processInput



