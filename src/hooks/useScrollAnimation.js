import { useEffect, useRef } from 'react'
import { useSmoothScroll } from '../context/SmoothScrollContext'

function lerp(a, b, t) {
    return a + (b - a) * t
}

function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value))
}

function mapRange(value, inMin, inMax, outMin, outMax) {
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

const easings = {
    linear: t => t,
    easeOut: t => 1 - Math.pow(1 - t, 3),
    easeIn: t => t * t * t,
    easeInOut: t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    easeOutExpo: t => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    easeOutQuart: t => 1 - Math.pow(1 - t, 4),
    easeOutBack: t => {
        const c1 = 1.70158
        const c3 = c1 + 1
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2)
    },
}

function getElementProgress(element) {
    const rect = element.getBoundingClientRect()
    const wh = window.innerHeight
    const eh = rect.height
    const progress = (wh - rect.top) / (wh + eh)
    return clamp(progress)
}

function interpolateClipInset(from, to, t) {
    const parseInset = (str) => {
        const match = str.match(/inset\(([^)]+)\)/)
        if (!match) return [0, 0, 0, 0]
        const vals = match[1].split(/\s+/).map(v => parseFloat(v))
        while (vals.length < 4) vals.push(vals[vals.length - 1] || 0)
        return vals
    }
    const fv = parseInset(from)
    const tv = parseInset(to)
    const r = fv.map((f, i) => lerp(f, tv[i], t))
    return `inset(${r[0]}% ${r[1]}% ${r[2]}% ${r[3]}%)`
}

export function useScrollTransform(options = {}) {
    const {
        progressRange = [0.0, 0.55],
        translateY = null,
        translateX = null,
        scale = null,
        rotate = null,
        opacity = null,
        clipPath = null,
        lerpFactor = 0.08,
        easing = 'easeOut',
    } = options

    const ref = useRef(null)
    const cv = useRef({})
    const ctx = useSmoothScroll()

    useEffect(() => {
        if (!ref.current || !ctx) return

        const easeFn = easings[easing] || easings.easeOut

        const unsubscribe = ctx.subscribe(() => {
            const el = ref.current
            if (!el) return

            const raw = getElementProgress(el)
            const mapped = clamp(mapRange(raw, progressRange[0], progressRange[1], 0, 1))
            const t = easeFn(mapped)

            const targets = {}
            if (translateY) targets.ty = lerp(translateY[0], translateY[1], t)
            if (translateX) targets.tx = lerp(translateX[0], translateX[1], t)
            if (scale) targets.s = lerp(scale[0], scale[1], t)
            if (rotate) targets.r = lerp(rotate[0], rotate[1], t)
            if (opacity !== null) targets.o = lerp(opacity[0], opacity[1], t)

            const c = cv.current
            Object.keys(targets).forEach(key => {
                if (c[key] === undefined) c[key] = targets[key]
                c[key] = lerp(c[key], targets[key], lerpFactor)
                if (Math.abs(c[key] - targets[key]) < 0.001) c[key] = targets[key]
            })

            let transform = ''
            if (c.ty !== undefined) transform += `translateY(${c.ty}px) `
            if (c.tx !== undefined) transform += `translateX(${c.tx}px) `
            if (c.s !== undefined) transform += `scale(${c.s}) `
            if (c.r !== undefined) transform += `rotate(${c.r}deg) `
            transform += 'translateZ(0)'

            el.style.transform = transform
            if (c.o !== undefined) el.style.opacity = c.o

            if (clipPath) {
                el.style.clipPath = interpolateClipInset(clipPath[0], clipPath[1], t)
            }
        })

        return unsubscribe
    }, [ctx])

    return ref
}

