var mic, fft;

function setup() {
  var canvas = createCanvas(300,100);
  canvas.parent('sketch-div');
  noFill();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8,16384);
  fft.setInput(mic);
}

function draw() {
  var spectrum = fft.analyze();
  background("#00040e");
  textSize(43);
  textAlign(CENTER,CENTER);
  indicator();
}
