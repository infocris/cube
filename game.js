
var circular = [0,1,2,5,8,7,6,3,0];
var sqxy = [[-1, -1], [0, -1], [1, -1], [-1, 0], [0, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];

function Face()
{
	var slots = this.slots = [];
	this.slots90 = [];
	this.slots180 = [];
	this.slots270 = [];
	
	this.relative = function (face)
	{
		var i = 0, j, k, curr, next;
		var res = [];
//		console.log(face);
//		return;
		for (i = 0; i < 3; i ++) {
			j = circular[i + (face*2)];
//			console.log(i + (face*2), j);
//			console.log(slots);
			curr = face % 2 == 0 ? slots[j].vout: slots[j].hout;
			prev = slots[j];
			for (k = 0; k < 3; k ++) {
//				console.log(curr);
				res.push(curr);
				next = curr.next[prev.id];
				prev = curr;
				curr = next;
			}
		}
		res = rotate(res, (face+3) % 4);
//		res = rotate(res, 0);
//		res = rotate(res, Math.abs(face-5) % 4);
//		var rotates = {0:1, 3:2, 2:3};
//		if (face != 1) {
//			res = rotate(res, rotates[face]);
//		}
		return res;
	}
}
function Slot(id)
{
	var slot = this;
	this.id = id;
	this.next = {};
	this.setFace = function (face) {
		slot.face = face;
		slot.color = face.id;
	};
	this.isMiddle = function () {
		return slot.j == 4;
	}
	this.isCorner = function () {
		return slot.j % 2 == 0;
	}
	this.isBorder = function () {
		return slot.j % 2 == 1 && !slot.isMiddle();
	}
	this.xy = function () {
		return sqxy[slot.j];
	}
}

var rotateMatrixes = [[],[],[],[]];

(function () {
	var j, k;
	for (j = 0; j < 3; j ++) {
		for (k = 0; k < 3; k ++) {
			rotateMatrixes[0][(j*3)+k] = (j*3)+k;
			rotateMatrixes[3][(j*3)+k] = 2-j + (3*k);
			rotateMatrixes[2][(j*3)+k] = 8 - (3*j) - k;
			rotateMatrixes[1][(j*3)+k] = 6 + j - (3*k);
			
//			rotateMatrixes[0][(j*3)+k] = (j*3)+k;
//			rotateMatrixes[1][(j*3)+k] = 2-j + (3*k);
//			rotateMatrixes[2][(j*3)+k] = 8 - (3*j) - k;
//			rotateMatrixes[3][(j*3)+k] = 6 + j - (3*k);
		}
	}
})();

function rotate(matrix, num)
{
	var res = [];
	var i = 0;
	if (num == 0) {
		return matrix;
	}
	for (i = 0; i < 9; i ++) {
		res[i] = matrix[rotateMatrixes[num][i]];
	}
	return res;
}

window.Cube = function()
{
	var table = [];
	var faces = this.faces = [];
	var i, j, k, l;
	var slot, first, prev, prevprev;
	var face;
	
	for (i = 0; i < 9*6; i ++) {
		table[i] = new Slot(i);
	}
	
	for (i = 0; i < 6; i ++) {
		faces.push(face = new Face());
		face.id = i;
		for (j = 0; j < 9; j ++) {
			face.slots.push(slot = table[(i*9)+j]);
			slot.j = j;
			slot.setFace(face);
//			slot.color = i;
//			slot.face = faces[i];
		}
		face.slots90 = rotate(face.slots, 3);
		face.slots180 = rotate(face.slots, 2);
		face.slots270 = rotate(face.slots, 1);
//		console.log(face.slots90, face.slots180, face.slots270);
		
//		for (j = 0; j < 3; j ++) {
//			for (k = 0; k < 3; k ++) {
//				face.slots90.push(table[(i*9)+ 2-j + (3*k)]);
//				face.slots180.push(table[(i*9)+ 8 - (3*j) - k]);
//				face.slots270.push(table[(i*9)+ 6 + j - (3*k)]);
//			}
//		}
	}
	
	var flat = this.flat;
	
	var brgo_faces = [faces[2].slots, faces[3].slots, faces[4].slots, faces[5].slots];
	var wbyg_faces = [faces[0].slots, faces[2].slots, faces[1].slots, faces[4].slots180];
	var wryo_faces = [faces[0].slots270, faces[3].slots, faces[1].slots90, faces[5].slots180];
	
	var HORIZONTAL = 0;
	var VERTICAL = 1;
	flat = this.flat = constructFlat(brgo_faces, HORIZONTAL);
	linkFlatSlots(flat, HORIZONTAL);
	
	flat = this.flat = constructFlat(wbyg_faces, VERTICAL);
	linkFlatSlots(flat, VERTICAL);
	
	flat = this.flat = constructFlat(wryo_faces, VERTICAL);
	linkFlatSlots(flat, VERTICAL);

	function linkFlatSlots(flat, mode)
	{
		var from, to, curr, outside, inside, vh;
		for (i = 0; i < 3; i ++) {
			prevprev = flat[((i+1)*12)-2];
			prev = flat[((i+1)*12)-1];
			for (j = 0; j < 12; j ++) {
				slot = flat[(i*12)+j];
//				console.log(slot);
				if (prevprev) {
					from = prevprev;
					to = slot;
					curr = prev;
					
					curr.next[from.id] = to;
					curr.next[to.id] = from;
					
					if (curr.isMiddle()) {
					} else {
						outside = from.face.id == curr.face.id ? to: from;
						inside = from.face.id == curr.face.id ? from: to;
//						if (inside.xy()[0] == sqxy[curr.j][0]) {
						if (inside.xy()[0] == curr.xy()[0]) {
							vh = VERTICAL;
//						} else if (sqxy[inside.j][1] == sqxy[curr.j][1]) {
						} else if (inside.xy()[1] == curr.xy()[1]) {
							vh = HORIZONTAL;
						} else {
							throw new Error("unexpected corner");
						}
						if (curr.isCorner()) {
							curr[(HORIZONTAL == vh ? 'h': 'v') + 'out'] = outside;
						} else {
							// border
							if (curr.j == 1 || curr.j == 7) {
								if (VERTICAL == vh) {
									curr.vout = outside;
								}
							} else if (curr.j == 3 || curr.j == 5) {
								if (HORIZONTAL == vh) {
									curr.hout = outside;
								}
							} else {
								throw new Error("unexpected border");
							}
						}
					}
				}
				prevprev = prev;
				prev = slot;
			}
//			console.log("-----------------");
			
			prev = prevprev = null;
		}
	}
	function constructFlat(faces, mode)
	{
		var res = [];
		for (i = 0; i < 3; i ++) {
			for (j = 0; j < 4; j ++) {
				for (k = 0; k < 3; k ++) {
					slot = faces[j][mode == HORIZONTAL ? (i*3)+k : (k*3)+i];
					res.push(slot);
				}
			}
		}
		return res;
	}
}
