import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const ICE = '#d9e1ff'
const VIOLET = '#a27bff'
const CYAN = '#7c9cff'

function Stars({ count }: { count: number }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 10
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(p) * Math.cos(t)
      pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t)
      pos[i * 3 + 2] = r * Math.cos(p) - 4
    }
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [count])
  const ref = useRef<THREE.Points>(null)
  useFrame((_, d) => { if (ref.current) ref.current.rotation.y += d * 0.01 })
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.035} color={ICE} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

/** One small object orbiting the core. Each represents a part of what BizzTalks does. */
function Orbiter({ radius, speed, offset, tilt, children }: { radius: number; speed: number; offset: number; tilt: number; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset
    if (!ref.current) return
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 1.3) * 0.35 + Math.sin(t) * tilt, Math.sin(t) * radius * 0.55)
    ref.current.rotation.x += 0.01
    ref.current.rotation.y += 0.014
  })
  return <group ref={ref}>{children}</group>
}

function Core({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null)
  const core = useRef<THREE.Mesh>(null)
  const ring = useRef<THREE.Mesh>(null)

  useFrame(({ clock }, d) => {
    const t = clock.elapsedTime
    if (group.current && pointer.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.current.x * 0.45, 0.05)
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.current.y * 0.3, 0.05)
      group.current.position.y = Math.sin(t * 0.8) * 0.08
    }
    if (core.current) { core.current.rotation.y += d * 0.25; core.current.rotation.x += d * 0.1 }
    if (ring.current) ring.current.rotation.z = Math.sin(t * 0.3) * 0.15
  })

  const metal = { color: '#3a4a8c', metalness: 0.8, roughness: 0.3, flatShading: true, emissive: '#141c52', emissiveIntensity: 0.7 }
  const glow = { color: ICE, emissive: CYAN, emissiveIntensity: 0.45, metalness: 0.55, roughness: 0.3 }
  const glowV = { color: '#e4d9ff', emissive: VIOLET, emissiveIntensity: 0.55, metalness: 0.55, roughness: 0.3 }

  return (
    <group ref={group}>
      {/* faceted core: the "idea" */}
      <mesh ref={core}>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshStandardMaterial {...metal} />
      </mesh>
      <mesh rotation={[0.3, 0.2, 0]}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial color={CYAN} wireframe transparent opacity={0.28} />
      </mesh>

      {/* oval ring echoing the BizzTalks badge */}
      <mesh ref={ring} scale={[1, 1.32, 1]}>
        <torusGeometry args={[1.95, 0.022, 16, 160]} />
        <meshBasicMaterial color={ICE} transparent opacity={0.85} />
      </mesh>
      <mesh scale={[1, 1.32, 1]} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.35, 0.008, 8, 160]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.5} />
      </mesh>

      {/* marketing / creativity / technology / growth */}
      <Orbiter radius={2.55} speed={0.45} offset={0} tilt={0.6}>
        <mesh><torusGeometry args={[0.2, 0.07, 12, 32]} /><meshStandardMaterial {...glow} /></mesh>
      </Orbiter>
      <Orbiter radius={2.3} speed={0.38} offset={1.6} tilt={-0.8}>
        <mesh><octahedronGeometry args={[0.22]} /><meshStandardMaterial {...glowV} flatShading /></mesh>
      </Orbiter>
      <Orbiter radius={2.7} speed={0.32} offset={3.2} tilt={0.9}>
        <mesh><boxGeometry args={[0.28, 0.28, 0.28]} /><meshStandardMaterial {...metal} color="#4b5bb0" /></mesh>
      </Orbiter>
      <Orbiter radius={2.45} speed={0.5} offset={4.7} tilt={-0.5}>
        <mesh><coneGeometry args={[0.16, 0.36, 4]} /><meshStandardMaterial {...glow} flatShading /></mesh>
      </Orbiter>
      <Orbiter radius={2.85} speed={0.27} offset={2.4} tilt={0.3}>
        <mesh><sphereGeometry args={[0.1, 16, 16]} /><meshBasicMaterial color={VIOLET} /></mesh>
      </Orbiter>
    </group>
  )
}

export default function HeroScene() {
  const wrap = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0 })
  const [visible, setVisible] = useState(true)
  const isMobile = useMemo(() => window.matchMedia('(max-width: 767px)').matches, [])
  const reduce = useMemo(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches, [])

  useEffect(() => {
    const el = wrap.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('pointermove', move) }
  }, [])

  return (
    <div ref={wrap} className="h-full w-full" role="img" aria-label="Interactive 3D illustration: a faceted core inside an oval ring, orbited by shapes for marketing, creativity, technology and growth">
      <Canvas
        dpr={isMobile ? [1, 1.25] : [1, 1.6]}
        camera={{ position: [0, 0, 8.2], fov: 42 }}
        gl={{ antialias: !isMobile, alpha: true, powerPreference: 'low-power' }}
        frameloop={!visible ? 'never' : reduce ? 'demand' : 'always'}
      >
        <ambientLight intensity={0.6} />
        <hemisphereLight args={['#dfe6ff', '#120a2e', 0.9]} />
        <directionalLight position={[4, 5, 5]} intensity={2.2} color="#f5f7ff" />
        <pointLight position={[-4, -2, 3]} intensity={18} color={CYAN} />
        <pointLight position={[3, -3, -2]} intensity={16} color={VIOLET} />
        <Core pointer={pointer} />
        <Stars count={isMobile ? 220 : 600} />
      </Canvas>
    </div>
  )
}
