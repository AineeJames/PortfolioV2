import {
  Text3D,
  Center,
  MeshTransmissionMaterial,
} from '@react-three/drei'

function LandingWelcome() {

  return (
    <Center>
      <Text3D
        font={"/SpaceMonoBoldItalic.json"}
        position={[0, 1.3, 0]}
        rotation={[0.4, 0.4, 0]}
        size={0.5}
      >
        {"Hi! I'm"}
        <meshStandardMaterial color={"#888"} />
      </Text3D>
      <Text3D
        font={"/SpaceMonoBoldItalic.json"}
        curveSegments={8}
        height={0.5}
        rotation={[0.4, 0.4, 0]}
      >
        {"Aiden Olsen"}
        <MeshTransmissionMaterial
          samples={32}
          resolution={256}
          thickness={0.3}
          distortion={0.7}
          roughness={0.5}
          distortionScale={0.1}
          temporalDistortion={0.5}
          color={"#f0f"}
          backside={true}
          chromaticAberration={100}
        />
      </Text3D>
    </Center>
  )

}

export default LandingWelcome
