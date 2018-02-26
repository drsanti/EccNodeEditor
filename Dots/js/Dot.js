
var Dot = function(name, x, y) {
    this.x = x;
    this.y = y;
    var c = this.randomRGB(1);
    this.colorH = c;
    this.colorN = this.changeAlpha(c, 0.5);
    this.name = name;
    this.root = document.createElement("div");
    this.root.innerHTML = name;
    this.root.className = "Dot";
    document.body.appendChild(this.root);

    //!! Text color
    this.root.style.color = this.randomRGB(1);

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

Dot.prototype.setPosition = function (x, y) {
    var w = this.root.offsetWidth;
    var h = this.root.offsetHeight;
    this.root.style.left = x-w/2 + "px";
    this.root.style.top  = y-h/2 + "px";
}

Dot.prototype.setSize = function(w, h) {

    //!! Width and Height
    this.root.style.width  = w + "px";
    this.root.style.height = h + "px";

    //!! Make text align vertically center
    this.root.style.lineHeight = h + "px";

    //!! Border Radius
    this.root.style.borderRadius = ((w > h) ? w : h) + "px";
}

Dot.prototype.randomRGB = function(alpha) {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    alpha = alpha || 1;
    return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
}

Dot.prototype.changeAlpha = function(color, alpha) {
    color = color || "rgba(100, 100, 100, 1";
    alpha = alpha || 1;
    var idx = color.lastIndexOf(",");
    var rgba = color.substring(0, idx + 1) + alpha + ")";
    return rgba;
}
