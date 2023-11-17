import {
  ThreeElements, useFrame,
} from '@react-three/fiber'
import { useRef, useState } from 'react';

function Star(props: ThreeElements['mesh']) {

  const [visible, setVisible] = useState(true)

  const starRef = useRef<THREE.Mesh>(null!)

  const randomColor = () => {
    const colors: string[] = [
      "#a7a7fb",
      "#fa7aaa",
      "#fff8dc",
    ];
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const randomRotation: () => [number, number, number] = () => {
    const randomRotationX = Math.random() * Math.PI * 2;
    const randomRotationY = Math.random() * Math.PI * 2;
    const randomRotationZ = Math.random() * Math.PI * 2;

    return [randomRotationX, randomRotationY, randomRotationZ];
  }

  const randomSize = () => {
    const minSize = 0.01
    const maxSize = 0.075
    return Math.random() * (maxSize - minSize) + minSize;
  }

  useFrame(() => {
    const r = Math.floor(Math.random() * (1000));
    if (!visible && r < 50) {
      setVisible(true)
    }
    if (r < 2) {
      setVisible(!visible)
    }
  })

  return visible ? (
    <mesh
      {...props}
      ref={starRef}
      rotation={randomRotation()}
    >
      <sphereGeometry args={[randomSize(), 4, 2]} />
      <meshStandardMaterial color={randomColor()} />
    </mesh>
  ) : <></>

}

export default Star