export function useParallax(speed = 0.3, options = {}) {
    const { lerpFactor = 0.06, extraTransform = '' } = options
    const ref = useRef(null)
    const currentY = useRef(0)
    const ctx = useSmoothScroll()

    useEffect(() => {
        if (!ref.current || !ctx) return

        const unsubscribe = ctx.subscribe(() => {
            const el = ref.current
            if (!el) return

            const rect = el.getBoundingClientRect()
            const wh = window.innerHeight
            const centerOffset = rect.top + rect.height / 2 - wh / 2
            const targetY = centerOffset * speed * -1

            currentY.current = lerp(currentY.current, targetY, lerpFactor)
            if (Math.abs(currentY.current - targetY) < 0.05) currentY.current = targetY

            el.style.transform = `translateY(${currentY.current}px) translateZ(0) ${extraTransform}`.trim()
        })

        return unsubscribe
    }, [ctx, speed, lerpFactor, extraTransform])

    return ref
}

export function useStaggerReveal(options = {}) {
    const {
        selector = '.stagger-item',
        progressRange = [0.05, 0.45],
        staggerAmount = 0.04,
        translateY = [60, 0],
        translateX = null,
        opacity = [0, 1],
        scale = null,
        rotate = null,
        lerpFactor = 0.07,
        easing = 'easeOut',
    } = options

    const containerRef = useRef(null)
    const itemStates = useRef([])
    const ctx = useSmoothScroll()

    useEffect(() => {
        if (!containerRef.current || !ctx) return

        const items = containerRef.current.querySelectorAll(selector)
        if (!items.length) return

        itemStates.current = Array.from(items).map(() => ({
            ty: translateY ? translateY[0] : 0,
            tx: translateX ? translateX[0] : 0,
            o: opacity ? opacity[0] : 1,
            s: scale ? scale[0] : 1,
            r: rotate ? rotate[0] : 0,
        }))

        const easeFn = easings[easing] || easings.easeOut

        const unsubscribe = ctx.subscribe(() => {
            const container = containerRef.current
            if (!container) return

            const containerProgress = getElementProgress(container)

            items.forEach((item, i) => {
                const iStart = progressRange[0] + i * staggerAmount
                const iEnd = progressRange[1] + i * staggerAmount
                const p = clamp(mapRange(containerProgress, iStart, iEnd, 0, 1))
                const t = easeFn(p)

                const state = itemStates.current[i]
                if (!state) return

                const targetTY = translateY ? lerp(translateY[0], translateY[1], t) : 0
                const targetTX = translateX ? lerp(translateX[0], translateX[1], t) : 0
                const targetO = opacity ? lerp(opacity[0], opacity[1], t) : 1
                const targetS = scale ? lerp(scale[0], scale[1], t) : 1
                const targetR = rotate ? lerp(rotate[0], rotate[1], t) : 0

                state.ty = lerp(state.ty, targetTY, lerpFactor)
                state.tx = lerp(state.tx, targetTX, lerpFactor)
                state.o = lerp(state.o, targetO, lerpFactor)
                state.s = lerp(state.s, targetS, lerpFactor)
                state.r = lerp(state.r, targetR, lerpFactor)

                if (Math.abs(state.ty - targetTY) < 0.1) state.ty = targetTY
                if (Math.abs(state.tx - targetTX) < 0.1) state.tx = targetTX
                if (Math.abs(state.o - targetO) < 0.001) state.o = targetO
                if (Math.abs(state.s - targetS) < 0.001) state.s = targetS

                let transform = `translateY(${state.ty}px)`
                if (translateX) transform += ` translateX(${state.tx}px)`
                if (scale) transform += ` scale(${state.s})`
                if (rotate) transform += ` rotate(${state.r}deg)`
                transform += ' translateZ(0)'

                item.style.transform = transform
                item.style.opacity = state.o
            })
        })

        return unsubscribe
    }, [ctx, selector])

    return containerRef
}

