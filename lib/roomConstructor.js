const {validateRoombaMove, checkForDirt} = require('./utilities')
const {moveExecutor} = require('./roombaController')

class Room {
	constructor(obj){
		Object.assign(this,obj);
		this.updateRoombaPosition = (direction) => {
			let newPosition = moveExecutor[direction].executeMove(this.roombaPosition)
			this.roombaPosition = newPosition;
		};
		this.runRoombaSensors = () => {
			let possibleMoves = [];
			let directions = ['N','S','E','W'];
			for(let i in directions){
				let newPosition = moveExecutor[directions[i]].executeMove(this.roombaPosition)
				if(validateRoombaMove(newPosition, this.roomDimensions)){
					possibleMoves.push(directions[i])
				} 
			}
			return possibleMoves;
		};
		this.runRoombaVacuum = () => {
			if(checkForDirt(this.roombaPosition, this.dirtPositions)){
				this.cleanUpCount += 1
			}
		};
		this.cleanUpCount = 0;
	}
}

module.exports = Room;