import { useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect, useMemo } from "react"
import * as THREE from "three"

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function Meteor() {

  const meteorRef = useRef<THREE.Mesh>(null!)

  const size = Math.random() * (1 - 0.1) + 0.1;
  const speed = Math.random() * (0.2 - 0.05) + 0.05
  const startY = getRandomNumber(-10, 50)

  useFrame((_, delta) => {
    meteorRef.current.rotateX(delta * 5)
    meteorRef.current.rotateY(delta * 6)
    meteorRef.current.rotateZ(delta * 7)
    meteorRef.current.position.x -= speed;
    meteorRef.current.position.y -= speed;
  })

  return (
    <>
      <mesh ref={meteorRef} position={[15, startY, -5]}>
        <sphereGeometry args={[size, 5, 5]} />
        <meshStandardMaterial color={"gray"} />
      </mesh>
    </>
  )

}

function MeteorShower() {
  const [meteors, setMeteors] = useState([]);
  const timeoutRef = useRef();

  useEffect(() => {
    const spawnMeteor = () => {
      setMeteors((prevMeteors) => [...prevMeteors, <Meteor key={Date.now()} />]);
      // Schedule the next meteor spawn after a random delay
      const nextSpawnDelay = Math.random() * getRandomNumber(10000, 20000); // Adjust the range of delay as needed
      timeoutRef.current = setTimeout(spawnMeteor, nextSpawnDelay);
    };

    // Initial meteor spawn
    spawnMeteor();

    // Clean up the setTimeout when the component unmounts
    return () => clearTimeout(timeoutRef.current);
  }, []); // Empty dependency array to run the effect only once

  return <>{meteors}</>;
}

export default MeteorShower
