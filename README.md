A. Input Object
	- Push Boundary Coordinates to Map object
	- Push Roomba position to Map Object
	- Dedupes dirt positions and sends positions to map object

B. Output Object 
	- Receives start command from roomba 
	- Requests Output data from map object
		- Final resting position of roomba 
		- Dirtclean up count 

B. Room object
	- Receives coordinates from input object and determines all boundary positions
	- Receives dirt positions from input object
	- Knows the position of the roomba 
	- Stores dirt cleanup count

C. Instructor Object
	- Feeds the roomba directions
	- If no further instructions exist, tell roomba that it is done cleaning

D. Roomba Object 
	- Checks with the Map object
		- determine current position
		- determine if on dirt
			- update map object dirt cleanup count
		- determine if the roomba is near a boundary 
			- know what moves from current position will result with a crash

	- Then asks Instructor Object for the next move
		- if no direction, initiate output 
		
		- if move matches boundary move, throw error and request next move from instructor and repeat 

		- If move is ok, then update map object with new position






