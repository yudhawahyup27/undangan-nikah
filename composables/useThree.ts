import { ref, onUnmounted } from 'vue'

export const useStarField = () => {
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  let renderer: any = null
  let scene: any = null
  let camera: any = null
  let animationId: number | null = null
  let stars: any = null

  const init = async (canvas: HTMLCanvasElement) => {
    const THREE = await import('three')

    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Create star particles
    const starCount = 2000
    const positions = new Float32Array(starCount * 3)
    const sizes = new Float32Array(starCount)
    const colors = new Float32Array(starCount * 3)

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200

      sizes[i] = Math.random() * 2 + 0.5

      // Colors: white, gold, soft blue
      const colorChoice = Math.random()
      if (colorChoice < 0.6) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 0.98; colors[i * 3 + 2] = 0.9
      } else if (colorChoice < 0.85) {
        colors[i * 3] = 0.99; colors[i * 3 + 1] = 0.86; colors[i * 3 + 2] = 0.54
      } else {
        colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1
      }
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('customSize', new THREE.BufferAttribute(sizes, 1))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    })

    stars = new THREE.Points(geometry, material)
    scene.add(stars)

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    animate()

    return { renderer, scene, camera, stars, THREE }
  }

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    if (stars) {
      stars.rotation.y += 0.0001
      stars.rotation.x += 0.00005
    }
    renderer?.render(scene, camera)
  }

  const zoomIn = async (duration = 3000) => {
    if (!camera) return
    const start = camera.position.z
    const end = 0.5
    const startTime = Date.now()

    return new Promise<void>((resolve) => {
      const zoomAnim = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        // ease in-out cubic
        const ease = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2
        camera.position.z = start + (end - start) * ease
        if (progress < 1) requestAnimationFrame(zoomAnim)
        else resolve()
      }
      requestAnimationFrame(zoomAnim)
    })
  }

  const zoomOut = async (duration = 2000) => {
    if (!camera) return
    const start = camera.position.z
    const end = 5
    const startTime = Date.now()

    return new Promise<void>((resolve) => {
      const zoomAnim = () => {
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        camera.position.z = start + (end - start) * ease
        if (progress < 1) requestAnimationFrame(zoomAnim)
        else resolve()
      }
      requestAnimationFrame(zoomAnim)
    })
  }

  const destroy = () => {
    if (animationId) cancelAnimationFrame(animationId)
    renderer?.dispose()
    window.removeEventListener('resize', () => {})
  }

  onUnmounted(destroy)

  return { canvasRef, init, zoomIn, zoomOut, destroy }
}
