import { useEffect, useRef } from 'react'
import anime from 'animejs'

const animations = {
  fadeUp: { initial: { opacity: 0, translateY: 50, filter: 'blur(10px)' }, final: { opacity: 1, translateY: 0, filter: 'blur(0px)' } },
  fadeDown: { initial: { opacity: 0, translateY: -50, filter: 'blur(10px)' }, final: { opacity: 1, translateY: 0, filter: 'blur(0px)' } },
  fadeLeft: { initial: { opacity: 0, translateX: -60, filter: 'blur(10px)' }, final: { opacity: 1, translateX: 0, filter: 'blur(0px)' } },
  fadeRight: { initial: { opacity: 0, translateX: 60, filter: 'blur(10px)' }, final: { opacity: 1, translateX: 0, filter: 'blur(0px)' } },
  scaleUp: { initial: { opacity: 0, scale: 0.8, filter: 'blur(8px)' }, final: { opacity: 1, scale: 1, filter: 'blur(0px)' } },
  rotateIn: { initial: { opacity: 0, rotate: -15, scale: 0.9, filter: 'blur(8px)' }, final: { opacity: 1, rotate: 0, scale: 1, filter: 'blur(0px)' } },
  slideUp: { initial: { translateY: 80, opacity: 0, filter: 'blur(10px)' }, final: { translateY: 0, opacity: 1, filter: 'blur(0px)' } },
  bounceIn: { initial: { opacity: 0, scale: 0.3, filter: 'blur(12px)' }, final: { opacity: 1, scale: 1, filter: 'blur(0px)' } },
  elasticScale: { initial: { opacity: 0, scale: 0, filter: 'blur(15px)' }, final: { opacity: 1, scale: 1, filter: 'blur(0px)' } }
}

export function useScrollAnimation({ animation = 'fadeUp', delay = 0, duration = 900, threshold = 0.15 } = {}) {
  const elementRef = useRef(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return
    const anim = animations[animation] || animations.fadeUp

    const setInitialStyles = () => {
      Object.entries(anim.initial).forEach(([prop, value]) => {
        if (prop === 'opacity') element.style.opacity = value
        else if (prop === 'translateY') element.style.transform = `translateY(${value}px)`
        else if (prop === 'translateX') element.style.transform = `translateX(${value}px)`
        else if (prop === 'scale') element.style.transform = `scale(${value})`
        else if (prop === 'rotate') element.style.transform = `rotate(${value}deg)`
        else if (prop === 'filter') element.style.filter = value
      })
    }

    setInitialStyles()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const easing = animation === 'bounceIn' ? 'easeOutBounce' : animation === 'elasticScale' ? 'easeOutElastic(1, .5)' : 'easeOutExpo'
        if (entry.isIntersecting) {
          anime({ targets: element, ...anim.final, duration, delay, easing })
        } else {
          setInitialStyles()
        }
      })
    }, { threshold })

    observer.observe(element)
    return () => observer.disconnect()
  }, [animation, delay, duration, threshold])

  return elementRef
}

export function useStaggerAnimation({ selector = '.stagger-item', animation = 'fadeUp', delay = 0, duration = 700, stagger = 100, threshold = 0.1 } = {}) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const items = container.querySelectorAll(selector)
    if (!items.length) return

    const animConfigs = {
      fadeUp: { initial: { opacity: '0', transform: 'translateY(40px)', filter: 'blur(10px)' }, final: { opacity: [0, 1], translateY: [40, 0], filter: ['blur(10px)', 'blur(0px)'] } },
      scaleUp: { initial: { opacity: '0', transform: 'scale(0.85)', filter: 'blur(8px)' }, final: { opacity: [0, 1], scale: [0.85, 1], filter: ['blur(8px)', 'blur(0px)'] } },
      slideIn: { initial: { opacity: '0', transform: 'translateX(-50px)', filter: 'blur(10px)' }, final: { opacity: [0, 1], translateX: [-50, 0], filter: ['blur(10px)', 'blur(0px)'] } },
      rotateIn: { initial: { opacity: '0', transform: 'rotate(-10deg) scale(0.9)', filter: 'blur(8px)' }, final: { opacity: [0, 1], rotate: [-10, 0], scale: [0.9, 1], filter: ['blur(8px)', 'blur(0px)'] } },
      flipUp: { initial: { opacity: '0', transform: 'perspective(400px) rotateX(45deg)', filter: 'blur(10px)' }, final: { opacity: [0, 1], rotateX: [45, 0], filter: ['blur(10px)', 'blur(0px)'] } }
    }

    const anim = animConfigs[animation] || animConfigs.fadeUp
    const setInitialStyles = () => items.forEach(item => Object.entries(anim.initial).forEach(([prop, value]) => { item.style[prop] = value }))
    setInitialStyles()

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          anime({ targets: items, ...anim.final, duration, delay: anime.stagger(stagger, { start: delay, from: 'first' }), easing: 'easeOutExpo' })
        } else {
          setInitialStyles()
        }
      })
    }, { threshold })

    observer.observe(container)
    return () => observer.disconnect()
  }, [selector, animation, delay, duration, stagger, threshold])

  return containerRef
}
