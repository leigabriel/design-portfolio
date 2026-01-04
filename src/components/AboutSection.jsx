import { useEffect, useState } from 'react'

function AboutSection() {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen bg-[#f2f2f2] overflow-hidden">
      <div className="absolute top-4 bottom-4 left-4 right-4 sm:top-6 sm:bottom-6 sm:left-6 sm:right-6 md:top-8 md:bottom-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex flex-col justify-between">
        <h2 className="font-[Timetwist] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-4 md:mb-6 tracking-tight">
          [.ABOUT ME ]
        </h2>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-justify leading-normal sm:leading-relaxed mb-4 sm:mb-6 md:mb-8">
          I'M A{' '}
          <span className="text-[#E8C547]">GRAPHIC DESIGNER, UI DESIGNER, AND FRONTEND DEVELOPER</span>{' '}
          WHO COMBINES CREATIVITY AND TECHNOLOGY TO CREATE CLEAN, MODERN, AND FUNCTIONAL DIGITAL EXPERIENCES.
        </p>

        <div className="flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
          <div className="relative flex items-center">
            <div
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mr-[-10px] sm:mr-[-20px] z-10"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              ✳
            </div>
            
            <div className="w-28 h-36 sm:w-40 sm:h-48 md:w-48 md:h-56 lg:w-56 lg:h-64 overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/223958636?v=4"
                alt="Lei Gabriel"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                      <span>Photo</span>
                    </div>
                  `
                }}
              />
            </div>
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-justify leading-normal sm:leading-relaxed">
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
