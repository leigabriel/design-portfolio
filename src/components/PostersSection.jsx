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

function useStickyHorizontalScroll(sectionRef, trackRef) {
    const ctx = useSmoothScroll()
    const currentX = useRef(0)

    useEffect(() => {
        if (!sectionRef.current || !trackRef.current || !ctx) return

        const lerp = (a, b, t) => a + (b - a) * t
        const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v))

        const unsubscribe = ctx.subscribe(() => {
            const section = sectionRef.current
            const track = trackRef.current
            if (!section || !track) return

            const rect = section.getBoundingClientRect()
            const sectionHeight = section.offsetHeight
            const viewportHeight = window.innerHeight

            // Calculate scroll progress within the sticky section
            // Progress: 0 = section just entered, 1 = section about to leave
            const scrollDistance = sectionHeight - viewportHeight
            const scrolled = -rect.top
            const progress = clamp(scrolled / scrollDistance)

            // Calculate horizontal translation
            const trackWidth = track.scrollWidth
            const containerWidth = section.offsetWidth
            const maxTranslate = trackWidth - containerWidth
            const targetX = -progress * maxTranslate

            // Smooth interpolation
            currentX.current = lerp(currentX.current, targetX, 0.08)
            if (Math.abs(currentX.current - targetX) < 0.5) currentX.current = targetX

            track.style.transform = `translateX(${currentX.current}px) translateZ(0)`
        })

        return unsubscribe
    }, [sectionRef, trackRef, ctx])
}

function PostersSection() {
    const [selectedPoster, setSelectedPoster] = useState(null)
    const sectionRef = useRef(null)
    const trackRef = useRef(null)

    useStickyHorizontalScroll(sectionRef, trackRef)

    return (
        <section
            ref={sectionRef}
            id="posters"
            className="poster-sticky-section relative bg-[#ffffff]"
            style={{ height: '300vh' }} // Extra height for scroll distance
        >
            <style>{`
                .animate-popup { animation: popupFade 0.3s ease-out forwards; }
                @keyframes popupFade { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
                .poster-sticky-section {
                    position: relative;
                }
                .poster-sticky-inner {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                }
                .poster-track {
                    display: flex;
                    gap: 1rem;
                    padding: 0 2rem;
                    will-change: transform;
                }
                .poster-item-sticky {
                    flex-shrink: 0;
                    height: 80vh;
                    aspect-ratio: 4/5;
                    overflow: hidden;
                    cursor: pointer;
                    border-radius: 0.5rem;
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
                }
                .poster-item-sticky:hover {
                    transform: scale(1.05) translateY(-10px);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                }
                .poster-item-sticky img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    pointer-events: none;
                }
                
                /* Mobile responsive styles */
                @media (max-width: 640px) {
                    .poster-track {
                        gap: 0.5rem;
                        padding: 0 1rem;
                    }
                    .poster-item-sticky {
                        height: 65vh;
                        border-radius: 0.375rem;
                    }
                    .poster-item-sticky:hover {
                        transform: scale(1.02) translateY(-5px);
                    }
                }
                
                /* Tablet responsive styles */
                @media (min-width: 641px) and (max-width: 1024px) {
                    .poster-track {
                        gap: 0.75rem;
                        padding: 0 1.5rem;
                    }
                    .poster-item-sticky {
                        height: 70vh;
                    }
                }
            `}</style>
            <div className="poster-sticky-inner">
                <div ref={trackRef} className="poster-track">
                    {postersData.map((poster) => (
                        <div
                            key={poster.id}
                            className="poster-item-sticky"
                            onClick={() => setSelectedPoster(poster)}
                        >
                            <img src={poster.src} alt={poster.alt} loading="lazy" draggable="false" />
                        </div>
                    ))}
                </div>
            </div>
            {selectedPoster && <ImagePopup poster={selectedPoster} onClose={() => setSelectedPoster(null)} />}
        </section>
    )
}

export default PostersSection
