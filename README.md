# Roomba Vacuum Challenge

### **Description**

This is a program that navigates an imaginary roomba vacuum through an equally imaginary room based on the follow:

* room dimensions as [X and Y coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system), identifying the top right corner of the room rectangle. This room is divided up in a grid based on these dimensions; a room that has dimensions X: 5 and Y: 5 has 5 columns and 5 rows, so 25 possible hoover positions. The bottom left corner is the point of origin for our coordinate system, so as the room contains all coordinates its bottom left corner is defined by X: 0 and Y: 0.
* locations of patches of dirt, also defined by X and Y coordinates identifying the bottom left corner of those grid positions.
* an initial hoover position (X and Y coordinates like patches of dirt)
* driving instructions (as [cardinal directions](https://en.wikipedia.org/wiki/Cardinal_direction) where e.g. N and E mean "go north" and "go east" respectively)

The room will be rectangular, has no obstacles (except the room walls), no doors and all locations in the room will be clean (hoovering has no effect) except for the locations of the patches of dirt presented in the program input.

Placing the hoover on a patch of dirt ("hoovering") removes the patch of dirt so that patch is then clean for the remainder of the program run. The hoover is always on - there is no need to enable it.

Driving into a wall has no effect (the robot skids in place).

### **Instructions**

The room dimensions, roomba position, dirt positions are all dictated by the input.txt file. To manipulate the program, please update the input.txt file. 

Example:

```
5 5
1 2
1 0
2 2
2 3
NNESEESWNWW
```
**Rules:**

1. The first row determines the maximum X and Y axis values
- Non number values will cause an error

2. The second row determines the starting position of the roomba
- Non number values will cause an error

3. The following rows up until the last row determines the positions of the dirt
- Duplicates will automatically be removed
- Non number values will be removed
- If no dirt positions exist the program will not run

4. The last row tells the roomba which directions to move in 
- Only N,S,E,W characters are allowed otherwise an error will be raised.

### **Quick Start**
*Developed with Node 13+*
```
npm install
npm start
```




