var INTERVAL = null;
var FFT_SIZE = 512;
var TYPE = {
    'lounge': 'renderLounge'
};
let visualizer = null;

Visualizer = function  (cfg) {
    this.isPlaying = false;
    this.autoplay = cfg.autoplay || false;
    this.loop = cfg.loop || false;
    this.audio = document.getElementById(cfg.audio) || {};
    this.canvas = document.getElementById(cfg.canvas) || {};
    this.canvasCtx = this.canvas.getContext('2d') || null;
    this.author = this.audio.getAttribute('data-author') || '';
    this.title = this.audio.getAttribute('data-title') || '';
    this.ctx = null;
    this.analyser = null;
    this.sourceNode = null;
    this.frequencyData = [];
    this.audioSrc = null;
    this.duration = 0;
    this.minutes = '00';
    this.seconds = '00';
    this.style = cfg.style || 'lounge';
    this.barWidth = cfg.barWidth || 2;
    this.barHeight = cfg.barHeight || 2;
    this.barSpacing = cfg.barSpacing || 5;
    this.barColor = cfg.barColor || '#ffffff';
    this.shadowBlur = cfg.shadowBlur || 10;
    this.shadowColor = cfg.shadowColor || '#ffffff';
    this.font = cfg.font || ['12px', 'Helvetica'];
    this.gradient = null;
    this.stream = cfg.stream || null;
    this.audioStream = null;
    window.persistAudioStream = this.stream;
}

setContextAndAnalyzer =  function(visualizer) {
    try {
        visualizer.ctx = new AudioContext();
        visualizer.analyser = visualizer.ctx.createAnalyser();
        visualizer.analyser.smoothingTimeConstant = 0.6;
        visualizer.analyser.fftSize = FFT_SIZE;

        visualizer.audioStream = visualizer.ctx.createMediaStreamSource(visualizer.stream);
        visualizer.audioStream.connect(visualizer.analyser);

        return visualizer;
    } catch (e) {
        console.info('Web Audio API is not supported.', e);
    }
}

setFrequencyData = function (visualizer) {
    visualizer.frequencyData = new Uint8Array(visualizer.analyser.getByteFrequencyData());
    console.log(visualizer.frequencyData);
    return visualizer;
};

setCanvasStyles = function (visualizer) {
    visualizer.gradient = visualizer.canvasCtx.createLinearGradient(0, 0, 0, 300);
    visualizer.gradient.addColorStop(1, visualizer.barColor);
    visualizer.canvasCtx.fillStyle = visualizer.gradient;
    visualizer.canvasCtx.shadowBlur = visualizer.shadowBlur;
    visualizer.canvasCtx.shadowColor = visualizer.shadowColor;
    visualizer.canvasCtx.font = visualizer.font.join(' ');
    visualizer.canvasCtx.textAlign = 'center';
    return visualizer;
};

beginPlayback = function (visualizer) {
    visualizer.canvasCtx.fillText('Loading...', visualizer.canvas.width / 2 + 10, visualizer.canvas.height / 2);
    visualizer.isPlaying = true;
    return visualizer;
};

function renderFrame () {
    window.requestAnimationFrame(this.renderFrame.bind(this));
    this.visualizer.analyser.getByteFrequencyData(this.visualizer.frequencyData);

    this.visualizer.canvasCtx.clearRect(0, 0, this.visualizer.canvas.width, this.visualizer.canvas.height);

    renderText();
    renderLounge();
}

function renderText () {
    var cx = this.visualizer.canvas.width / 2;
    var cy = this.visualizer.canvas.height / 2;
    this.visualizer.correction = 10;

    this.visualizer.canvasCtx.textBaseline = 'top';
    // this.canvasCtx.fillText('by ' + this.author, cx + correction, cy);
    this.visualizer.canvasCtx.fillText( this.visualizer.author, cx + this.visualizer.correction, cy);
    this.visualizer.canvasCtx.font = parseInt(this.visualizer.font[0], 10) + 8 + 'px ' + this.visualizer.font[1];
    this.visualizer.canvasCtx.textBaseline = 'bottom';
    this.visualizer.canvasCtx.fillText(this.visualizer.title, cx + this.visualizer.correction, cy);
    this.visualizer.canvasCtx.font = this.visualizer.font.join(' ');
};

