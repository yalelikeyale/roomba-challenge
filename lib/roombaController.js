'use strict';

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

function * genNextMove(){
    for (var i = 0; i < 10; i++) {
        yield i;
    }
}


module.exports = {
	moveExecutor,
	genNextMove
}