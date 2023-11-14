import { useRef, useState } from 'react'
import * as THREE from 'three'
import {
  useFrame,
  useThree
} from '@react-three/fiber'

function ScrollPanCam() {

  const [scrollY, setScrollY] = useState(0);
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  window.onwheel = (event: WheelEvent) => {
    const newScrollY = THREE.MathUtils.clamp(scrollY + (event.deltaY * 0.5), 0, 1000000)
    setScrollY(newScrollY)
  }

  useFrame((state) => {
    const pan_factor = 3;
    const targetPosition = new THREE.Vector3(
      Math.sin(state.pointer.x / 4) * pan_factor,
      0,
      Math.cos(state.pointer.x / 4) * pan_factor
    );

    // Easing function for smoother interpolation
    const easeFactor = 0.05;

    // Damping for the camera position with easing
    const newY = -scrollY * 0.05;
    targetPosition.y = Math.max(newY);

    camera.position.lerp(targetPosition, easeFactor);

    // Update the lookAt target with damping and easing
    const lookAtTarget = new THREE.Vector3(0, newY, -10); // Assuming -10 is the desired forward-looking distance
    target.current.lerp(lookAtTarget, easeFactor);


    // Set the camera position and lookAt target
    camera.lookAt(target.current);
  });

  return <></>;

}

export default ScrollPanCam
