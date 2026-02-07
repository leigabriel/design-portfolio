import { useRef, useEffect } from 'react'
import { useSmoothScroll } from '../context/SmoothScrollContext'

const projectsData = [
    {
        id: 1,
        src: '/img/web/01-dental.png',
        alt: 'Dental Booking System',
        liveUrl: 'https://dentalcare-health.ct.ws/',
        title: 'Dental Care System'
    },
    {
        id: 2,
        src: '/img/web/02-motivation.png',
        alt: 'Motivation App',
        liveUrl: 'https://motivationperday.netlify.app/',
        title: 'Motivation App'
    }
]

function useScrollMaskGrid(containerRef, selector = '.poster-item') {
    const itemStates = useRef([])
    const ctx = useSmoothScroll()

    useEffect(() => {
        if (!containerRef.current || !ctx) return

        const items = containerRef.current.querySelectorAll(selector)
        if (!items.length) return

        itemStates.current = Array.from(items).map(() => ({
            clip: 100,
            scale: 1.12,
            opacity: 0,
        }))

        const lerp = (a, b, t) => a + (b - a) * t
        const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

        const unsubscribe = ctx.subscribe(() => {
            const wh = window.innerHeight
            items.forEach((item, i) => {
                const rect = item.getBoundingClientRect()
                const progress = clamp((wh - rect.top) / (wh + rect.height))
                const t = clamp((progress - 0.02) / 0.43)
                const eased = 1 - Math.pow(1 - t, 3)

                const state = itemStates.current[i]
                if (!state) return

                const targetClip = lerp(100, 0, eased)
                const targetScale = lerp(1.12, 1, eased)
                const targetOpacity = lerp(0, 1, eased)

                state.clip = lerp(state.clip, targetClip, 0.08)
                state.scale = lerp(state.scale, targetScale, 0.08)
                state.opacity = lerp(state.opacity, targetOpacity, 0.08)

                if (Math.abs(state.clip - targetClip) < 0.1) state.clip = targetClip
                if (Math.abs(state.opacity - targetOpacity) < 0.001) state.opacity = targetOpacity

                item.style.clipPath = `inset(${state.clip}% 0% 0% 0%)`
                item.style.transform = `scale(${state.scale}) translateZ(0)`
                item.style.opacity = state.opacity
            })
        })

        return unsubscribe
    }, [containerRef, ctx, selector])
}

function WebProjectSection() {
    const gridRef = useRef(null)

    useScrollMaskGrid(gridRef)

    return (
        <section id="web-projects" className="folder-section relative overflow-hidden bg-[#f3f706]">
            <div ref={gridRef} className="grid grid-cols-2 gap-0">
                {projectsData.map((project) => (
                    <div
                        key={project.id}
                        className="poster-item aspect-[4/5] overflow-hidden cursor-pointer relative group"
                        style={{ willChange: 'clip-path, transform, opacity' }}
                        onClick={() => {
                            if (project.liveUrl) window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                        }}
                    >
                        <img src={project.src} alt={project.alt} className="w-full h-full object-fill" loading="lazy" draggable="false" />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default WebProjectSection