export function useScrollMask(options = {}) {
    const {
        progressRange = [0.05, 0.5],
        from = 'inset(100% 0% 0% 0%)',
        to = 'inset(0% 0% 0% 0%)',
        opacity = [0, 1],
        scale = [1.1, 1],
        lerpFactor = 0.06,
    } = options

    const ref = useRef(null)
    const cv = useRef({ o: opacity[0], s: scale[0] })
    const ctx = useSmoothScroll()

    useEffect(() => {
        if (!ref.current || !ctx) return

        const unsubscribe = ctx.subscribe(() => {
            const el = ref.current
            if (!el) return

            const raw = getElementProgress(el)
            const t = clamp(mapRange(raw, progressRange[0], progressRange[1], 0, 1))
            const eased = easings.easeOut(t)

            const c = cv.current
            const targetO = lerp(opacity[0], opacity[1], eased)
            const targetS = lerp(scale[0], scale[1], eased)
            c.o = lerp(c.o, targetO, lerpFactor)
            c.s = lerp(c.s, targetS, lerpFactor)
            if (Math.abs(c.o - targetO) < 0.001) c.o = targetO
            if (Math.abs(c.s - targetS) < 0.001) c.s = targetS

            el.style.clipPath = interpolateClipInset(from, to, eased)
            el.style.opacity = c.o
            el.style.transform = `scale(${c.s}) translateZ(0)`
        })

        return unsubscribe
    }, [ctx])

    return ref
}

export function useHeroDeparture(options = {}) {
    const {
        fadeStart = 0.15,
        fadeEnd = 0.6,
        parallaxSpeed = -0.3,
        lerpFactor = 0.08,
    } = options

    const ref = useRef(null)
    const cv = useRef({ o: 1, y: 0 })
    const ctx = useSmoothScroll()

    useEffect(() => {
        if (!ref.current || !ctx) return

        const unsubscribe = ctx.subscribe(({ scrollY }) => {
            const el = ref.current
            if (!el) return

            const wh = window.innerHeight
            const scrollProgress = clamp(scrollY / wh)
            const fadeProgress = clamp(mapRange(scrollProgress, fadeStart, fadeEnd, 1, 0))
            const targetY = scrollY * parallaxSpeed
            const c = cv.current

            c.o = lerp(c.o, fadeProgress, lerpFactor)
            c.y = lerp(c.y, targetY, lerpFactor)
            if (Math.abs(c.o - fadeProgress) < 0.001) c.o = fadeProgress
            if (Math.abs(c.y - targetY) < 0.1) c.y = targetY

            el.style.opacity = c.o
            el.style.transform = `translateY(${c.y}px) translateZ(0)`
        })

        return unsubscribe
    }, [ctx, fadeStart, fadeEnd, parallaxSpeed, lerpFactor])

    return ref
}

export function useScrollAnimation(opts = {}) {
    const { animation = 'fadeUp' } = opts

    const config = {
        progressRange: [0.0, 0.45],
        opacity: [0, 1],
        lerpFactor: 0.06,
        easing: 'easeOut',
    }

    switch (animation) {
        case 'slideUp':
            config.translateY = [80, 0]; break
        case 'fadeUp':
            config.translateY = [50, 0]; break
        case 'fadeDown':
            config.translateY = [-50, 0]; break
        case 'fadeLeft':
            config.translateX = [-60, 0]; break
        case 'fadeRight':
            config.translateX = [60, 0]; break
        case 'scaleUp':
            config.scale = [0.8, 1]; break
        case 'elasticScale':
            config.scale = [0.7, 1]
            config.easing = 'easeOutBack'; break
        case 'bounceIn':
            config.scale = [0.3, 1]
            config.easing = 'easeOutBack'; break
        case 'rotateIn':
            config.rotate = [-12, 0]
            config.scale = [0.9, 1]; break
        default:
            config.translateY = [50, 0]
    }

    return useScrollTransform(config)
}

export function useStaggerAnimation(opts = {}) {
    const { selector = '.stagger-item', animation = 'fadeUp', stagger = 100 } = opts

    const config = {
        selector,
        progressRange: [0.05, 0.4],
        staggerAmount: Math.max(0.02, stagger / 2500),
        opacity: [0, 1],
        lerpFactor: 0.06,
        easing: 'easeOut',
    }

    switch (animation) {
        case 'slideIn':
            config.translateY = [50, 0]; break
        case 'scaleUp':
            config.translateY = [40, 0]
            config.scale = [0.85, 1]; break
        case 'rotateIn':
            config.translateY = [30, 0]
            config.rotate = [-8, 0]
            config.scale = [0.9, 1]; break
        case 'flipUp':
            config.translateY = [60, 0]; break
        default:
            config.translateY = [40, 0]
    }

    return useStaggerReveal(config)
}