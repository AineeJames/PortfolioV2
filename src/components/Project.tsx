import {
  Image,
  Text3D,
  Center,
} from '@react-three/drei'
import Icon from './3DIcon'
import { useEffect, useState } from 'react'

import ProjectDescription from './ProjectDescription'
import { getS3Image } from '../util/s3utils'
import { S3ImageBlob } from '../interfaces/interfaces'

interface ProjectProps {
  project: {
    id: { N: string },
    orderIdx: { N: string },
    projectHeading: { S: string },
    projectSubtitle: { S: string },
    projectDescription: { S: string },
    projectLink: { S: string },
    projectIcons?: { SS: [string] },
    projectPicS3Key?: { S: string }
  },
  yOffset: number
}

function Project({ project, yOffset }: ProjectProps) {

  const { projectHeading, projectSubtitle, projectLink, projectIcons, projectPicS3Key, projectDescription } = project

  const [imgHovered, setImgHovered] = useState<boolean>(false)
  const [projImg, setProjImg] = useState<null | S3ImageBlob>(null)

  useEffect(() => {
    if (projectPicS3Key) {
      const getProjImg = async () => {
        const img = await getS3Image("personal-portfolio-pics", projectPicS3Key.S)
        setProjImg(img)
      }
      getProjImg()
    }
  }, []);

  const aspectRatio = projImg?.width && projImg.height ? projImg.width / projImg.height : 1;
  const desiredWidth = 6.5;
  const desiredHeight = desiredWidth / aspectRatio;
  const xOffset = -7

  return (
    <>
      <Icon
        icon='github'
        position={[xOffset, yOffset, 0]}
        visible={projectLink != null}
        action={() => { window.open(projectLink["S"]) }}
      />
      <Text3D
        font={"/SpaceMonoBold.json"}
        position={[projectLink ? xOffset + 0.6 : xOffset, yOffset, 0]}
        size={0.5}
      >
        {projectHeading["S"]}
        <meshStandardMaterial color={"white"} />
      </Text3D>
      <Text3D
        font={"/SpaceMonoItalic.json"}
        position={[xOffset + 0.05, yOffset - 0.45, -1]}
        rotation={[-0.4, 0, 0]}
        size={0.2}
      >
        {projectSubtitle["S"]}
        <meshStandardMaterial color={"#123"} />
      </Text3D>
      {projectIcons && projectIcons["SS"].map((icon, idx) => <Icon key={idx} icon={icon} size={0.25} position={[xOffset, yOffset - 0.8 - (0.4 * idx), -1]} rotation={[0.2, 0.2, 0]} color="#333" />)}
      {projImg?.url &&
        <Center right bottom position={[xOffset + 0.4, yOffset - 0.5, -2]}>
          <Image
            onClick={() => { window.open(projectLink["S"]) }}
            scale={!imgHovered ? [desiredWidth, desiredHeight] : [desiredWidth - 0.1, desiredHeight - 0.1]}
            url={projImg.url}
            opacity={imgHovered ? 0.5 : 1}
            transparent
            onPointerOver={() => setImgHovered(true)}
            onPointerOut={() => setImgHovered(false)}
          />
        </Center>
      }
      <ProjectDescription startOffset={[projImg?.url ? xOffset + 7 : xOffset + 0.5, yOffset - 0.75, -1]} text={projectDescription["S"]} />
    </>
  )

}

export default Project
