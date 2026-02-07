import { createContext, useContext, useEffect, useRef, useCallback } from 'react'
import Lenis from 'lenis'

const SmoothScrollContext = createContext(null)

export function SmoothScrollProvider({ children }) {
    const lenisRef = useRef(null)
    const callbacksRef = useRef(new Set())

    const subscribe = useCallback((callback) => {
        callbacksRef.current.add(callback)
        return () => callbacksRef.current.delete(callback)
    }, [])

    const getLenis = useCallback(() => lenisRef.current, [])

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            wheelMultiplier: 0.7,
            touchMultiplier: 1.5,
            infinite: false,
        })

        lenisRef.current = lenis

        function raf(time) {
            lenis.raf(time)
            const data = {
                scrollY: lenis.scroll,
                limit: lenis.limit,
                velocity: lenis.velocity,
                direction: lenis.direction,
                progress: lenis.progress,
                time,
            }
            callbacksRef.current.forEach(cb => cb(data))
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    return (
        <SmoothScrollContext.Provider value={{ subscribe, getLenis }}>
            {children}
        </SmoothScrollContext.Provider>
    )
}

export function useSmoothScroll() {
    return useContext(SmoothScrollContext)
}
