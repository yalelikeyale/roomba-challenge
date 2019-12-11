'use strict';


const fs = require('fs').promises
const {validateRoombaInput, validateBoundaries, validateDirt, validateInstructions} = require('./utilities')

	//validate that the input data fits the requirements
	//the boundaries of the room should be positive
	//the roomba and the dirt positions should fall within the boundaries of the room 
	//the directions should either be N,S,E,W
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


	// for each row from the input.txt file
	// validate that the data matches the required pattern, convert to array, and convert each value to int
	// for the cardinal directions, create an array
	/*
		example output:
		{
			roomDimensions:[5,5],
			roombaPosition:[2,3],
			dirtPositions:[[1,1],[2,4]],
			movementInstructions:[N,S,E,W]
		}
	*/

const createInputObj = async (inputSets) => {
	let inputObj = {
		'dirtPositions':[]
	}
	try {
		for(let i=0;i<inputSets.length;i++){
			switch(true){

				case i===0 :
					if(/\d+\s\d+/.test(inputSets[i])){
						inputObj['roomDimensions'] = inputSets[i].split(' ').map(num=>{return parseInt(num)});
					} else {
						throw("Invalid Room Dimensions")
					}
					break
				case i===1 :
					if(/\d+\s\d+/.test(inputSets[i])){
						inputObj['roombaPosition'] = inputSets[i].split(' ').map(num=>{return parseInt(num)});
					} else {
						throw("Invalid Roomba Position")
					}
					break
				case i != (inputSets.length -1) :
					if(/\d+\s\d+/.test(inputSets[i])){
						inputObj['dirtPositions'].push(inputSets[i].split(' ').map(num=>{return parseInt(num)}))
					} else {
						throw("Invalid Dirt Position")
					}
					break
				default : 
					inputObj['movementInstructions'] = inputSets[i].toUpperCase().split('');
			}
		}		
	} catch(err) {
		throw(err)
	}

	return inputObj
}



const processInput = async (pathName) => {
	try{
		// read in the file
		const inputData = await fs.readFile(pathName, 'utf8');
		// split by newline so each new row is a value in an array
		// send input array to the create obj function
		let inputObj = await createInputObj(inputData.trim().split('\n'));
		//now that input.txt has been converted into an object, clean and validate data
		inputObj = await cleanInputObj(inputObj);
		return(inputObj)
	} catch (err) {
		throw(err);
	}

}

module.exports = processInput



