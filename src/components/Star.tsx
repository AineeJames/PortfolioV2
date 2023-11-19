import {
  ThreeElements, useFrame,
} from '@react-three/fiber'
import { useRef, useState } from 'react';
import { getRandomColor, getRandomFloat, getRandomRotation } from '../util/general_utils';

function Star(props: ThreeElements['mesh']) {

  const [visible, setVisible] = useState(true)
  const starRef = useRef<THREE.Mesh>(null!)

  const starColors = ["#a7a7fb", "#fa7aaa", "#fff8dc"];

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
      rotation={getRandomRotation()}
    >
      <sphereGeometry args={[getRandomFloat(0.01, 0.075), 4, 2]} />
      <meshStandardMaterial color={getRandomColor(starColors)} />
    </mesh>
  ) : null

}

export default Star
