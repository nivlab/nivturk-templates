/* 
variable symmetry_demo_stimuli encodes the stimuli pracsymm1.bmp to pracsymm15.bmp
each element in this array (each row) corresponses to one image, with the pairs of numbers representing the locations [x,y] of black squares in that image
note that x and y starts from zero. x ranges from 0 to 8 (top to bottom), y ranges from 0 to 8 (left to right)
*/
var symm_stimuli_demo = 
[
    //1
	[[0, 3], [0, 4], [1, 3], [1, 4], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6], [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5], [4, 6], [4, 7], [5, 1], [5, 2], [5, 5], [5, 6], [6, 2], [6, 3], [6, 4], [6, 5], [7, 3], [7, 4]],
	
	//2
	[[0, 0], [0, 1], [0,6],[0,7],[1,0],[1,1],[1,2],[1,5],[1,6],[1,7],[2,0],[2,1],[2,3],[2,4],[2,6],[2,7],[3,0],[3,2],[3,3],[3,4],[3,5],[3,7],[4,0],[4,3],[4,4],[4,7],[5,0],[5,2],[5,3],[5,4],[5,5],[5,7],[6,0],[6,1],[6,6],[6,7],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
	
	//3
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[3,2],[3,3],[3,4],[3,5],[4,2],[4,5],[5,2],[5,5],[6,2],[6,3],[6,4],[6,5],[7,1],[7,3],[7,4],[7,6]],

    //4	
	[[0,0],[0,1],[0,6],[0,7],[1,0],[1,1],[1,6],[1,7],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,2],[3,3],[3,4],[3,5],[4,2],[4,3],[4,4],[4,5],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,0],[6,1],[6,6],[6,7],[7,0],[7,1],[7,6],[7,7]],
	
	//5
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,3],[3,4],[4,3],[4,4],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,1], [6,2],[6,3],[6,4],[6,5],[6,6],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
	
	//6
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],[1,3],[1,4],[1,6],[1,7],[2,1],[2,6],[3,0],[3,1],[3,3],[3,4],[3,6],[3,7],[4,0],[4,1],[4,3],[4,4],[4,6],[4,7],[5,1],[5,6],[6,0],[6,1],[6,3],[6,4],[6,6],[6,7],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
	
	//7
	[[0,0],[0,1],[0,6],[0,7],[1,1],[1,2],[1,5],[1,6],[2,2],[2,3],[2,4],[2,5],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,2],[5,3],[5,4],[5,5],[6,1],[6,2],[6,5],[6,6],[7,0],[7,1],[7,6],[7,7]],
	
	//8
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,6],[0,7],[1,2],[1,5],[1,6],[2,0],[2,1],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,0],[5,1],[5,6],[6,2],[6,5],[6,6],[7,0],[7,1],[7,2],[7,3],[7,4],[7,6],[7,7]],
	
	//9
	[[0,7],[1,0],[1,1],[1,6],[1,7],[2,0],[2,1],[2,2],[2,5],[2,6],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,7],[4,0],[4,7],[5,0],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,0],[6,1],[6,2],[6,5],[6,6],[6,7],[7,0],[7,1],[7,6],[7,7]],
	
	//10
	[[0,2],[0,5],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,2],[2,4],[2,5],[2,7],[3,0],[3,2],[3,3],[3,5],[3,7],[4,0],[4,2],[4,3],[4,4],[4,5],[4,7],[5,0],[5,2],[5,3],[5,4],[5,5],[5,7],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,2],[7,5]],
	
	//11
	[[0,0],[0,2],[0,3],[0,4],[0,5],[0,7],[1,1],[1,3],[1,4],[1,6],[2,0],[2,3],[2,4],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,0],[5,4],[5,7],[6,1],[6,4],[6,6],[7,0],[7,2],[7,3],[7,4],[7,5],[7,7]],
	
	//12
	[[0,0],[0,1],[0,2],[0,5],[0,6],[0,7],[1,0],[1,2],[1,5],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,0],[3,2],[3,5],[3,6],[4,0],[4,2],[4,5],[4,6],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,0],[6,2],[6,5],[6,6],[7,0],[7,1],[7,2],[7,5],[7,6],[7,7]],
	
	//13
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],[1,2],[1,4],[1,6],[1,7],[2,0],[2,1],[2,3],[2,6],[2,7],[3,0],[3,1],[3,4],[3,6],[3,7],[4,0],[4,1],[4,3],[4,6],[4,7],[5,1],[5,4],[5,6],[6,0],[6,1],[6,3],[6,5],[6,6],[6,7],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
	
	//14
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,1],[1,5],[1,6],[2,0],[2,1],[2,2],[2,5],[2,6],[2,7],[3,0],[3,1],[3,2],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,5],[4,6],[4,7],[5,0],[5,1],[5,2],[5,5],[5,6],[5,7],[6,1],[6,5],[6,6],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
	
	//15
	[[0,0],[0,1],[0,2],[0,3],[0,5],[0,6],[0,7],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,1],[2,6],[2,7],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,0],[5,1],[5,6],[5,7],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,0],[7,1],[7,2],[7,4],[7,5],[7,6],[7,7]],
	
]

