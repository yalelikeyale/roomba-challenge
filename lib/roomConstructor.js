const {validateRoombaMove, checkForDirt} = require('./utilities')
const {moveExecutor} = require('./roombaController')

class Room {
	constructor(obj){
		Object.assign(this,obj);
		this.cleanUpCount = 0;
	}
	* movementGenerator() {
		for(let i=0; i<this.movementInstructions.length; i++){
			let nextMove = this.movementInstructions[i]
			yield nextMove
		}
	}
	runRoombaSensors = () => {
		//console.log('Running Sensors...')
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				let possibleMoves = [];
				let directions = ['N','S','E','W'];
				for(let i in directions){
					let newPosition = moveExecutor[directions[i]].executeMove(this.roombaPosition)
					if(validateRoombaMove(newPosition, this.roomDimensions)){
						possibleMoves.push(directions[i])
					} 
				}
				//console.log(`Roomba able to move ${possibleMoves}`)
				resolve(possibleMoves)
			},500)
		})
	}
	runRoombaVacuum = () => {
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				let cleanedDirt = checkForDirt(this.roombaPosition, this.dirtPositions)
				if(!(cleanedDirt==null)){
					this.dirtPositions.splice(cleanedDirt, 1);
					this.cleanUpCount += 1
					//console.log(`Dirt cleaned at position ${this.roombaPosition}. Dirt Removal Count Now ${this.cleanUpCount}`)
				} else {
					//console.log(`No dirt found at ${this.roombaPosition}`)
				}
				resolve()
			},500)
		})
	}
	updateRoombaPosition = (direction) => {
		return new Promise((resolve,reject)=>{
			setTimeout(()=>{
				let newPosition = moveExecutor[direction].executeMove(this.roombaPosition)
				this.roombaPosition = newPosition;
				//console.log(`Moving to ${newPosition}`)
				resolve()
			},500)			
		})
	}
}


module.exports = Room;