import { getDistanceBetweenPoints, doCirclesIntersect, calculateDeflection, calculateNewPosition } from "../helpers/mathsHelpers";
import { getCanvas } from "../helpers/windowHelpers";
import { Shapes } from "../Shapes";

export default class Circle {
  constructor(x, y, r, canvasRef) {
  
    this.r = r;
    this.canvasRef = canvasRef
    this.timeId = Date.now()

    this.position = { x, y }
    this.velocity = {x: 0, y: -2}
  }

  doGravity() {
    if (!this.checkCollisions()) {
      this.velocity = {x: this.velocity.x, y: this.velocity.y + 0.1}

    }

    this.position = {
      x: this.position.x + this.velocity.x,
      y: this.position.y + this.velocity.y,
    }
  }
  
  handlePositionChange(shape) {
    this.position = calculateNewPosition(this, shape)
        let i = 0;
        while (doCirclesIntersect(this, shape) && i < 100) {
          this.position = calculateNewPosition(this, shape)
          i++;
        }
  }

  checkCollisions() {
    return Shapes.getShapes().some((shape) => {

      if ((this.timeId !== shape.timeId && doCirclesIntersect(this, shape))) {
        const normal = shape.getNormalTo(this.position)
        this.velocity = calculateDeflection(this.velocity, normal)

        shape.velocity = calculateDeflection(shape.velocity, normal)
        
        this.handlePositionChange(shape)
        
        return true
      }
    
      if (this.isTouchingFloor()) {
      
        this.velocity = {x: this.velocity.x , y: -this.velocity.y }
        
        return true
      }

      if (this.isTouchingSide()) {
        
        this.velocity = { x: -this.velocity.x, y: this.velocity.y }

        return true
      }
      
      return false
    })
  }
  
  isTouchingFloor() {
    return this.position.y >= getCanvas().height - this.r
  }

  isTouchingSide() { 
    return this.position.x <= this.r || this.position.x >= getCanvas().width - this.r
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

  getNormalTo(point) { 
   return {x: point.x - this.position.x, y: point.y - this.position.y}
 }
}