var symm_answer_demo = [].concat(new Array(7).fill(true), new Array(8).fill(false));

// variable symmetry_stimuli is similar to symmetry_demo_stimuli, but for stimuli symm1.bmp to symm48.bmp
var symm_stimuli = 
[
    //1
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,1],[1,6],[2,0],[2,1],[2,3],[2,4],[2,6],[2,7],[3,0],[3,2],[3,3],[3,4],[3,5],[3,7],[4,0],[4,2],[4,3],[4,4],[4,5],[4,7],[5,0],[5,1],[5,3],[5,4],[5,6],[5,7],[6,1],[6,6],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
    
    //2
	[[0,0],[0,1],[0,3],[0,4],[0,6],[0,7],[1,2],[1,5],[2,1],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,3],[4,4],[4,6],[5,0],[5,1],[5,6],[5,7],[6,0],[6,1],[6,2],[6,5],[6,6],[6,7],[7,3],[7,4]],

	//3
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],[1,3],[1,4],[1,6],[1,7],[2,1],[2,2],[2,5],[2,6],[3,0],[3,1],[3,3],[3,4],[3,6],[3,7],[4,0],[4,1],[4,3],[4,4],[4,6],[4,7],[5,1],[5,2],[5,5],[5,6],[6,0],[6,1],[6,3],[6,4],[6,6],[6,7],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],

	//4
	[[0,0],[0,1],[0,6],[0,7],[1,1],[1,6],[2,0],[2,1],[2,6],[2,7],[3,0],[3,2],[3,3],[3,4],[3,5],[3,7],[4,0],[4,7],[5,0],[5,2],[5,3],[5,4],[5,5],[5,7],[6,0],[6,1],[6,6],[6,7],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],

	//5
	[[0,2],[0,5],[1,2],[1,5],[2,2],[2,5],[3,0],[3,2],[3,5],[3,7],[4,0],[4,2],[4,3],[4,4],[4,5],[4,7],[5,0],[5,2],[5,3],[5,4],[5,5],[5,7],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,2],[7,5]],

	//6
	[[0,0],[0,7],[1,0],[1,1],[1,6],[1,7],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,0],[3,2],[3,5],[3,7],[4,0],[4,2],[4,5],[4,7],[5,0],[5,2],[5,5],[5,7],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,0],[7,7]],

	//7
	[[0,0],[0,7],[1,0],[1,1],[1,3],[1,4],[1,6],[1,7],[2,2],[2,3],[2,4],[2,5],[3,3],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,2],[5,5],[6,0],[6,1],[6,6],[6,7],[7,0],[7,1],[7,6],[7,7]],

	//8
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,7],[2,0],[2,3],[2,4],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,3],[4,4],[4,7],[5,0],[5,7],[6,0],[6,7],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
	
	//9
	[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[2,0],[2,1],[2,2],[2,5],[2,6],[2,7],[3,0],[3,1],[3,6],[3,7],[4,0],[4,1],[4,6],[4,7],[5,0],[5,1],[5,2],[5,5],[5,6],[5,7],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],

	//10
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,1],[2,2],[2,5],[2,6],[2,7],[3,1],[3,2],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[6,2],[6,3],[6,4],[6,5],[7,2],[7,3],[7,4],[7,5]],

	//11
	[[0,0],[0,7],[1,0],[1,1],[1,6],[1,7],[2,0],[2,1],[2,2],[2,5],[2,6],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,2],[4,3],[4,4],[4,4],[4,5],[4,7],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,0],[6,1],[6,2],[6,5],[6,6],[6,7],[7,0],[7,1],[7,6],[7,7]],

	//12
	[[0,0],[0,1],[0,6],[0,7],[1,1],[1,2],[1,5],[1,6],[2,0],[2,1],[2,6],[2,7],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,0],[5,1],[5,6],[5,7],[6,1],[6,2],[6,5],[6,6],[7,0],[7,1],[7,6],[7,7]],

	//13
	[[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,1],[3,3],[3,4],[3,6],[4,0],[4,3],[4,4],[4,7],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6,],[6,7],[7,2],[7,3],[7,4],[7,5]],

	//14
	[[0,0],[0,1],[0,6],[0,7],[1,0],[1,1],[1,6],[1,7],[2,0],[2,2],[2,3],[2,4],[2,5],[2,7],[3,2],[3,5],[4,2],[4,3],[4,4],[4,5],[5,0],[5,1],[5,2],[5,5],[5,6],[5,7],[6,0],[6,1],[6,6],[6,7],[7,0],[7,1],[7,6],[7,7]],

	//15
	[[0,0],[0,3],[0,4],[0,7],[1,1],[1,3],[1,4],[1,6],[2,2],[2,3],[2,4],[2,5],[3,3],[3,4],[4,3],[4,4],[5,2],[5,3],[5,4],[5,5],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],

	//16
	[[0,0],[0,1],[0,6],[0,7],[1,1],[1,6],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,3],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,0],[5,7],[6,0],[6,1],[6,6],[6,7],[7,1],[7,2],[7,5],[7,6]],

	//17
	[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,1],[5,3],[5,4],[5,6],[6,1],[6,3],[6,4],[6,6],[7,0],[7,1],[7,6],[7,7]],

	//18
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,1],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,2],[3,3],[3,4],[3,5],[4,2],[4,3],[4,4],[4,5],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,1],[6,6],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],

	//19
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,3],[1,4],[1,7],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,1],[3,3],[3,4],[3,6],[4,1],[4,3],[4,4],[4,6],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[6,0],[6,3],[6,4],[6,7],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],

	//20
	[[0,2],[0,3],[0,4],[0,5],[1,1],[1,6],[2,0],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,0],[5,7],[6,1],[6,6],[7,2],[7,3],[7,4],[7,5]],

	//21
	[[0,1],[0,2],[0,5],[0,6],[1,1],[1,2],[1,5],[1,6],[2,0],[2,3],[2,4],[2,7],[3,1],[3,2],[3,5],[3,6],[4,1],[4,2],[4,5],[4,6],[5,0],[5,3],[5,4],[5,7],[6,1],[6,2],[6,5],[6,6],[7,1],[7,2],[7,5],[7,6]],

	//22
	[[0,2],[0,5],[1,2],[1,5],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,2],[3,5],[4,2],[4,5],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,2],[6,5],[7,2],[7,5]],

	//23
	[[0,2],[0,3],[0,4],[0,5],[1,1],[1,6],[2,2],[2,3],[2,4],[2,5],[3,0],[3,1],[3,6],[3,7],[4,2],[4,3],[4,4],[4,5],[5,1],[5,6],[6,2],[6,3],[6,4],[6,5],[7,0],[7,1],[7,6],[7,7]],

	//24
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,1],[1,6],[1,7],[2,1],[2,6],[3,0],[3,1],[3,6],[3,7],[4,0],[4,1],[4,6],[4,7],[5,1],[5,6],[6,0],[6,1],[6,6],[6,7],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],

	//25
	[[0,3],[0,4],[1,2],[1,3],[1,4],[2,2],[2,3],[2,4],[2,5],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,6],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[6,2],[6,3],[6,4],[6,5],[7,3],[7,4],[7,5]],

	//26
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,1],[1,2],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,1],[3,3],[3,4],[3,6],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,0],[5,3],[5,4],[5,7],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,1],[7,2],[7,5],[7,6]],
	
	//27
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[2,3],[2,4],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,2],[4,5],[5,2],[5,3],[5,4],[5,5],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,3],[7,4]],

	//28
	[[0,2],[0,3],[0,6],[0,7],[1,1],[1,6],[2,0],[2,1],[2,4],[2,6],[2,7],[3,0],[3,2],[3,3],[3,4],[3,5],[3,7],[4,0],[4,2],[4,3],[4,4],[4,5],[4,7],[5,0],[5,1],[5,4],[5,6],[5,7],[6,1],[6,6],[7,2],[7,3],[7,6],[7,7]],

	//29
	[[0,0],[0,1],[0,2],[0,5],[1,0],[1,2],[1,5],[2,0],[2,2],[2,5],[3,0],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,2],[5,5],[5,7],[6,2],[6,5],[6,7],[7,2],[7,5],[7,6],[7,7]],

	//30
	[[0,0],[0,1],[0,7],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,0],[2,1],[2,2],[2,6],[2,7],[3,0],[3,1],[3,2],[3,6],[3,7],[4,0],[4,1],[4,2],[4,6],[4,7],[5,0],[5,1],[5,2],[5,6],[5,7],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,0],[7,1],[7,7]],

	//31
	[[0,0],[0,6],[0,7],[1,0],[1,1],[1,6],[2,2],[2,5],[3,2],[3,3],[3,4],[3,5],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,1],[5,2],[5,5],[5,6],[6,0],[6,1],[6,6],[7,0],[7,6],[7,7]],

	//32
	[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,0],[1,4],[1,7],[2,0],[2,4],[3,2],[3,3],[3,4],[3,5],[4,2],[4,3],[4,4],[4,5],[4,7],[5,0],[5,3],[5,7],[6,0],[6,3],[6,7],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],

	//33
	[[0,2],[0,3],[0,4],[0,5],[1,2],[1,3],[1,4],[1,5],[2,0],[2,1],[2,2],[2,3],[2,5],[2,6],[2,7],[3,0],[3,1],[3,2],[3,3],[3,6],[3,7],[4,0],[4,1],[4,4],[4,5],[4,6],[4,7],[5,0],[5,1],[5,2],[5,4],[5,5],[5,6],[5,7],[6,2],[6,3],[6,4],[6,5],[7,2],[7,3],[7,4],[7,5]],

	//34
	[[0,0],[0,7],[1,0],[1,1],[1,6],[1,7],[2,0],[2,1],[2,2],[2,5],[2,6],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[6,3],[6,4],[6,5],[7,3],[7,4],[7,5]],

	//35
	[[0,0],[0,2],[0,3],[0,4],[0,5],[0,7],[1,1],[1,3],[1,4],[1,6],[2,0],[2,2],[2,4],[2,5],[2,7],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,0],[5,2],[5,3],[5,5],[5,7],[6,1],[6,3],[6,4],[6,6],[7,0],[7,2],[7,3],[7,4],[7,5],[7,7]],

	//36
	[[0,1],[0,2],[0,6],[0,7],[1,1],[1,2],[1,4],[1,5],[1,6],[1,7],[2,0],[2,1],[2,6],[2,7],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,0],[5,1],[5,6],[5,7],[6,0],[6,1],[6,2],[6,3],[6,5],[6,6],[7,0],[7,1],[7,5],[7,6]],

	//37
	[[0,0],[0,3],[0,4],[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[2,2],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[3,3],[3,4],[3,7],[4,0],[4,2],[4,3],[4,4],[4,5],[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,2],[7,3],[7,4],[7,5],[7,7]],

	//38
	[[0,0],[0,1],[0,5],[0,6],[0,7],[1,0],[1,1],[1,6],[1,7],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[3,2],[3,5],[4,2],[4,5],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,0],[6,1],[6,6],[6,7],[7,0],[7,1],[7,2],[7,6],[7,7]],

	//39
	[[0,1],[0,4],[0,6],[0,7],[1,1],[1,3],[1,4],[1,6],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,3],[3,4],[4,3],[4,4],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[6,1],[6,3],[6,4],[6,6],[7,0],[7,1],[7,3],[7,6]],
	
	//40
	[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,1],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,3],[3,4],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,0],[5,7],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[7,2],[7,6]],

	//41
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,0],[1,3],[1,7],[2,0],[2,1],[2,4],[2,6],[2,7],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,1],[5,6],[6,1],[6,6],[7,0],[7,1],[7,5],[7,6]],

	//42
	[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,5],[1,6],[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,3],[3,4],[3,5],[4,2],[4,3],[4,4],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[6,1],[6,2],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
	
	//43
	[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[1,1],[1,3],[1,4],[1,7],[2,1],[2,2],[2,3],[2,4],[2,5],[2,7],[3,1],[3,3],[3,4],[3,5],[3,6],[4,1],[4,2],[4,3],[4,4],[4,6],[5,0],[5,2],[5,3],[5,4],[5,5],[5,6],[6,0],[6,3],[6,4],[6,6],[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
	
	//44
	[[0,1],[0,7],[1,2],[1,6],[2,3],[2,5],[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[5,2],[5,4],[6,1],[6,5],[7,0],[7,6]],
	
	//45
	[[0,2],[0,5],[0,6],[0,7],[1,2],[1,5],[1,6],[1,7],[2,0],[2,1],[2,2],[2,5],[2,6],[2,7],[3,0],[3,3],[3,4],[4,3],[4,4],[4,7],[5,0],[5,1],[5,2],[5,5],[5,6],[5,7],[6,0],[6,1],[6,2],[6,5],[7,0],[7,1],[7,2],[7,5]],
	
	//46
	[[0,0],[0,1],[0,4],[1,0],[1,1],[1,4],[1,6],[1,7],[2,2],[2,3],[2,4],[2,5],[3,0],[3,1],[3,6],[3,7],[4,0],[4,1],[4,6],[4,7],[5,2],[5,3],[5,4],[5,5],[6,0],[6,1],[6,3],[6,6],[6,7],[7,0],[7,1],[7,3]],
	
	//47
	[[0,2],[0,3],[0,4],[0,5],[1,2],[1,5],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[3,0],[3,1],[3,6],[3,7],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[5,0],[5,5],[5,7],[6,2],[6,3],[6,4],[6,5],[7,2]],

	//48
	[[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[1,1],[1,6],[2,1],[2,2],[2,6],[2,7],[3,0],[3,1],[3,2],[3,5],[3,6],[3,7],[4,0],[4,1],[4,2],[4,5],[4,6],[4,7],[5,1],[5,2],[5,6],[5,7],[6,1],[6,6],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
]

var symm_answer = [].concat(new Array(24).fill(true), new Array(24).fill(false));