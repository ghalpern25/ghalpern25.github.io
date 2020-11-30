/* Copyright (C) Gabriel Halpern
 * Created for CSC 335 - Learn-A-Language assignment
 * Fractal Tree Generator
 * Open "index.html" in browser to run
 *
 * This program uses the p5.js library for the creation of the majority
 * of the visual elements. p5.js is open-source and can be
 * found at p5js.org
 */

// p5 setup function, runs before "draw" and runs only once.
function setup() {
	isAuto = false;
	isScreenshot = false;
	createCanvas(windowWidth, windowHeight);
	createInputs();
	noLoop();
}

// p5 draw function, runs continuously unless "noLoop" has been called.
function draw() {
	updateInputInfo();
	background(backColor);
	if (!isScreenshot) {
		createText();
	}
	stroke(treeColor);
	line(0, height - 200, width, height - 200);
	translate(width / 2, height - 200);
	branch(startLen);
}

// creates all of the input elements in the correct place with default values and ranges
function createInputs() {
	loopButton = createButton('Toggle Auto');
	loopButton.position(width / 2 - 245, height - 100);
	loopButton.mousePressed(toggleAuto);
	loopButton.size(150, 50);
	loopButton.style('font-size', '20px');
	loopButton.style('background-color', '#FFCCCC');

	redrawButton = createButton('Redraw');
	redrawButton.position(width / 2 - 75, height - 100);
	redrawButton.mousePressed(redraw);
	redrawButton.size(150, 50);
	redrawButton.style('font-size', '20px');

	saveButton = createButton('Save');
	saveButton.position(width / 2 + 95, height - 100);
	saveButton.mousePressed(screenshot);
	saveButton.size(150, 50);
	saveButton.style('font-size', '20px');

	startLenSlider = createSlider(25, 200, 150);
	startLenSlider.position(0, height - 170);
	startLenSlider.style('width', '180px');

	deltaLenSlider = createSlider(0.5, 0.8, 0.75, 0.01);
	deltaLenSlider.position(200, height - 170);
	deltaLenSlider.style('width', '180px');

	angleSlider = createSlider(0.1, 0.85, 0.67, 0.01)
	angleSlider.position(400, height - 170);
	angleSlider.style('width', '180px');

	minLenSlider = createSlider(1, 8, 3)
	minLenSlider.position(600, height - 170);
	minLenSlider.style('width', '180px');

	skewSlider = createSlider(-1, 1, 0, 0.01);
	skewSlider.position(800, height - 170);
	skewSlider.style('width', '180px');

	backColorPicker = createColorPicker('white');
	backColorPicker.position(1000, height - 170);
	backColorPicker.style('width', '180px');

	treeColorPicker = createColorPicker('black');
	treeColorPicker.position(1200, height - 170);
	treeColorPicker.style('width', '180px');
}

// creates all of the input labels. This could be done in "draw" but has been separated for the sake of organization.
function createText() {
	noStroke();
	fill(treeColor);
	textSize(16);

	text('Starting Branch Length', 0, height - 180);
	text('Length Multiplier', 200, height - 180);
	text('Angle', 400, height - 180);
	text('Minimum Branch Length', 600, height - 180);
	text('Skew', 800, height - 180);
	text('Background Color', 1000, height - 180);
	text('Tree Color', 1200, height - 180);
}

// updates global variable values to reflect the current positions of the inputs.
function updateInputInfo() {
	backColor = backColorPicker.value();
	treeColor = treeColorPicker.value();
	startLen = startLenSlider.value();
	deltaLen = deltaLenSlider.value();
	angle = angleSlider.value();
	minLen = minLenSlider.value();
	skew = skewSlider.value();
	setSkews();
}

// determines whether to skew the tree to the left or right, and by how much, given the "skew" input.
function setSkews() {
	if (skew > 0) {
		rightSkew = skew;
		leftSkew = 0;
	} else if (skew < 0) {
		rightSkew = 0;
		leftSkew = skew;
	} else {
		rightSkew = 0;
		leftSkew = 0;
	}
}

// enables/disables automatic refresh for the tree.
function toggleAuto() {
	if (isAuto) {
		noLoop();
		loopButton.style('background-color', '#FFCCCC');
	} else {
		loop();
		loopButton.style('background-color', '#CCFFCC');
	}
	isAuto = !isAuto;
}

// temporarily causes the text to disappear, saves a picture of the canvas, then turns the text back on.
function screenshot() {
	isScreenshot = true;
	redraw();
	saveCanvas('FractalTree', 'png');
	isScreenshot = false;
	redraw();
}

// recursive function to create the branches.
function branch(len) {
	line(0, 0, 0, -len);
	translate(0, -len);
	if (len >= minLen) {
		push();
		rotate(angle + leftSkew);
		branch(len * deltaLen);
		pop();
		push();
		rotate(-angle + rightSkew);
		branch(len * deltaLen);
		branch();
		pop();
	}
}