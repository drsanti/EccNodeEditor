/******************************************************
 * Create dots from div elements                      *
 * Dr.Santi Nuratch                                   *
 * Embedded Computing and Control Laboratory (ECC-Lab)*
 * INC@KMUTT, Thailand                                *
 * 26 February, 2018                                  *
 ******************************************************/

var Dot = function(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;

    //!! colors
    this.colorB = this.randomRGBA(1);    // border color
    this.colorH = this.randomRGBA(1);    // hover color
    this.colorN = this.changeAlpha(this.colorH, 0.5);
    
    //!! Root element
    this.root = document.createElement("div");
    this.root.innerHTML = name;
    this.root.className = "Dot";

    //!! Append to the body
    document.body.appendChild(this.root);

    //!! Border style
    this.root.style.borderStyle = "dotted solid double dashed";
    this.root.style.borderColor = this.colorB;
    this.root.style.borderWidth = "2px";
    
    //!! Text color
    this.root.style.color = this.randomRGBA(1);

    //!! Mouse Over
    this.root.onmouseover = () => {
        this.root.style.backgroundColor = this.colorH;
    }

    //!! Mouse Leave
    this.root.onmouseleave = () => {
        this.root.style.backgroundColor = this.colorN;
    }
    
    //!! Set podition
    this.setPosition(this.x, this.y);
    
    //!! Set size
    this.setSize(20 + Math.random() * 20, 20 + Math.random() * 20);
}


//!! Set position
Dot.prototype.setPosition = function (x, y) {
    var w = this.root.offsetWidth;
    var h = this.root.offsetHeight;
    this.root.style.left = x-w/2 + "px";
    this.root.style.top  = y-h/2 + "px";
}

//!! Set size
Dot.prototype.setSize = function(w, h) {

    //!! Width and Height
    this.root.style.width  = w + "px";
    this.root.style.height = h + "px";

    //!! Make text align vertically center
    this.root.style.lineHeight = h + "px";

    //!! Border Radius
    this.root.style.borderRadius = ((w > h) ? w : h) + "px";
}

//!! Random RGBA color
Dot.prototype.randomRGBA = function(alpha) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    alpha = alpha || 1;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
}

//!! Change alpha channel of RGBA
Dot.prototype.changeAlpha = function(color, alpha) {
    color = color || "rgba(100, 100, 100, 1";
    alpha = alpha || 1;
    var idx = color.lastIndexOf(",");
    var rgba = color.substring(0, idx + 1) + alpha + ")";
    return rgba;
}
//!! EOF
