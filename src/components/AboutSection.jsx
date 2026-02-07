import { useEffect, useState } from 'react'
import { useScrollAnimation, useStaggerReveal } from '../hooks/useScrollAnimation'

const designFocus = [
    { label: 'Design Philosophy', value: 'Clean, Minimal, Purposeful' },
    { label: 'Approach', value: 'User-First, Detail-Oriented' },
    { label: 'Workflow', value: 'Research > Design > Iterate > Deliver' }
]

function AboutSection() {
    const [rotation, setRotation] = useState(0)
    const titleRef = useScrollAnimation({ animation: 'slideUp', delay: 0 })
    const introRef = useScrollAnimation({ animation: 'fadeLeft', delay: 150 })
    const imageContainerRef = useScrollAnimation({ animation: 'elasticScale', delay: 200 })
    const descRef = useScrollAnimation({ animation: 'fadeRight', delay: 300 })
    const statsRef = useStaggerReveal({
        selector: '.stat-item',
        progressRange: [0.1, 0.5],
        staggerAmount: 0.05,
        translateY: [30, 0],
        opacity: [0, 1],
        rotate: [-5, 0],
        lerpFactor: 0.06,
    })

    useEffect(() => { const i = setInterval(() => setRotation(p => (p + 1) % 360), 20); return () => clearInterval(i) }, [])

    return (
        <section id="about" className="folder-section relative min-h-screen overflow-hidden bg-[#ffffff]">
            <div className="section-padding flex flex-col justify-between min-h-screen">
                <h2 ref={titleRef} className="section-title text-black">[.ABOUT ME]</h2>
                <p ref={introRef} className="intro-text mb-6 md:mb-10 text-black/90">
                    I'M A <span className="text-[#E8C547]">GRAPHIC DESIGNER AND WEB DEVELOPER</span> WHO COMBINES CREATIVITY AND TECHNOLOGY TO CREATE CLEAN, MODERN, AND FUNCTIONAL DIGITAL EXPERIENCES.
                </p>
                <div ref={imageContainerRef} className="flex items-center justify-center mb-6 md:mb-10">
                    <div className="relative flex items-center">
                        <div className="rotating-star text-black" style={{ transform: 'rotate(' + rotation + 'deg)' }}>*</div>
                        <div className="relative avatar-size overflow-hidden group">
                            <img src="https://avatars.githubusercontent.com/u/223958636?v=4" alt="Lei Gabriel" className="w-full h-full object-cover" draggable="false" />
                        </div>
                    </div>
                </div>
                <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                    {designFocus.map((item) => (
                        <div key={item.label} className="stat-item opacity-0">
                            <span className="stat-label block text-black/50">{item.label}</span>
                            <span className="stat-value block text-black">{item.value}</span>
                        </div>
                    ))}
                </div>
                <p ref={descRef} className="intro-text text-black/90">
                    I FOCUS ON CRAFTING <span className="text-[#7FB3D5]">MY OWN DESIGNS</span> THAT ARE VISUALLY APPEALING AND EASY TO NAVIGATE. MY GOAL IS TO BUILD DIGITAL PRODUCTS THAT NOT ONLY LOOK GOOD BUT ALSO DELIVER A <span className="text-[#F5A6A6]">SMOOTH AND MEANINGFUL EXPERIENCE</span> FOR PEOPLE.
                </p>
            </div>
        </section>
    )
}

export default AboutSection
