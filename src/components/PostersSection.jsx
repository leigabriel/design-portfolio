import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useSmoothScroll } from '../context/SmoothScrollContext'

const postersData = [
    { id: 1, src: '/img/posters/01-multo.png', alt: 'p1' },
    { id: 2, src: '/img/posters/02-vintage.png', alt: 'p2' },
    { id: 3, src: '/img/posters/03-yunjin.png', alt: 'p3' },
    { id: 4, src: '/img/posters/04-giselle.jpg', alt: 'p4' },
    { id: 5, src: '/img/posters/05-pusa.png', alt: 'p5' },
    { id: 6, src: '/img/posters/06-jennie.png', alt: 'p6' },
    { id: 7, src: '/img/posters/07-perception.png', alt: 'p7' },
    { id: 8, src: '/img/posters/08-kanibalismo.png', alt: 'p8' },
    { id: 9, src: '/img/posters/11-yun.png', alt: 'p11' },
    { id: 10, src: '/img/posters/10-ning.png', alt: 'p10' },
    { id: 11, src: '/img/posters/09-cx.png', alt: 'p9' },
    { id: 12, src: '/img/posters/12-nj.png', alt: 'p12' },
    { id: 13, src: '/img/posters/13-ej.png', alt: 'p13' },
    { id: 14, src: '/img/posters/14-rs.png', alt: 'p14' },
    { id: 15, src: '/img/posters/15-cm.png', alt: 'p15' }
]

function ImagePopup({ poster, onClose }) {
    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-[#212631]/75 backdrop-blur-sm z-[99999]" onClick={onClose}>
            <button onClick={onClose} className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 text-white text-xl hover:bg-white/20 z-[100000] cursor-pointer">✕</button>
            <div className="relative overflow-hidden animate-popup max-w-[90vw] max-h-[90vh]" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.6)' }} onClick={(e) => e.stopPropagation()}>
                <img src={poster.src} alt={poster.alt} className="max-w-full max-h-[85vh] object-contain" draggable="false" />
            </div>
        </div>,
        document.body
    )
}

function useScrollMaskGrid(containerRef, selector = '.poster-item') {
    const itemStates = useRef([])
    const ctx = useSmoothScroll()

    useEffect(() => {
        if (!containerRef.current || !ctx) return

        const items = containerRef.current.querySelectorAll(selector)
        if (!items.length) return

        itemStates.current = Array.from(items).map(() => ({
            clip: 100,
            scale: 1.15,
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
                const targetScale = lerp(1.15, 1, eased)
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

function PostersSection() {
    const [selectedPoster, setSelectedPoster] = useState(null)
    const gridRef = useRef(null)

    useScrollMaskGrid(gridRef)

    return (
        <section id="posters" className="folder-section relative overflow-hidden bg-[#ffffff]">
            <style>{'.animate-popup { animation: popupFade 0.3s ease-out forwards; } @keyframes popupFade { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }'}</style>
            <div ref={gridRef} className="grid grid-cols-3 gap-0">
                {postersData.map((poster) => (
                    <div key={poster.id} className="poster-item aspect-[4/5] overflow-hidden cursor-pointer" style={{ willChange: 'clip-path, transform, opacity' }} onClick={() => setSelectedPoster(poster)}>
                        <img src={poster.src} alt={poster.alt} className="w-full h-full object-fill" loading="lazy" draggable="false" />
                    </div>
                ))}
            </div>
            {selectedPoster && <ImagePopup poster={selectedPoster} onClose={() => setSelectedPoster(null)} />}
        </section>
    )
}

export default PostersSection
