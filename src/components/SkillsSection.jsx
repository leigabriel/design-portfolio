import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const icons = {
  software: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M30.48%201.53H32v28.95h-1.52ZM1.52%2030.48h28.96V32H1.52ZM28.95%203.05H3.05v25.91h25.9ZM15.24%206.1h1.52v6.09h-1.52Zm-6.1%200h4.57v6.09H9.14Zm-3.04%200h1.52v6.09H6.1Zm0%207.62h4.57v6.09H6.1Zm6.09%2012.19h-1.52v1.52H9.14v-1.52h1.53v-3.05H9.14v-1.52h1.53v1.52h1.52Zm0%20-12.19h1.52v6.09h-1.52Zm6.1%2013.71h-4.58v-1.52h4.58Zm-3.05%20-7.62v-6.09h4.57v6.09Zm7.62%203.05h-1.53v3.05h1.53v1.52h-1.53v-1.52h-1.52v-3.05h1.52v-1.52h1.53Zm0%20-3.05h-1.53v-6.09h1.53Zm0%20-7.62h-4.57V6.1h4.57Zm3.04%207.62h-1.52v-6.09h1.52Zm0%20-7.62h-1.52V6.1h1.52ZM19.81%207.62h1.52v3.05h-1.52ZM16.76%2015.24h1.53v3.05h-1.53ZM10.67%207.62h1.52v3.05h-1.52ZM7.62%2015.24h1.52v3.05H7.62ZM1.52%200h28.96v1.53H1.52ZM0%201.53h1.52v28.95H0Z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E",
  core: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22m30.47%2012.19-1.52%200%200%203.05-1.52%200%200%201.52%201.52%200%200%203.05%201.52%200%200-3.05%201.53%200%200-1.52-1.53%200%200-3.05zM27.43%2019.81h1.52v3.05h-1.52ZM27.43%209.14h1.52v3.05h-1.52ZM25.9%2022.86h1.53v3.04H25.9ZM25.9%206.09h1.53v3.05H25.9Zm-1.52%2018.29-1.53%200%200%203.05%203.05%200%200-1.53-1.52%200%200-1.52zM22.85%204.57h3.05v1.52h-3.05ZM19.81%2027.43h3.04v1.52h-3.04ZM19.81%2022.86h3.04v1.52h-3.04ZM19.81%2019.81h1.52v1.52h-1.52ZM19.81%203.05h3.04v1.52h-3.04ZM18.28%2013.71h1.53v3.05h-1.53Zm-1.52%2013.72-1.53%200%200%201.52-3.04%200%200%201.53%203.04%200%200%201.52%201.53%200%200-1.52%203.05%200%200-1.53-3.05%200%200-1.52zM12.19%2021.33h7.62v1.53h-7.62ZM13.71%2018.28h4.57v1.53h-4.57Zm1.52-13.71%201.53%200%200-1.52%203.05%200%200-1.53-3.05%200%200-1.52-1.53%200%200%201.52-3.04%200%200%201.53%203.04%200%200%201.52zM12.19%2013.71h1.52v3.05h-1.52ZM9.14%2027.43h3.05v1.52H9.14ZM9.14%2022.86h3.05v1.52H9.14ZM10.66%2019.81h1.53v1.52h-1.53ZM9.14%203.05h3.05v1.52H9.14Zm1.52%209.14%201.53%200%200-1.52%207.62%200%200%201.52%201.52%200%200%207.62%201.52%200%200-10.67-1.52%200%200-1.52-1.52%200%200-1.53-7.62%200%200%201.53-1.53%200%200%201.52-1.52%200%200%2010.67%201.52%200%200-7.62zm-3.04%2012.19%200%201.52-1.53%200%200%201.53%203.05%200%200-3.05-1.52%200zM6.09%204.57h3.05v1.52H6.09ZM4.57%2022.86h1.52v3.04H4.57ZM4.57%206.09h1.52v3.05H4.57ZM3.04%2019.81h1.53v3.05H3.04ZM3.04%209.14h1.53v3.05H3.04Zm1.53%207.62%200-1.52-1.53%200%200-3.05-1.52%200%200%203.05-1.52%200%200%201.52%201.52%200%200%203.05%201.52%200%200-3.05%201.53%200z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E",
  languages: "data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3Cpath%20d%3D%22M30.47%2018.29H32v10.66h-1.53ZM28.95%2028.95h1.52v1.53h-1.52ZM28.95%2016.76h1.52v1.53h-1.52ZM28.95%207.62h1.52v4.57h-1.52ZM27.42%206.09h1.53v1.53h-1.53ZM18.28%2030.48h10.67V32H18.28Zm7.62-6.1-4.57%200%200-4.57-1.53%200%200%209.14%201.53%200%200-3.05%204.57%200%200%203.05%201.52%200%200-9.14-1.52%200%200%204.57zM21.33%2018.29h4.57v1.52h-4.57ZM18.28%2015.24h10.67v1.52H18.28Zm3.05-13.72%200%201.53-1.53%200%200%201.52-1.52%200%200%201.52%201.52%200%200%201.53%201.53%200%200%201.52%201.52%200%200-3.05%204.57%200%200-1.52-4.57%200%200-3.05-1.52%200zM16.76%2028.95h1.52v1.53h-1.52ZM16.76%2016.76h1.52v1.53h-1.52ZM15.23%2018.29h1.53v10.66h-1.53ZM15.23%203.05h1.53v10.66h-1.53ZM13.71%2013.71h1.52v1.53h-1.52ZM13.71%201.52h1.52v1.53h-1.52Zm-3.05%206.1%201.53%200%200-1.53%201.52%200%200-1.52-4.57%200%200-1.52-1.53%200%200%201.52-4.57%200%200%201.52%207.62%200%200%201.53zm0%2022.86%200-1.53%201.53%200%200-1.52%201.52%200%200-1.53-1.52%200%200-1.52-1.53%200%200-1.52-1.52%200%200%203.04-4.57%200%200%201.53%204.57%200%200%203.05%201.52%200zM3.04%2015.24h10.67v1.52H3.04ZM10.66%2012.19h1.53v1.52h-1.53ZM9.14%2010.67h1.52v1.52H9.14ZM9.14%207.62h1.52v1.52H9.14ZM7.61%209.14h1.53v1.53H7.61ZM6.09%2010.67h1.52v1.52H6.09ZM6.09%207.62h1.52v1.52H6.09ZM4.57%2012.19h1.52v1.52H4.57ZM3.04%200h10.67v1.52H3.04ZM3.04%2024.38h1.53v1.52H3.04ZM1.52%2019.81h1.52v4.57H1.52ZM1.52%2013.71h1.52v1.53H1.52ZM1.52%201.52h1.52v1.53H1.52ZM0%203.05h1.52v10.66H0Z%22%20fill%3D%22%23000%22%2F%3E%3C%2Fsvg%3E"
}

