
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
		for (i = 0; i < 3; i ++) {
			j = circular[i + (face*2)];
			slots[j].next.iterate(3, face % 2 == 0 ? slots[j].vout: slots[j].hout, function (slot) {
				res.push(slot);
			});
			
//			curr = face % 2 == 0 ? slots[j].vout: slots[j].hout;
//			prev = slots[j];
//			for (k = 0; k < 3; k ++) {
//				res.push(curr);
//				next = curr.next[prev.id];
//				prev = curr;
//				curr = next;
//			}
		}
		res = rotate(res, (face+3) % 4);
		return res;
	}
}
