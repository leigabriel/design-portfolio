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
        id: 1,
        src: '/img/web/01-dental.png',
        alt: 'Dental Booking System',
        liveUrl: 'https://dentalcare-health.ct.ws/',
        title: 'Dental Care System'
    },
    {
        id: 1,
        src: '/img/web/01-dental.png',
        alt: 'Dental Booking System',
        liveUrl: 'https://dentalcare-health.ct.ws/',
        title: 'Dental Care System'
    },
    {
        id: 1,
        src: '/img/web/01-dental.png',
        alt: 'Dental Booking System',
        liveUrl: 'https://dentalcare-health.ct.ws/',
        title: 'Dental Care System'
    },
    {
        id: 1,
        src: '/img/web/01-dental.png',
        alt: 'Dental Booking System',
        liveUrl: 'https://dentalcare-health.ct.ws/',
        title: 'Dental Care System'
    },
    {
        id: 1,
        src: '/img/web/01-dental.png',
        alt: 'Dental Booking System',
        liveUrl: 'https://dentalcare-health.ct.ws/',
        title: 'Dental Care System'
    },
    {
        id: 3,
        src: '/img/web/02-motivation.png',
        alt: 'Motivation App',
        liveUrl: 'https://motivationperday.netlify.app/',
        title: 'Motivation App'
    }
]

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

function WebProjectSection() {
    const sectionRef = useRef(null)
    const trackRef = useRef(null)

    useStickyHorizontalScroll(sectionRef, trackRef)

    return (
        <section
            ref={sectionRef}
            id="web-projects"
            className="web-sticky-section relative bg-[#f3f706]"
            style={{ height: '300vh' }}
        >
            <style>{`
                .web-sticky-section {
                    position: relative;
                }
                .web-sticky-inner {
                    position: sticky;
                    top: 0;
                    height: 100vh;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                }
                .web-track {
                    display: flex;
                    gap: 1rem;
                    padding: 0 2rem;
                    will-change: transform;
                }
                .web-item-sticky {
                    flex-shrink: 0;
                    height: 100vh;
                    aspect-ratio: 4/5;
                    overflow: hidden;
                    cursor: pointer;
                    border-radius: 0rem;
                    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                }
                .web-item-sticky:hover {
                    transform: scale(1.03) translateY(-8px);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
                }
                .web-item-sticky img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    pointer-events: none;
                }
                @media (max-width: 768px) {
                    .web-track {
                        gap: 0.75rem;
                        padding: 0 1rem;
                    }
                    .web-item-sticky {
                        height: 70vh;
                        border-radius: 0.5rem;
                    }
                }
            `}</style>
            <div className="web-sticky-inner">
                <div ref={trackRef} className="web-track">
                    {projectsData.map((project) => (
                        <div
                            key={project.id}
                            className="web-item-sticky"
                            onClick={() => {
                                if (project.liveUrl) window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
                            }}
                        >
                            <img src={project.src} alt={project.alt} loading="lazy" draggable="false" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WebProjectSection