export function getDistanceBetweenPoints(point1, point2) {
  return Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);
}

export function doCirclesIntersect(circle1, circle2) {
  const c1 = circle1.position
  const r1 = circle1.r
  const c2 = circle2.position
  const r2 = circle2.r

  return getDistanceBetweenPoints(c1, c2) <= r1 + r2 + 1
}
function dotProduct(vector1, vector2) {
  return vector1.x * vector2.x + vector1.y * vector2.y 
}
function magnitude(vector) {
  return Math.sqrt(vector.x**2 + vector.y**2)
}

function getOverlapDistance(shape1, shape2) {
  return shape1.r + shape2.r - getDistanceBetweenPoints(shape1.position, shape2.position)
}
export function calculateDeflection(velocity, normal) {
  const cosAngle = dotProduct(velocity, normal) / (magnitude(velocity) * magnitude(normal))

  const magnitudeNBar = magnitude(velocity) * cosAngle;

  const NBar = { x: normal.x * magnitudeNBar / magnitude(normal), y: normal.y * magnitudeNBar / magnitude(normal) }
  
  return {x: 0.98 * (velocity.x - 2 * NBar.x) , y: 0.98 * (velocity.y - 2 * NBar.y) }
}
  
export function calculateNewPosition(shape1, shape2) {
  const newPositionVector = { x: shape1.position.x - shape2.position.x, y: shape1.position.y - shape2.position.y }

  const overlapDistance = getOverlapDistance(shape1, shape2)/magnitude(newPositionVector)
  
  return { x: shape1.position.x + 2*overlapDistance * newPositionVector.x, y: shape1.position.y + 2*overlapDistance * newPositionVector.y }
}