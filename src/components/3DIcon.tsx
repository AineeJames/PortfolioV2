import { Text3D } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { IconProps } from '../interfaces/interfaces'

const icon_lut: { [key: string]: string } = {
  "github": "",
  "github2": "",
  "python": "",
  "cli": "",
  "javascript": "",
  "typescript": "",
  "react": "",
  "apple": "",
  "aws": "",
  "wave": "",
  "email": ""
}

function Icon({
  icon,
  position,
  visible = true,
  spin = false,
  rotation = [0, 0, 0],
  size = 0.5,
  color = "white",
  hoverColor = "black",
  action = () => { }
}: IconProps) {

  const [hovered, setHovered] = useState(false)
  const linkRef = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    if (spin) {
      linkRef.current.rotation.y += 0.01
    }
  })

  return visible ? (
    <Text3D
      font={"/JetBrainsMonoRegular.json"}
      position={position}
      rotation={rotation}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={action}
      size={size}
      ref={linkRef}
      height={0}
    >
      {icon_lut[icon] ? icon_lut[icon] : "?"}
      <meshStandardMaterial color={hovered ? hoverColor : color} />
    </Text3D>
  ) : null

}

export default Icon
