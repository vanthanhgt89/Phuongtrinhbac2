/**
 * Giai phuong trinh bac 2 tra ve nghiem hoac throw error
 * @param {*} a 
 * @param {*} b 
 * @param {*} c 
 */
function equation(a, b, c) {
	// Kiem tra tham so dau vao
	let a_ = parseFloat(a)
	let b_ = parseFloat(b) 
	let c_ = parseFloat(c)

	if(isNaN(a_)) {
		throw new Error (`a parmeter: ${a} is not number`)
	}
		if(isNaN(b_)) {
		throw new Error (`b parmeter: ${b} is not number`)
	}
		if(isNaN(c_)) {
		throw new Error (`c parmeter: ${c} is not number`)
	}
	if (a !== 0) {
		let delta = (b * b) - (4 * a * c);
		if (delta < 0) {
			throw new Error('delta nho hon 0')
		} else if (delta === 0) {
			let x = -b / (2 * a);
			return x;
		} else if (delta > 0) {
			let x1 = (-b + Math.sqrt(delta)) / (2 * a)
			let x2 = (-b - Math.sqrt(delta)) / (2 * a)
			return [x1, x2]
		}
	} else {
		return 'a phai khac 0'
	}


}
	try{
		let [x1, x2] = equation(2,5,3)
		console.log('x1 = ', x1)
		console.log('x1 = ', x2)
	}catch(error){
		console.log(error.message)
	}

// module.exports = equation; 
// module.exports.pt2 = equation;
// module.exports.pt3 = equation2;