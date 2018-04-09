let DObj = function( width, height, title ) {


    this.offsetX  = 0;
    this.offsetY  = 0;
    this.dragMode = false;
    this.dragItem = null;

    this.signal = {
        timer: null,
        alpha: 0,
        speed: (Math.PI/30 + Math.PI*Math.random()/50),
        amplitude: 0.5 + 0.5*Math.random(),
        freq: 5 + Math.random()*10,
    };


    //!! create root (main container) and add to the document
    this.root = document.createElement('div');
    this.root.id = 'container';
    this.root.style.width  = width;
    this.root.style.height = height;
    document.body.appendChild(this.root);

    //!! create header wrapper and add to root
    this.header = document.createElement('div');
    this.root.appendChild(this.header);
    this.header.innerHTML = title;
    this.header.id = 'header';
    this.header.style.height = '30px';
    this.header.style.backgroundColor = this.randomRGBA();
    this.header.style.color = '#222';

    //!! create canvas container (paper) and add to the root
    this.paper = document.createElement('div');
    this.root.appendChild(this.paper);
    this.paper.id = 'paper';
   
    //!! create canvas and add to the paper container
    this.canvas = document.createElement('canvas');
    this.canvas.style.backgroundColor = this.randomRGBA();
    this.paper.appendChild(this.canvas);
    this.canvas.width  = width;
    this.canvas.height = height - document.getElementById('header').offsetHeight;

    
    //!! get context of the canvas
    this.context = this.canvas.getContext('2d');

    //!! Mouse Down event of the header (header)
    this.header.addEventListener('mousedown', this.onHeaderDown.bind(this));

    //!! first draw
    //this.draw();


    this.root.style.left = window.innerWidth/2  + Math.random()*window.innerWidth/2 - window.innerWidth/2;
    this.root.style.top  = Math.random()*(window.innerHeight-100);


    this.signal.timer = setInterval(this.draw.bind(this), 100);
}

DObj.prototype.draw = function() {
    
    this.canvas.width = this.canvas.width;

    let data = [];
    for(let i=0; i<this.canvas.width; i++) {
        data[i] = this.canvas.height/2 - Math.sin(this.signal.alpha + Math.PI*2*this.signal.freq*i / this.canvas.width) * (this.canvas.height/2)*this.signal.amplitude;
    }
    this.signal.alpha += this.signal.speed;
    this.context.beginPath();
    this.context.moveTo(0,data[0]);
    for(let i=1; i<this.canvas.width; i++) {
        this.context.lineTo(i, data[i]);
    }
    this.context.stroke();
}

//!! Mouse down
DObj.prototype.onHeaderDown = function (e) {
    e.stopPropagation();
    e.preventDefault();
    let x = e.pageX; //let x = e.pageX - e.target.offsetLeft;
    let y = e.pageY; //let y = e.pageY - e.target.offsetTop;
    let c = e.target.parentNode;    //!! point to the div container
    this.onStartDraging(c, x, y);
} 

//!! Called by onHeaderDown
DObj.prototype.onStartDraging = function (c, x, y) {
    //console.log(c, x, y);

    if(this.dragMode == true) {
        return;
    }

    this.dragMode = true;
    this.dragItem = c;  //!! the div container
    this.offsetX  = c.offsetLeft - x;
    this.offsetY  = c.offsetTop  - y;

    //!! Create global mouse events
    window.addEventListener('mousemove', this.onObjectDraging.bind(this));
    window.addEventListener('mouseup', this.onStopDragingStop.bind(this));
}

//!! Mouse move
DObj.prototype.onObjectDraging = function(e) {
    e.stopPropagation(); 
    e.preventDefault();
    if(this.dragItem) {
        //console.log(e.pageX, e.pageY);
        this.dragItem.style.left = e.pageX + this.offsetX + "px";
        this.dragItem.style.top  = e.pageY + this.offsetY + "px";

        this.draw();
    }
}

//!! Mouse up
DObj.prototype.onStopDragingStop = function(e) {
    e.stopPropagation(); 
    e.preventDefault();  
    this.dragItem = null;
    this.dragMode = 0;
    window.removeEventListener("mousemove", this.onObjectDraging);
    window.removeEventListener("mouseup", this.onStopDragingStop);   
}

DObj.prototype.randomRGBA = function(alpha) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    alpha = alpha || 1;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
}

//!! Change alpha channel of RGBA
DObj.prototype.changeAlpha = function(color, alpha) {
    color = color || "rgba(100, 100, 100, 1";
    alpha = alpha || 1;
    var idx = color.lastIndexOf(",");
    var rgba = color.substring(0, idx + 1) + alpha + ")";
    return rgba;
}

let obj1 = new DObj(400, 250, 'Oscilloscope');
let obj2 = new DObj(300, 200, 'Oscilloscope');
let obj3 = new DObj(400, 150, 'Oscilloscope');










