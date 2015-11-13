function Face()
{
	var slots = this.slots = [];
	this.slots90 = [];
	this.slots180 = [];
	this.slots270 = [];
	
	this.up = function ()
	{
//		console.log(slots[0], slots[0].next["h0"]);
	}
}
window.Cube = function()
{
	var table = [];
	var faces = this.faces = [];
	var i, j, k, l;
	var slot, first, prev, prevprev;
	for (i = 0; i < 9*6; i ++) {
		table[i] = {id: i, next: {}};
	}
	
	for (i = 0; i < 6; i ++) {
		faces.push(new Face());
		faces[i].id = i;
//		faces.push({
//			id: i,
//			slots: [],
//			slots90: [],
//			slots180: [],
//			slots270:[]
//		});
		for (j = 0; j < 9; j ++) {
			faces[i].slots.push(slot = table[(i*9)+j]);
			slot.color = i;
		}
		for (j = 0; j < 3; j ++) {
			for (k = 0; k < 3; k ++) {
				faces[i].slots90.push(table[(i*9)+ 2-j + (3*k)]);
				faces[i].slots180.push(table[(i*9)+ 8 - (3*j) - k]);
				faces[i].slots270.push(table[(i*9)+ 6 + j - (3*k)]);
			}
		}
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
	
	for (i = 0; i < 3; i ++) {
		break;
		prevprev = table[(5*9)+(i*3)+1];
		prev = table[(5*9)+(i*3)+2];
		for (j = 2; j < 6; j ++) {
			for (k = 0; k < 3; k ++) {
				slot = table[(i*3)+(j*9)+k];
//				console.log(slot);
				if (prevprev) {
					prev.next[prevprev.id] = slot;
					prev.next[slot.id] = prevprev;
				}
				flat.push(slot);
				prevprev = prev;
				prev = slot;
			}
		}
		
		prev = prevprev = null;
	}

	function linkFlatSlots(flat, mode)
	{
		for (i = 0; i < 3; i ++) {
			prevprev = flat[((i+1)*12)-2];
			prev = flat[((i+1)*12)-1];
			for (j = 0; j < 12; j ++) {
				slot = flat[(i*12)+j];
//				console.log(slot);
				if (prevprev) {
					prev.next[prevprev.id] = slot;
					prev.next[slot.id] = prevprev;
					if (mode == HORIZONTAL) {
						prev.next["h0"] = slot;
						prev.next["h1"] = prevprev;
					} else if (mode == VERTICAL) {
						prev.next["v0"] = slot;
						prev.next["v1"] = prevprev;
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
	function constructHorizontalFlat(faces)
	{
		var res = [];
		for (i = 0; i < 3; i ++) {
			for (j = 0; j < 4; j ++) {
				for (k = 0; k < 3; k ++) {
					slot = faces[j][(i*3)+k];
					res.push(slot);
				}
			}
		}
		return res;
	}
	function constructVerticalFlat(faces)
	{
		var res = [];
		for (i = 0; i < 3; i ++) {
			for (j = 0; j < 4; j ++) {
				for (k = 0; k < 3; k ++) {
					slot = faces[j][(k*3)+i];
					res.push(slot);
				}
			}
		}
		return res;
	}
}
