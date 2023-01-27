class ShapesList { 
    constructor() {
        this.shapesArray = []
    }

    addShape(shape) {
        this.shapesArray.push(shape)
    }

    getShapes() {
        return this.shapesArray
    }
}

export const Shapes = new ShapesList();