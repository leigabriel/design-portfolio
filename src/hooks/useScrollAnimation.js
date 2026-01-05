import { useEffect, useRef } from 'react'
import anime from 'animejs'

export function useScrollAnimation(options = {}) {
  const elementRef = useRef(null)
  const hasAnimated = useRef(false)

  const {
    animation = 'fadeUp',
    delay = 0,
    duration = 800,
    easing = 'easeOutCubic',
    threshold = 0.1
  } = options

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const animations = {
      fadeUp: {
        initial: { opacity: 0, translateY: 40 },
        final: { opacity: 1, translateY: 0 }
      },
      fadeDown: {
        initial: { opacity: 0, translateY: -40 },
        final: { opacity: 1, translateY: 0 }
      },
      fadeLeft: {
        initial: { opacity: 0, translateX: -40 },
        final: { opacity: 1, translateX: 0 }
      },
      fadeRight: {
        initial: { opacity: 0, translateX: 40 },
        final: { opacity: 1, translateX: 0 }
      },
      fadeIn: {
        initial: { opacity: 0 },
        final: { opacity: 1 }
      },
      scaleUp: {
        initial: { opacity: 0, scale: 0.9 },
        final: { opacity: 1, scale: 1 }
      },
      slideUp: {
        initial: { translateY: 60 },
        final: { translateY: 0 }
      }
    }

    const anim = animations[animation] || animations.fadeUp

    Object.entries(anim.initial).forEach(([prop, value]) => {
      if (prop === 'opacity') {
        element.style.opacity = value
      } else if (prop === 'translateY') {
        element.style.transform = `translateY(${value}px)`
      } else if (prop === 'translateX') {
        element.style.transform = `translateX(${value}px)`
      } else if (prop === 'scale') {
        element.style.transform = `scale(${value})`
      }
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            
            anime({
              targets: element,
              ...anim.final,
              duration,
              delay,
              easing
            })
          }
        })
      },
      { threshold }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [animation, delay, duration, easing, threshold])

  return elementRef
}

export function useStaggerAnimation(options = {}) {
  const containerRef = useRef(null)
  const hasAnimated = useRef(false)

  const {
    selector = '.stagger-item',
    animation = 'fadeUp',
    delay = 0,
    duration = 600,
    stagger = 80,
    easing = 'easeOutCubic',
    threshold = 0.1
  } = options

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const items = container.querySelectorAll(selector)
    if (items.length === 0) return

    const animations = {
      fadeUp: {
        initial: { opacity: '0', transform: 'translateY(30px)' },
        final: { opacity: [0, 1], translateY: [30, 0] }
      },
      fadeIn: {
        initial: { opacity: '0' },
        final: { opacity: [0, 1] }
      },
      scaleUp: {
        initial: { opacity: '0', transform: 'scale(0.9)' },
        final: { opacity: [0, 1], scale: [0.9, 1] }
      }
    }

    const anim = animations[animation] || animations.fadeUp

    items.forEach(item => {
      Object.entries(anim.initial).forEach(([prop, value]) => {
        item.style[prop] = value
      })
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true
            
            anime({
              targets: items,
              ...anim.final,
              duration,
              delay: anime.stagger(stagger, { start: delay }),
              easing
            })
          }
        })
      },
      { threshold }
    )

    observer.observe(container)

    return () => observer.disconnect()
  }, [selector, animation, delay, duration, stagger, easing, threshold])

  return containerRef
}
