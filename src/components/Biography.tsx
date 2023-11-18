import { Text3D, Image } from "@react-three/drei"
import { useEffect, useState } from "react"
import Icon from "./3DIcon"
import { getS3Image } from "../util/s3utils"
import { S3ImageBlob } from "../interfaces/interfaces"

interface BiographyProps {
  bio: {
    id: { N: string },
    orderIdx: { N: string },
    type: { S: string },
    pictureS3Key: { S: string },
    bioText: { S: string }
  },
  yOffset: number
}

function Biography({ bio, yOffset }: BiographyProps) {

  const [bioImg, setBioImg] = useState<null | S3ImageBlob>(null)

  useEffect(() => {
    const getBioImg = async () => {
      const img = await getS3Image("personal-portfolio-pics", bio.pictureS3Key.S)
      setBioImg(img)
    }
    getBioImg()
  }, []);

  const aspectRatio = bioImg?.width && bioImg.height ? bioImg.width / bioImg.height : 1;
  const desiredWidth = 3.5;
  const desiredHeight = desiredWidth / aspectRatio;

  return (
    <>
      {bioImg?.url && <Image
        position={[-5.5, yOffset, -2]}
        scale={[desiredWidth, desiredHeight]}
        url={bioImg.url}
      />}
      <Icon
        icon={"wave"}
        position={[-3.5, yOffset + 1.2, 1]}
        color="#fff"
        hoverColor="#fff"
      />
      <Text3D
        font={"/SpaceMonoBold.json"}
        position={[-2.6, yOffset + 1.2, 1]}
        height={0}
        size={0.5}
      >
        {"About Me"}
        <meshStandardMaterial color={"white"} />
      </Text3D>
      <Text3D
        font={"/SpaceMonoRegular.json"}
        position={[-3.4, yOffset + 0.5, 0]}
        height={0.25}
        size={0.2}
      >
        {bio.bioText.S}
        <meshStandardMaterial color={"#444"} />
      </Text3D>
    </>
  )

}

export default Biography
