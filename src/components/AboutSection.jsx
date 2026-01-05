import { useEffect, useState, useRef } from 'react'
import anime from 'animejs'
import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function AboutSection() {
  const [rotation, setRotation] = useState(0)
  const { isDarkMode } = useTheme()
  const sectionRef = useRef(null)
  const titleRef = useScrollAnimation({ animation: 'fadeUp', delay: 0 })
  const introRef = useScrollAnimation({ animation: 'fadeUp', delay: 150 })
  const imageContainerRef = useScrollAnimation({ animation: 'scaleUp', delay: 200 })
  const descRef = useScrollAnimation({ animation: 'fadeUp', delay: 300 })
  const statsRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.stat-item',
              opacity: [0, 1],
              translateY: [20, 0],
              delay: anime.stagger(100),
              duration: 600,
              easing: 'easeOutCubic'
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const designFocus = [
    { label: 'Design Philosophy', value: 'Clean, Minimal, Purposeful' },
    { label: 'Approach', value: 'User-First, Detail-Oriented' },
    { label: 'Workflow', value: 'Research → Design → Iterate → Deliver' }
  ]

  return (
    <section 
      ref={sectionRef}
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'
      }`}
    >
      <div className="absolute top-4 bottom-4 left-4 right-4 sm:top-6 sm:bottom-6 sm:left-6 sm:right-6 md:top-8 md:bottom-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex flex-col justify-between">
        <h2 
          ref={titleRef}
          className={`font-[Timetwist] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 md:mb-6 tracking-tight transition-colors duration-500 ${
            isDarkMode ? 'text-white' : 'text-black'
          }`}
        >
          [.ABOUT ME]
        </h2>

        <p 
          ref={introRef}
          className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-justify leading-normal sm:leading-relaxed mb-4 sm:mb-6 md:mb-8 transition-colors duration-500 ${
            isDarkMode ? 'text-white/90' : 'text-black'
          }`}
        >
          I'M A{' '}
          <span className="text-[#E8C547]">GRAPHIC DESIGNER, UI DESIGNER, AND FRONTEND DEVELOPER</span>{' '}
          WHO COMBINES CREATIVITY AND TECHNOLOGY TO CREATE CLEAN, MODERN, AND FUNCTIONAL DIGITAL EXPERIENCES.
        </p>

        <div ref={imageContainerRef} className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
          <div className="relative flex items-center">
            <div
              className={`text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mr-[-10px] sm:mr-[-20px] z-10 transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-black'
              }`}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              ✳
            </div>
            
            <div className="relative w-80 h-80 sm:w-80 sm:h-80 md:w-80 md:h-80 lg:w-125 lg:h-125 overflow-hidden group">
              <img
                src="https://avatars.githubusercontent.com/u/223958636?v=4"
                alt="Lei Gabriel"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                draggable="false"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                      <span>Photo</span>
                    </div>
                  `
                }}
              />
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${
                  isDarkMode ? 'bg-white' : 'bg-black'
                }`}
              />
            </div>
          </div>
        </div>

        <div 
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6"
        >
          {designFocus.map((item, index) => (
            <div 
              key={item.label}
              className="stat-item opacity-0"
            >
              <span 
                className={`block text-[10px] sm:text-xs font-medium uppercase tracking-[0.2em] mb-1 transition-colors duration-500 ${
                  isDarkMode ? 'text-white/50' : 'text-black/50'
                }`}
              >
                {item.label}
              </span>
              <span 
                className={`block text-sm sm:text-base md:text-lg font-semibold transition-colors duration-500 ${
                  isDarkMode ? 'text-white' : 'text-black'
                }`}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <p 
          ref={descRef}
          className={`text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-justify leading-normal sm:leading-relaxed transition-colors duration-500 ${
            isDarkMode ? 'text-white/90' : 'text-black'
          }`}
        >
          I FOCUS ON CRAFTING{' '}
          <span className="text-[#7FB3D5]">USER-CENTERED DESIGNS</span>{' '}
          THAT ARE BOTH VISUALLY APPEALING AND EASY TO NAVIGATE. MY GOAL IS TO BUILD DIGITAL PRODUCTS THAT NOT ONLY LOOK GOOD BUT ALSO DELIVER A{' '}
          <span className="text-[#F5A6A6]">SMOOTH AND MEANINGFUL EXPERIENCE</span>{' '}
          FOR USERS. I CONTINUE TO LEARN AND IMPROVE MY SKILLS IN WEB DEVELOPMENT AND DESIGN TOOLS, AIMING TO BRIDGE THE GAP BETWEEN VISUAL CREATIVITY AND TECHNICAL IMPLEMENTATION.
        </p>
      </div>
    </section>
  )
}

export default AboutSection
