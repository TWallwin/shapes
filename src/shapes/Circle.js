import { getDistanceBetweenPoints, doCirclesIntersect } from "../helpers/mathsHelpers";
import { getCanvas } from "../helpers/windowHelpers";
import { Shapes } from "../Shapes";

export default class Circle {
  constructor(x, y, r, canvasRef) {
  
    this.r = r;
    this.canvasRef = canvasRef
    this.timeId = Date.now()

    this.position = { x, y }
    this.velocity = {dx: 0, dy: -1}
  }

  doGravity() {
    if (this.checkCollisions()) {
      return 
    }

    this.velocity = {dx: this.velocity.dx, dy: this.velocity.dy + 0.1}
    this.position = {
      x: this.position.x + this.velocity.dx,
      y: this.position.y + this.velocity.dy,
    }
   }

  checkCollisions() {
    return Shapes.getShapes().some((shape) => {
    
      if ((this.timeId !== shape.timeId && doCirclesIntersect(this, shape)) || this.isTouchingSide()) {
        this.velocity = { dx: 0, dy: 0 }
        return true
      }
      
      return false
    })
  }
  
  isTouchingSide() {
    return this.position.y >= getCanvas().height - this.r
  }

  draw() {
    const c = this.canvasRef.current
    const ctx = c.getContext("2d");

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI);
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.stroke();
  }

  isPointInside(point) {
    return getDistanceBetweenPoints(point, { x: this.position.x, y: this.position.y }) <= this.r * 2;
  }
}
