import { useEffect, useRef } from 'react'
import anime from 'animejs'

const animations = {
    fadeUp: { initial: { opacity: 0, translateY: 50 }, final: { opacity: 1, translateY: 0 } },
    fadeDown: { initial: { opacity: 0, translateY: -50 }, final: { opacity: 1, translateY: 0 } },
    fadeLeft: { initial: { opacity: 0, translateX: -60 }, final: { opacity: 1, translateX: 0 } },
    fadeRight: { initial: { opacity: 0, translateX: 60 }, final: { opacity: 1, translateX: 0 } },
    scaleUp: { initial: { opacity: 0, scale: 0.8 }, final: { opacity: 1, scale: 1 } },
    rotateIn: { initial: { opacity: 0, rotate: -15, scale: 0.9 }, final: { opacity: 1, rotate: 0, scale: 1 } },
    slideUp: { initial: { translateY: 80, opacity: 0 }, final: { translateY: 0, opacity: 1 } },
    bounceIn: { initial: { opacity: 0, scale: 0.3 }, final: { opacity: 1, scale: 1 } },
    elasticScale: { initial: { opacity: 0, scale: 0 }, final: { opacity: 1, scale: 1 } }
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
                else if (prop === 'translateY') element.style.transform = 'translateY(' + value + 'px)'
                else if (prop === 'translateX') element.style.transform = 'translateX(' + value + 'px)'
                else if (prop === 'scale') element.style.transform = 'scale(' + value + ')'
                else if (prop === 'rotate') element.style.transform = 'rotate(' + value + 'deg)'
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
            fadeUp: { initial: { opacity: '0', transform: 'translateY(40px)' }, final: { opacity: [0, 1], translateY: [40, 0] } },
            scaleUp: { initial: { opacity: '0', transform: 'scale(0.85)' }, final: { opacity: [0, 1], scale: [0.85, 1] } },
            slideIn: { initial: { opacity: '0', transform: 'translateX(-50px)' }, final: { opacity: [0, 1], translateX: [-50, 0] } },
            rotateIn: { initial: { opacity: '0', transform: 'rotate(-10deg) scale(0.9)' }, final: { opacity: [0, 1], rotate: [-10, 0], scale: [0.9, 1] } },
            flipUp: { initial: { opacity: '0', transform: 'perspective(400px) rotateX(45deg)' }, final: { opacity: [0, 1], rotateX: [45, 0] } }
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