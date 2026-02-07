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

    useEffect(() => { const i = setInterval(() => setRotation(p => (p + 1) % 360), 20); return () => clearInterval(i) }, [])

    return (
        <section id="about" className="folder-section relative min-h-screen overflow-hidden bg-[#ffffff]">
            <div className="section-padding flex flex-col justify-between min-h-screen">
                <h2 ref={titleRef} className="section-title text-black">[.ABOUT ME]</h2>
                <p ref={introRef} className="intro-text mb-6 md:mb-10 text-black/90">
                    I'M A <span className="text-[#E8C547]">GRAPHIC DESIGNER AND WEB DEVELOPER</span> WHO COMBINES CREATIVITY AND TECHNOLOGY TO CREATE CLEAN, MODERN, AND FUNCTIONAL DIGITAL EXPERIENCES. I FOCUS ON CRAFTING <span className="text-[#7FB3D5]">MY OWN DESIGNS</span> THAT ARE VISUALLY APPEALING AND EASY TO NAVIGATE. MY GOAL IS TO BUILD DIGITAL PRODUCTS THAT NOT ONLY LOOK GOOD BUT ALSO DELIVER A <span className="text-[#F5A6A6]">SMOOTH AND MEANINGFUL EXPERIENCE</span> FOR PEOPLE.
                </p>
                <div ref={imageContainerRef} className="flex items-center justify-center mb-6 md:mb-10">
                    <div className="relative flex items-center">
                        <div className="rotating-star text-pink-600" style={{ transform: 'rotate(' + rotation + 'deg)' }}>*</div>
                        <div className="relative avatar-size overflow-hidden group">
                            <img src="https://avatars.githubusercontent.com/u/223958636?v=4" alt="Lei Gabriel" className="w-full h-full object-cover" draggable="false" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection