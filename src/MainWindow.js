import React from "react";
import Circle from "./shapes/Circle";
import { getCanvasContext, getCanvas } from "./helpers/windowHelpers";
import { Shapes } from "./Shapes";

export default class MainWindow extends React.Component {
  constructor() {
    super();
    this.state = {
      canvasHeight: "100",
      canvasWidth: "100",
    };
    this.canvasRef = React.createRef();

  }

  render() {
    
    return (
      <div className="window-container">
        <div onClick={this.handleClick.bind(this)} className="main-window">
          <canvas
            ref={this.canvasRef}
            id="shapeCanvas"
            height={this.state.canvasHeight}
            width={this.state.canvasWidth}
          ></canvas>
        </div>
      </div>
    );
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
     this.setCanvasDimensions()
      this.clearCanvas()
      this.drawCanvas()
    })

    this.setCanvasDimensions();
    this.doFrames()
  

  }

  setCanvasDimensions() {
    this.setState({
      canvasHeight: getCanvas().parentElement.offsetHeight.toString(),
      canvasWidth: getCanvas().parentElement.offsetWidth.toString(),
    });
  }

  drawCanvas() {
    Shapes.getShapes().forEach((shape) => {
      shape.draw();
    });
  }

  doFrames() {
    Shapes.getShapes().forEach((shape) => { shape.doGravity() })
    this.clearCanvas()
    this.drawCanvas()

    requestAnimationFrame(this.doFrames.bind(this))
  }


  addCircle(x, y, r) {
    this.clearCanvas();
    Shapes.addShape(new Circle(x, y, r, this.canvasRef))
    this.drawCanvas();
  }

  getCanvasRef() {
    return this.canvasRef.current
  }

  getRelativeMouse(canvas, evt) {
    const rect = canvas.getBoundingClientRect();

    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    };
  }

  clearCanvas() {
    const canvas = this.getCanvasRef();

    getCanvasContext(canvas).clearRect(0, 0, canvas.width, canvas.height);
  }

  handleClick(event) {
    const mousePos = this.getRelativeMouse(getCanvas(), event);

    if (Shapes.getShapes().every((shape) => !shape.isPointInside(mousePos)))
      this.addCircle(mousePos.x, mousePos.y, 20);
  }
}
