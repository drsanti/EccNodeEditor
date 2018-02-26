/******************************************************
 * Dragable Nodes/Objects                             *
 * Dr.Santi Nuratch                                   *
 * Embedded Computing and Control Laboratory (ECC-Lab)*
 * INC@KMUTT, Thailand                                *
 * 26 February, 2018                                  *
 ******************************************************
 * Ref: https://github.com/sketchpunk/NEditorJS       *
 ******************************************************/

//!! Dragable Object
var Dragable = function(name) {

    this.dragMode = 0;
    this.offsetX  = 0;          // OffsetX for dragging nodes
    this.offsetY  = 0;          // OffsetY for dragging nodes
    this.dragItem = null;       // Reference to the dragging item

    //!! Create root element, the container
    this.root = document.createElement("div");
    this.root.className = "NodeContainer";

    //!! Create header element
    this.header = document.createElement("header");
    this.header.innerHTML = name;

    //!! Appdned the header to root
    this.root.appendChild(this.header);

    //!! Append the root to body
    document.body.appendChild(this.root);

    //!! Callback functionof the mousedown
    //!! To share "this" object, bind() is requied!!
    this.header.addEventListener("mousedown", this.onHeaderDown.bind(this));
}

//!! Set node position
Dragable.prototype.setPosition = function(x, y) {
    this.root.style.left = x + "px";
    this.root.style.top  = y + "px";
}

//!! Set node width
Dragable.prototype.setWidth = function(w) {
    this.root.style.width = w + "px";
}

//!! Mouse Down
Dragable.prototype.onHeaderDown = function(e) {
    e.stopPropagation();
    e.preventDefault();
    this.onStartDraging(e.target.parentNode, e.pageX, e.pageY);
}

//!! Start Draging
Dragable.prototype.onStartDraging = function(n, x, y) {
    if(this.dragMode != 0) 
        return;
    this.dragMode = 1;
    this.dragItem = n;
    this.offsetX = n.offsetLeft - x;
    this.offsetY = n.offsetTop - y;
    window.addEventListener("mousemove", this.onObjectDraging.bind(this));
    window.addEventListener("mouseup", this.onStopDraging.bind(this));
}

//!! Mouse Move (Draging)
Dragable.prototype.onObjectDraging = function(e) {
    e.stopPropagation(); 
    e.preventDefault();
    if(this.dragItem){
        this.dragItem.style.left = e.pageX + this.offsetX + "px";
        this.dragItem.style.top = e.pageY + this.offsetY + "px";
    }
}

//!! Mouse Up (Stop draging)
Dragable.prototype.onStopDraging = function(e) {
    e.stopPropagation(); 
    e.preventDefault();
    this.dragItem = null;
    this.dragMode = 0;
    window.removeEventListener("mousemove", this.onObjectDraging);
    window.removeEventListener("mouseup", this.onStopDraging);   
}