function renderLounge () {
    var cx = this.visualizer.canvas.width / 2;
    var cy = this.visualizer.canvas.height / 2;
    var radius = 140;
    var maxBarNum = Math.floor((radius * 1.5 * Math.PI) / (this.visualizer.barWidth + this.visualizer.barSpacing)) + 1;
    var slicedPercent = Math.floor((maxBarNum) / 110);
    var barNum = maxBarNum - slicedPercent;
    var freqJump = Math.floor(this.visualizer.frequencyData.length / maxBarNum);

    for (var i = 0; i < barNum; i++) {
        var amplitude = this.visualizer.frequencyData[freqJump];
        var alfa = (i * 2 * Math.PI ) / maxBarNum;
        var beta = (3 * 45 - this.visualizer.barWidth) * Math.PI / 132;
        var x = 0;
        var y = radius - (amplitude / 12 - this.visualizer.barHeight);
        var w = this.visualizer.barWidth;
        var h = amplitude / 5 + this.visualizer.barHeight;

        this.visualizer.canvasCtx.save();
        this.visualizer.canvasCtx.translate(cx + this.visualizer.barSpacing, cy + this.visualizer.barSpacing);
        this.visualizer.canvasCtx.rotate(alfa - beta);
        this.visualizer.canvasCtx.fillRect(x, y, w, h);
        this.visualizer.canvasCtx.restore();
    }
};



var soundAllowed = function (stream) {

    var cfg = {
        autoplay: true,
        loop: true,
        audio: 'myAudio',
        canvas: 'myCanvas',
        style: 'lounge',
        barWidth: 4,
        barHeight: 10,
        barSpacing: 3,
        barColor: '#FF0000',
        shadowBlur: 15,
        shadowColor: '#000000',
        font: ['24px', 'Teko'],
        stream: stream
    }
    this.visualizer = new Visualizer(cfg);
    this.visualizer.ctx = new AudioContext();
    this.visualizer.analyser = this.visualizer.ctx.createAnalyser();
    this.visualizer.analyser.smoothingTimeConstant = 0.6;
    this.visualizer.analyser.fftSize = FFT_SIZE;

    this.visualizer.audioStream = this.visualizer.ctx.createMediaStreamSource(this.visualizer.stream);
    this.visualizer.audioStream.connect(this.visualizer.analyser);

    this.visualizer.frequencyData = new Uint8Array(this.visualizer.analyser.frequencyBinCount);

    this.visualizer.gradient = this.visualizer.canvasCtx.createLinearGradient(0, 0, 0, 300);
    this.visualizer.gradient.addColorStop(1, this.visualizer.barColor);
    this.visualizer.canvasCtx.fillStyle = this.visualizer.gradient;
    this.visualizer.canvasCtx.shadowBlur = this.visualizer.shadowBlur;
    this.visualizer.canvasCtx.shadowColor = this.visualizer.shadowColor;
    this.visualizer.canvasCtx.font = this.visualizer.font.join(' ');
    this.visualizer.canvasCtx.textAlign = 'center';

    this.visualizer.canvasCtx.fillText('Loading...', this.visualizer.canvas.width / 2 + 10, this.visualizer.canvas.height / 2);
    this.visualizer.isPlaying = true;

    renderFrame();

    return this.visualizer;
};

var soundNotAllowed = function (error) {
    console.log(error);
}

try {
    navigator.mediaDevices.getUserMedia({audio:true}).then(function (stream) {
        /* use the stream */
        soundAllowed(stream);
    });
} catch(err) {
    /* handle the error */
    soundNotAllowed(err);
}