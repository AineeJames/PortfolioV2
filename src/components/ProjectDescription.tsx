import { Text3D } from "@react-three/drei"
import { ReactNode, useState } from "react"
import { LinkProps, ProjectDescriptionProps } from "../interfaces/interfaces"

function Link({ url, pos }: LinkProps) {

  const [hov, setHov] = useState<boolean>(false)

  return (
    <Text3D
      font={"/SpaceMonoItalic.json"}
      position={pos}
      rotation={[-0.3, 0, 0]}
      height={0.25}
      size={0.175}
      onPointerEnter={() => setHov(true)}
      onPointerOut={() => setHov(false)}
      onClick={() => window.open(url)}
    >
      {"<" + url + ">"}
      <meshStandardMaterial color={!hov ? "#00a" : "#fff"} />
    </Text3D>
  )

}

function parseDescription(text: string, offset: [number, number, number]): ReactNode[] {
  const elemArray: ReactNode[] = []
  let yDisplacement = 0
  const lines = text.split("\n")
  let key = 0
  for (const line of lines) {
    if (line[0] === '#') {
      elemArray.push(
        <Text3D
          key={key}
          font={"/SpaceMonoBold.json"}
          position={[offset[0], offset[1] + yDisplacement, offset[2]]}
          height={0}
          size={0.175}
        >
          {line}
          <meshStandardMaterial color={"white"} />
        </Text3D>
      )
    } else if (line[0] === "!") {
      elemArray.push(
        <Link key={key} url={line.substring(1, text.length)} pos={[offset[0], offset[1] + yDisplacement, offset[2]]} />
      )
    } else {
      elemArray.push(
        <Text3D
          key={key}
          font={"/SpaceMonoRegular.json"}
          position={[offset[0], offset[1] + yDisplacement, offset[2]]}
          height={0}
          size={0.175}
        >
          {line}
          <meshStandardMaterial color={"#555"} />
        </Text3D>
      )
    }
    yDisplacement -= 0.3
    key += 1
  }
  return elemArray
}

function ProjectDescription({ text, startOffset }: ProjectDescriptionProps) {
  return (
    parseDescription(text, startOffset).map((elem) => elem)
  )
}

export default ProjectDescription
