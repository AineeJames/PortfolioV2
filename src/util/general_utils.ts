export function getRandomPosition(minX: number, maxX: number, minY: number, maxY: number, minZ: number, maxZ: number): [number, number, number] {
  const x = Math.random() * (maxX - minX) + minX;
  const y = Math.random() * (maxY - minY) + minY;
  const z = Math.random() * (maxZ - minZ) + minZ;
  return [x, y, z];
}

export function getRandomRotation(): [number, number, number] {
  const randomRotationX = Math.random() * Math.PI * 2;
  const randomRotationY = Math.random() * Math.PI * 2;
  const randomRotationZ = Math.random() * Math.PI * 2;
  return [randomRotationX, randomRotationY, randomRotationZ];
}

export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function getRandomColor(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)]
}
