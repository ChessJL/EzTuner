var mic, fft;

function setup() {
  var canvas = createCanvas(500, 100);
  canvas.parent('sketch-div');
  noFill();
  mic = new p5.AudioIn();
  mic.start();
  fft = new p5.FFT(0.8,16384);
  fft.setInput(mic);
}

function draw() {
  var spectrum = fft.analyze();
  background("#15273a");
  fill(255);
  textSize(43);
  textAlign(CENTER,CENTER);
  text(getLoudestFrequency(),250,50);
}

function getLoudestFrequency() {
    var halfsampleRate = sampleRate() / 2; // 22050
    var spectrum = fft.analyze(); // array of amplitudes in bins
    var bins = spectrum.length;  // 16384 bins
    var maxAmp = 0;
    var largestBin;
  // each bin equal to 22050/16384 = 1.346 Hz
    for (var i = 0; i < 500; i++) { //for loop to find the largest amplitude of bin
        var thisAmp = spectrum[i]; // amplitude of current bin
        if (thisAmp > maxAmp) {
            maxAmp = thisAmp;
            largestBin = i; //store the location of largestbin
        }
    }
    var loudestFreq = largestBin * (halfsampleRate / bins);
    return loudestFreq;
}
