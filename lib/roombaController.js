'use strict';

//call the appropriate movement by using cardinal direction as key
const moveExecutor = {
	'N':{
		executeMove: (position) =>{
			let x = position[0]
			let y = position[1]
			y+=1
			return [x,y]
		}
	},
	'S':{
		executeMove: (position) =>{
			let x = position[0]
			let y = position[1]
			y-=1
			return [x,y]
		}
	},
	'E':{
		executeMove: (position) =>{
			let x = position[0]
			let y = position[1]
			x+=1
			return [x,y]
		}
	},
	'W':{
		executeMove: (position) =>{
			let x = position[0]
			let y = position[1]
			x-=1
			return [x,y]
		}
	}
}



module.exports = {
	moveExecutor
}