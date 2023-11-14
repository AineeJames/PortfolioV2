import {
  Canvas,
} from '@react-three/fiber'
import {
  Lightformer,
  Environment,
} from '@react-three/drei'
import { useEffect, useState } from 'react';
import axios from 'axios';

import ScrollPanCam from './components/ScrollPanCam';
import Star from './components/Star';
import LandingWelcome from './components/LandingWelcome';
import Project from './components/Project';

function App() {

  const [portfolioData, setPortfolioData] = useState(null)

  useEffect(() => {
    axios({
      method: "get",
      url: "https://xov7mdqakc.execute-api.us-west-2.amazonaws.com/default/getPortfolioData",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(function(response) {
        setPortfolioData(JSON.parse(response["data"]["body"])["Items"].sort((a, b) => {
          return parseInt(a.orderIdx.N, 10) - parseInt(b.orderIdx.N, 10)
        }));
      })
      .catch(function(error) {
        console.log(error);
      })
  }, [])

  function getRandomPosition(min: number, max: number): [number, number, number] {
    const x = Math.random() * (max - min) + min;
    const y = Math.random() * (max - min) + min;
    const z = Math.random() * (max - min) + min;
    return [x, y, z];
  }
  const starPositions: Array<[number, number, number]> = [];
  for (let i = 0; i < 2000; i++) {
    const randomPosition = getRandomPosition(-50, 50);
    starPositions.push(randomPosition);
  }
  for (let i = 0; i < 50; i++) {
    const randomPosition = getRandomPosition(-20, 20);
    starPositions.push(randomPosition);
  }

  return portfolioData ? (
    <>
      <Canvas orthographic camera={{ position: [-2, 2, 5], zoom: 80 }} gl={{ preserveDrawingBuffer: true }} style={{ background: "black" }}>
        {starPositions.map((position, key) => { return (<Star position={position} key={key} />) })}
        <LandingWelcome />
        {portfolioData.map((project, idx: number) => { return (<Project project={project} key={project["id"]["N"]} yOffset={-(idx * 8) - 5} />) })}
        <Environment resolution={32}>
          <group rotation={[0, 0, 0]}>
            <Lightformer intensity={20} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={20} position={[0, 5, 9]} scale={[10, 10, 1]} />
            <Lightformer intensity={20} position={[0, 0, 0]} scale={[1, 1, 1]} />
            <Lightformer type="ring" intensity={2} rotation-y={Math.PI / 2} position={[0, 0, 10]} scale={10} />
          </group>
        </Environment>
        <ScrollPanCam />
      </Canvas>
    </>
  ) : (
    <h1>Loading...</h1>
  )

}

export default App
