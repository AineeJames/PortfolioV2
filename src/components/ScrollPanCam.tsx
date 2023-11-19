import { useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'

function ScrollPanCam() {

  const [scrollY, setScrollY] = useState(0);
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  const pan_factor = 3;
  const easeFactor = 0.05;

  window.onwheel = (event: WheelEvent) => {
    const newScrollY = THREE.MathUtils.clamp(scrollY + (event.deltaY * 0.5), 0, 1000)
    setScrollY(newScrollY)
  }

  useFrame((state) => {
    const targetPosition = new THREE.Vector3(
      Math.sin(state.pointer.x / 4) * pan_factor,
      state.pointer.y / (pan_factor + 2),
      Math.cos(state.pointer.x / 4) * pan_factor
    );
    const newY = -scrollY * 0.05;
    targetPosition.y += newY;
    camera.position.lerp(targetPosition, easeFactor);
    const lookAtTarget = new THREE.Vector3(0, newY, -10);
    target.current.lerp(lookAtTarget, easeFactor);
    camera.lookAt(target.current);
  });

  return null;

}

export default ScrollPanCam
