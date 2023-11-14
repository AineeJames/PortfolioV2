import {
  Image,
  Text3D,
  Center,
} from '@react-three/drei'
import Icon from './3DIcon'
import axios from 'axios'
import { useEffect, useState } from 'react'

import ProjectDescription from './ProjectDescription'

interface ProjectProps {
  project: {
    id: {
      N: string
    },
    orderIdx: {
      N: string
    },
    projectHeading: {
      S: string
    },
    projectSubtitle: {
      S: string
    },
    projectDescription: {
      S: string
    },
    projectLink: {
      S: string
    },
    projectIcons?: {
      SS: [string]
    },
    projectPicUrl?: {
      S: string
    }
  },
  yOffset: number
}

function addNewlines(text: string, maxLen: number) {
  let formattedText = ""
  const words = text.split(' ')
  let lineLen = 0
  let tmpLine: Array<string> = []
  for (const word of words) {
    if (lineLen + (tmpLine.length - 1) <= maxLen) {
      tmpLine.push(word)
      lineLen += word.length
    } else {
      formattedText += tmpLine.join(' ') + '\n'
      lineLen = 0
      tmpLine = [word]
    }
  }
  formattedText += tmpLine.join(' ')
  return formattedText
}

function Project({ project, yOffset }: ProjectProps) {

  const { projectHeading, projectSubtitle, projectLink, projectIcons, projectPicUrl, projectDescription } = project

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [imgWidth, setImgWidth] = useState<number | null>(null);
  const [imgHeight, setImgHeight] = useState<number | null>(null);
  const [imgHovered, setImgHovered] = useState<boolean>(false)

  const aspectRatio = imgWidth && imgHeight ? imgWidth / imgHeight : 1;
  const desiredWidth = 6.5;
  const desiredHeight = desiredWidth / aspectRatio;

  const getWH = async (blob: Blob) => {
    const bmp = await createImageBitmap(blob);
    const { width, height } = bmp;
    bmp.close();
    setImgWidth(width)
    setImgHeight(height)
  }

  useEffect(() => {
    if (projectPicUrl) {
      axios({
        method: "get",
        url: projectPicUrl["S"],
        responseType: "blob",
        withCredentials: false
      })
        .then(function(response) {
          const imageUrl = URL.createObjectURL(response.data);
          setImgUrl(imageUrl);
          getWH(response.data)
        });
    }
  }, [projectPicUrl]);


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
        position={[xOffset, yOffset - 0.4, -1]}
        rotation={[-0.4, 0, 0]}
        size={0.2}
      >
        {projectSubtitle["S"]}
        <meshStandardMaterial color={"#123"} />
      </Text3D>
      {projectIcons && projectIcons["SS"].map((icon, idx) => <Icon icon={icon} size={0.25} position={[xOffset, yOffset - 0.8 - (0.4 * idx), -1]} rotation={[0.2, 0.2, 0]} color="#333" />)}
      {imgUrl &&
        <Center right bottom position={[xOffset + 0.4, yOffset - 0.5, -2]}>
          <Image
            onClick={() => { window.open(projectLink["S"]) }}
            scale={!imgHovered ? [desiredWidth, desiredHeight] : [desiredWidth - 0.1, desiredHeight - 0.1]}
            url={imgUrl}
            opacity={imgHovered ? 0.5 : 1}
            transparent
            onPointerOver={() => setImgHovered(true)}
            onPointerOut={() => setImgHovered(false)}
          />
        </Center>
      }
      <ProjectDescription startOffset={[imgUrl ? xOffset + 7 : xOffset + 0.5, yOffset - 0.75, -1]} text={projectDescription["S"]} />
    </>
  )

}

export default Project