const skillsData = [
  { category: 'Software', icon: icons.software, items: ['Affinity by Canva', 'Canva', 'Capcut', 'VS Code', 'Ibis Paint'] },
  { category: 'Core Skills', icon: icons.core, items: ['Graphic Design', 'Poster Design', 'Typography', 'Web Design', 'Photography'] },
  { category: 'Languages', icon: icons.languages, items: ['English', 'Filipino'] }
]

function SkillsSection() {
  const { isDarkMode } = useTheme()
  const titleRef = useScrollAnimation({ animation: 'rotateIn', delay: 0 })
  const skillsRef = useStaggerAnimation({ selector: '.skill-item', animation: 'slideIn', stagger: 120, delay: 200 })
  const imageRef = useScrollAnimation({ animation: 'scaleUp', delay: 300 })
  const quoteRef = useScrollAnimation({ animation: 'fadeUp', delay: 400 })

  const textColor = isDarkMode ? 'text-white' : 'text-black'
  const textMuted = isDarkMode ? 'text-white/80' : 'text-black/80'
  const bgMuted = isDarkMode ? 'bg-white/10' : 'bg-black/10'
  const shadowColor = isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.25)'

  return (
    <section id="skills" className={`relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'}`}>
      <div className="section-padding !relative py-8 md:py-12">
        {/* Mobile Layout */}
        <div className="block md:hidden">
          <h2 ref={titleRef} className={`section-title transition-colors duration-500 mb-8 ${textColor}`}>[.SKILLS]</h2>
          
          <div ref={skillsRef} className="space-y-8 mt-6">
            {skillsData.map((skill) => (
              <div key={skill.category} className="skill-item">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`skill-icon-wrapper transition-colors duration-300 ${bgMuted}`}>
                    <img src={skill.icon} alt="" className={`w-full h-full ${isDarkMode ? 'invert' : ''}`} draggable="false" />
                  </div>
                  <h3 className={`content-title font-[Timetwist] transition-colors duration-500 ${textColor}`}>{skill.category}</h3>
                </div>
                <ul className="space-y-2 ml-12">
                  {skill.items.map((item) => (<li key={item} className={`skill-item-text transition-all duration-300 hover:translate-x-2 cursor-default ${textMuted}`}>{item}</li>))}
                </ul>
              </div>
            ))}
          </div>

          <div ref={quoteRef} className={`mt-10 intro-text transition-colors duration-500 ${textMuted}`}>
            "Design is not just what it looks like and feels like. Design is how it works."
          </div>

          <div className="flex justify-between items-end mt-8">
            <span className={`section-footer-text transition-colors duration-500 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Skills & Expertise 2026</span>
          </div>
        </div>

        {/* Desktop Layout - 5x5 Grid */}
        <div className="hidden md:grid grid-cols-5 grid-rows-5 gap-4">
          {/* Div 1 - Title */}
          <div className="col-span-3">
            <h2 ref={titleRef} className={`section-title transition-colors duration-500 ${textColor}`}>[.SKILLS]</h2>
          </div>

          {/* Div 2 - Software */}
          <div ref={skillsRef} className="row-span-2 col-start-1 row-start-2 skill-item">
            <div className="flex items-center gap-3 mb-3">
              <div className={`skill-icon-wrapper transition-colors duration-300 ${bgMuted}`}>
                <img src={icons.software} alt="" className={`w-full h-full ${isDarkMode ? 'invert' : ''}`} draggable="false" />
              </div>
              <h3 className={`content-title font-[Timetwist] transition-colors duration-500 ${textColor}`}>Software</h3>
            </div>
            <ul className="space-y-1 ml-12">
              {skillsData[0].items.map((item) => (<li key={item} className={`skill-item-text transition-all duration-300 hover:translate-x-2 cursor-default ${textMuted}`}>{item}</li>))}
            </ul>
          </div>

          {/* Div 3 - Core Skills */}
          <div className="row-span-2 col-start-2 row-start-2 skill-item">
            <div className="flex items-center gap-3 mb-3">
              <div className={`skill-icon-wrapper transition-colors duration-300 ${bgMuted}`}>
                <img src={icons.core} alt="" className={`w-full h-full ${isDarkMode ? 'invert' : ''}`} draggable="false" />
              </div>
              <h3 className={`content-title font-[Timetwist] transition-colors duration-500 ${textColor}`}>Core Skills</h3>
            </div>
            <ul className="space-y-1 ml-12">
              {skillsData[1].items.map((item) => (<li key={item} className={`skill-item-text transition-all duration-300 hover:translate-x-2 cursor-default ${textMuted}`}>{item}</li>))}
            </ul>
          </div>

          {/* Div 4 - Languages */}
          <div className="row-span-2 col-start-3 row-start-2 skill-item">
            <div className="flex items-center gap-3 mb-3">
              <div className={`skill-icon-wrapper transition-colors duration-300 ${bgMuted}`}>
                <img src={icons.languages} alt="" className={`w-full h-full ${isDarkMode ? 'invert' : ''}`} draggable="false" />
              </div>
              <h3 className={`content-title font-[Timetwist] transition-colors duration-500 ${textColor}`}>Languages</h3>
            </div>
            <ul className="space-y-1 ml-12">
              {skillsData[2].items.map((item) => (<li key={item} className={`skill-item-text transition-all duration-300 hover:translate-x-2 cursor-default ${textMuted}`}>{item}</li>))}
            </ul>
          </div>

          {/* Div 5 - Poster Image */}
          <div ref={imageRef} className="col-span-2 row-span-5 col-start-4 row-start-1 flex justify-center items-center">
            <div className="w-full max-w-[400px] aspect-[5/7] overflow-hidden" style={{ boxShadow: `0 25px 50px ${shadowColor}` }}>
              <img src="/img/01.png" alt="Poster Design" className="w-full h-full object-fill" draggable="false" />
            </div>
          </div>

          {/* Div 6 - Quote */}
          <div ref={quoteRef} className="col-span-3 row-span-2 row-start-4 flex flex-col justify-start pt-4">
            <p className={`intro-text transition-colors duration-500 ${textMuted}`}>
              "Design is not just what it looks like and feels like. Design is how it works."
            </p>
            <div className="flex justify-between items-end mt-6">
              <span className={`section-footer-text transition-colors duration-500 ${isDarkMode ? 'text-white/60' : 'text-black/60'}`}>Skills & Expertise 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
