'use strict';
const fs = require('fs').promises

const convertInput = (num) => {
	return parseInt(num);
}

const cleanInput = (inputSets) => {
	let inputObj = {
		'dirtPositions':[]
	}
	for(let i=0;i<inputSets.length;i++){
		if(i===0){
			inputObj['roomDimensions'] = inputSets[i].split(' ').map(convertInput);
		} else if (i===1) {
			inputObj['roombaPosition'] = inputSets[i].split(' ').map(convertInput);
		} else if (i != inputSets.length -1) {
			inputObj['dirtPositions'].push(inputSets[i].split(' ').map(convertInput))
		} else {
			inputObj['movementInstructions'] = inputSets[i].split('');
		}
	}
	return inputObj
}

const processInput = async (pathName) => {
	try{
		const inputData = await fs.readFile(pathName, 'utf8');
		return cleanInput(inputData.trim().split('\n'));
	} catch (err) {
		console.log(err);
	}

}

module.exports = processInput