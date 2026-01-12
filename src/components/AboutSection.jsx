import { useEffect, useState, useRef } from 'react'
import anime from 'animejs'
import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function AboutSection() {
    const [rotation, setRotation] = useState(0)
    const { isDarkMode } = useTheme()
    const titleRef = useScrollAnimation({ animation: 'slideUp', delay: 0 })
    const introRef = useScrollAnimation({ animation: 'fadeLeft', delay: 150 })
    const imageContainerRef = useScrollAnimation({ animation: 'elasticScale', delay: 200 })
    const descRef = useScrollAnimation({ animation: 'fadeRight', delay: 300 })
    const statsRef = useRef(null)

    const textColor = isDarkMode ? 'text-white' : 'text-black'
    const textMuted = isDarkMode ? 'text-white/50' : 'text-black/50'
    const textBody = isDarkMode ? 'text-white/90' : 'text-black'

    useEffect(() => { const i = setInterval(() => setRotation(p => (p + 1) % 360), 20); return () => clearInterval(i) }, [])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => { if (entry.isIntersecting) anime({ targets: '.stat-item', opacity: [0, 1], translateY: [30, 0], rotate: [-5, 0], delay: anime.stagger(120), duration: 700, easing: 'easeOutExpo' }) })
        }, { threshold: 0.3 })
        if (statsRef.current) observer.observe(statsRef.current)
        return () => observer.disconnect()
    }, [])

    const designFocus = [
        { label: 'Design Philosophy', value: 'Clean, Minimal, Purposeful' },
        { label: 'Approach', value: 'User-First, Detail-Oriented' },
        { label: 'Workflow', value: 'Research > Design > Iterate > Deliver' }
    ]

    return (
        <section className={'relative min-h-screen overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
            <div className="section-padding flex flex-col justify-between min-h-screen">
                <h2 ref={titleRef} className={'section-title ' + textColor}>[.ABOUT ME]</h2>
                <p ref={introRef} className={'intro-text mb-6 md:mb-10 ' + textBody}>
                    I'M A <span className="text-[#E8C547]">GRAPHIC DESIGNER AND WEB DEVELOPER</span> WHO COMBINES CREATIVITY AND TECHNOLOGY TO CREATE CLEAN, MODERN, AND FUNCTIONAL DIGITAL EXPERIENCES.
                </p>
                <div ref={imageContainerRef} className="flex items-center justify-center mb-6 md:mb-10">
                    <div className="relative flex items-center">
                        <div className={'rotating-star ' + textColor} style={{ transform: 'rotate(' + rotation + 'deg)' }}>*</div>
                        <div className="relative avatar-size overflow-hidden group">
                            <img src="https://avatars.githubusercontent.com/u/223958636?v=4" alt="Lei Gabriel" className="w-full h-full object-cover" draggable="false" />
                        </div>
                    </div>
                </div>
                <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    {designFocus.map((item) => (
                        <div key={item.label} className="stat-item opacity-0">
                            <span className={'stat-label block ' + textMuted}>{item.label}</span>
                            <span className={'stat-value block ' + textColor}>{item.value}</span>
                        </div>
                    ))}
                </div>
                <p ref={descRef} className={'intro-text ' + textBody}>
                    I FOCUS ON CRAFTING <span className="text-[#7FB3D5]">MY OWN DESIGNS</span> THAT ARE VISUALLY APPEALING AND EASY TO NAVIGATE. MY GOAL IS TO BUILD DIGITAL PRODUCTS THAT NOT ONLY LOOK GOOD BUT ALSO DELIVER A <span className="text-[#F5A6A6]">SMOOTH AND MEANINGFUL EXPERIENCE</span> FOR PEOPLE.
                </p>
            </div>
        </section>
    )
}

export default AboutSection
