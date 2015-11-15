
function Slot(id)
{
//	var slot = this;
	var slot = {};
	slot.id = id;
	slot.next = {};
	slot.next.iterate = function (limit, next, callback) {
		var i, curr, next;
		curr = next;
		prev = slot;
		for (i = 0; i < limit; i ++) {
			callback(curr);
			next = curr.next[prev.id];
			prev = curr;
			curr = next;
		}
	}
	
	slot.setFace = function (face) {
		slot.face = face;
		slot.color = face.id;
	};
	slot.isMiddle = function () {
		return slot.j == 4;
	}
	slot.isCorner = function () {
		return slot.j % 2 == 0;
	}
	slot.isBorder = function () {
		return slot.j % 2 == 1 && !slot.isMiddle();
	}
	slot.xy = function () {
		return sqxy[slot.j];
	}
	return slot;
}
