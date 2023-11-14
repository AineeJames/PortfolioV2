import {
  ThreeElements, useFrame,
} from '@react-three/fiber'
import { useRef, useState } from 'react';

function Star(props: ThreeElements['mesh']) {

  const [visible, setVisible] = useState(true)

  const starRef = useRef<THREE.Mesh>(null!)
  const initSize = Math.random() * (0.1 - 0.01) + 0.01;

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
    >
      <sphereGeometry args={[initSize, 6, 2]} />
      <meshStandardMaterial color={"white"} />
    </mesh>
  ) : <></>

}

export default Star
