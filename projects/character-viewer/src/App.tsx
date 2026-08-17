import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function App() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x202020)

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )

    camera.position.z = 5

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)

    mountRef.current.appendChild(renderer.domElement)

    // Cube
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshNormalMaterial()

    const cube = new THREE.Mesh(geometry, material)

    scene.add(cube)

    // Animation
    const animate = () => {
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01

      renderer.render(scene, camera)

      requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      mountRef.current?.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} />
}

export default App