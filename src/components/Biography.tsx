import { Text3D, Image } from "@react-three/drei"
import axios from "axios"
import { useEffect, useState } from "react"
import Icon from "./3DIcon"

interface BiographyProps {
  bio: {
    id: {
      N: string
    },
    orderIdx: {
      N: string
    },
    type: {
      S: string
    },
    pictureUrl: {
      S: string
    },
    bioText: {
      S: string
    }
  },
  yOffset: number
}

function Biography({ bio, yOffset }: BiographyProps) {

  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [imgWidth, setImgWidth] = useState<number>(0)
  const [imgHeight, setImgHeight] = useState<number>(0)

  const aspectRatio = imgWidth && imgHeight ? imgWidth / imgHeight : 1;
  const desiredWidth = 3.5;
  const desiredHeight = desiredWidth / aspectRatio;

  const getWH = async (blob: Blob) => {
    const bmp = await createImageBitmap(blob);
    const { width, height } = bmp;
    bmp.close();
    setImgWidth(width)
    setImgHeight(height)
  }

  useEffect(() => {
    axios({
      method: "get",
      url: bio.pictureUrl.S,
      responseType: "blob",
      withCredentials: false
    })
      .then(function(response) {
        const imageUrl = URL.createObjectURL(response.data);
        setImgUrl(imageUrl);
        getWH(response.data)
      });
  }, []);

  return (
    <>
      {imgUrl && <Image
        position={[-5.5, yOffset, -2]}
        scale={[desiredWidth, desiredHeight]}
        url={imgUrl}
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
