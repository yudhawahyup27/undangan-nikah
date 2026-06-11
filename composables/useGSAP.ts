import { onMounted, onUnmounted } from 'vue'

export const useGSAP = () => {
  let gsap: any = null
  let ScrollTrigger: any = null

  const init = async () => {
    if (process.client) {
      const gsapModule = await import('gsap')
      const stModule = await import('gsap/ScrollTrigger')
      gsap = gsapModule.gsap
      ScrollTrigger = stModule.ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)
    }
    return { gsap, ScrollTrigger }
  }

  const killAll = () => {
    if (ScrollTrigger) {
      ScrollTrigger.getAll().forEach((t: any) => t.kill())
    }
  }

  return { init, killAll }
}

export const useParallax = () => {
  const createParallax = (gsap: any, ScrollTrigger: any, elements: { el: Element; speed: number }[], container: Element) => {
    elements.forEach(({ el, speed }) => {
      gsap.to(el, {
        y: () => -speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      })
    })
  }

  return { createParallax }
}

export const useTextReveal = () => {
  const revealText = (gsap: any, elements: Element[], scrollTrigger: any) => {
    const spans = Array.from(elements).flatMap(el => {
      const text = el.textContent || ''
      const words = text.split(' ')
      el.innerHTML = words.map(w => `<span class="word-wrap" style="overflow:hidden;display:inline-block;margin-right:0.25em"><span style="display:inline-block;transform:translateY(110%)">${w}</span></span>`).join('')
      return Array.from(el.querySelectorAll('span > span'))
    })

    return gsap.to(spans, {
      y: 0,
      duration: 1.2,
      stagger: 0.06,
      ease: 'power4.out',
      scrollTrigger
    })
  }

  return { revealText }
}
