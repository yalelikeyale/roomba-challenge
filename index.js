'use strict';

const {processInput} = require('./lib');
let {roomConstructor} = require('./lib');
let pathName = './input.txt'


const startJob = async () => {
	try{
		const inputObj = await processInput(pathName);
		let Room = new roomConstructor(inputObj)
		console.log(Room);
	}
	catch(err){
		console.log(err)
	}
}

if (require.main === module) {
  startJob().catch(err => console.error(err));
};