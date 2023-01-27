export function getDistanceBetweenPoints(point1, point2) {
  return Math.sqrt((point1.x - point2.x)**2 + (point1.y - point2.y)**2);
}

export function doCirclesIntersect(circle1, circle2) {
  const c1 = circle1.position
  const r1 = circle1.r
  const c2 = circle2.position
  const r2 = circle2.r

  return getDistanceBetweenPoints(c1, c2) <= r1 + r2
}
function dotProduct(vector1, vector2) {
  return vector1.x * vector2.x + vector1.y * vector2.y 
}
function magnitude(vector) {
  return Math.sqrt(vector.x**2 + vector.y**2)
}
export function calculateDeflection(velocity, normal) {
  //angle = cos-1(velocity dot normal / magnitude(velocity) * magnitude(normal))
  const angle = Math.acos(dotProduct(velocity, normal) / (magnitude(velocity) * normal))
  // newVelcoity dot normal = cos(angle)* magnitudeVelocity 

  const newVelocityX = 
}