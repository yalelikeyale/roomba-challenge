'use strict';
const processInput = require('./inputHandler');
const {genNextMove, moveExecutor} = require('./roombaController')
const roomConstructor = require('./roomConstructor');

module.exports = {
	processInput,
	genNextMove,
	moveExecutor, 
	roomConstructor
}