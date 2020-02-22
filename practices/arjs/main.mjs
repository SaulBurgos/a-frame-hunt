import { SampleLogic } from './modules/sample.mjs';

// let temp = new SampleLogic();
// temp.test();

//https://medium.com/@kumar.ahir/how-to-correctly-set-dimensions-of-an-image-in-a-frame-8c1e598416e1
//https://github.com/chenzlabs/aframe-src-fit-component

function calculateAframeDimmension(width, height) {
	// image width = 987, height = 739
	// aspect ratio = w/h = 987/739 = 1.33		
	// assuming 987 px = 1 m
	// expected width of image in VR = 2.5 m
	// height of image in VR = 2.5/1.33 = 1.87

	var aspectRatio = width / height;
	var expectedWithOnVR = 2; //assuming 
	var elementHeight = expectedWithOnVR / aspectRatio;

	return {
		width: expectedWithOnVR,
		height: elementHeight
	}

}

function fitAspectRatio(w, h) {
	var ratio = (h || 1.0) / (w || 1.0);
	var geo = this.el.geometry;
	var neww, newh;
	if (geo && geo.width) {
		if (geo && geo.height && ratio > 1) { neww = geo.width / ratio; } else { newh = geo.height * ratio; }
	} else
		if (geo && geo.height) { neww = geo.width / ratio; } else {
			// variable width and height, stay smaller than 1
			neww = Math.min(1.0, 1.0 / ratio);
			newh = Math.min(1.0, ratio);
		}
	if (neww !== undefined) { this.el.setAttribute('width', neww); }
	if (newh !== undefined) { this.el.setAttribute('height', newh); }
	this.el.emit('fit', [neww, newh]);
}

$(document).ready(function () {

	document.querySelector('#portrait-image').onload = function () {
		var dimensions = calculateAframeDimmension(this.width,this.height);
		document.querySelector('#space').setAttribute('width', dimensions.width);
		document.querySelector('#space').setAttribute('height', dimensions.height);
	};

	document.querySelector('#square-image').src = 'image/square.jpg';
	document.querySelector('#portrait-image').src = 'image/portrait.jpg';

});