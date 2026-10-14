import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'

export function ParticleField({ count, reduced }: { count: number; reduced: boolean }) {
  const points = useRef<Points>(null)
  const positions = useMemo(() => {
    const data = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = i * 2.399963
      const radius = 2.9 + (Math.sin(i * 43.2) + 1) * 1.15
      data[i * 3] = Math.cos(angle) * radius
      data[i * 3 + 1] = Math.sin(angle) * radius * .78
      data[i * 3 + 2] = Math.sin(i * 12.45) * 2
    }
    return data
  }, [count])
  useFrame((state, delta) => {
    if (!points.current || reduced) return
    points.current.rotation.z += delta * .012
    points.current.rotation.y += (state.pointer.x * .05 - points.current.rotation.y) * .025
  })
  return <points ref={points}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#b8addd" size={.018} sizeAttenuation transparent opacity={.55} depthWrite={false} /></points>
}
