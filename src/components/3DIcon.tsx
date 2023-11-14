import {
  Text3D,
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

const icon_lut = {
  "github": "",
  "github2": "",
  "python": "",
  "cli": "",
  "javascript": "",
  "typescript": "",
  "react": "",
  "apple": "",
  "aws": "",
}

interface IconProps {
  icon: "github" | "python" | "cli",
  position: [number, number, number],
  rotation?: [number, number, number],
  visible?: boolean,
  spin?: boolean,
  size?: number,
  color?: string,
  hoverColor?: string,
  action?: () => void
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
      {icon_lut[icon]}
      <meshStandardMaterial color={hovered ? hoverColor : color} />
    </Text3D>
  ) : null

}

export default Icon
