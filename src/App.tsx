import {
  Canvas,
} from '@react-three/fiber'
import {
  Lightformer,
  Environment,
} from '@react-three/drei'
import { useEffect, useState } from 'react';
import axios from 'axios';

import { getRandomPosition } from './util/general_utils.ts';

import ScrollPanCam from './components/ScrollPanCam';
import Star from './components/Star';
import LandingWelcome from './components/LandingWelcome';
import Project from './components/Project';
import Biography from './components/Biography';
import Contact from './components/Contact';
import LoadingView from './components/LoadingView';

import { bioDataT, portfolioDataT } from "./interfaces/interfaces.ts"

function App() {

  const [portfolioData, setPortfolioData] = useState<null | portfolioDataT[]>(null)
  const [websiteLoaded, setWebsiteLoaded] = useState<boolean>(false)
  const [bioData, setBioData] = useState<null | bioDataT>(null)

  useEffect(() => {
    if (portfolioData !== null) {
      (async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setWebsiteLoaded(true)
      })()
    }
  }, [portfolioData])

  useEffect(() => {
    axios({
      method: "get",
      url: "https://xov7mdqakc.execute-api.us-west-2.amazonaws.com/default/getPortfolioData",
      headers: { "Content-Type": "application/json" }
    }).then((response) => {
      interface item { orderIdx: { N: string } }
      const results = JSON.parse(response.data.body).Items
      setBioData(results.filter((result: bioDataT) => {
        return result.type.S === "BIOGRAPHY"
      })[0])
      setPortfolioData(results.filter((result: portfolioDataT) => {
        return result.type.S === "PROJECT"
      }).sort((a: item, b: item) => {
        return parseInt(a.orderIdx.N, 10) - parseInt(b.orderIdx.N, 10)
      }));
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const starPositions: Array<[number, number, number]> = [];
  for (let i = 0; i < 500; i++) {
    const randomPosition = getRandomPosition(-15, 15, 10, -55, -10, -3);
    starPositions.push(randomPosition);
  }

  let zoomLevel = 80
  if (window.innerWidth < 1400) zoomLevel = 45

  return !websiteLoaded ? (
    <LoadingView />
  ) : (
    <Canvas orthographic camera={{ position: [-2, 2, 5], zoom: zoomLevel }} style={{ background: "black" }}>
      {starPositions.map((position, key) => { return (<Star position={position} key={key} />) })}
      <LandingWelcome />
      {bioData && <Biography bio={bioData} yOffset={-6.5} />}
      {portfolioData && portfolioData.map((project, idx: number) => { return (<Project project={project} key={project["id"]["N"]} yOffset={-(idx * 8) - 12} />) })}
      {(zoomLevel === 80) && portfolioData && <Contact yOffset={-(portfolioData.length * 8) - 10} />}
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
  )

}

export default App
