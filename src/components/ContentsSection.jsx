import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const contentsData = [
  { number: '01', title: 'Poster Design' },
  { number: '02', title: 'Graphic Design' },
  { number: '03', title: 'Web Projects' },
  { number: '04', title: 'Photography' },
  { number: '05', title: 'Typography' },
  { number: '06', title: 'UI/UX Design' }
]

function ContentsSection() {
  const { isDarkMode, isNeonMode } = useTheme()
  const titleRef = useScrollAnimation({ animation: 'bounceIn', delay: 0 })
  const contentRef = useStaggerAnimation({ selector: '.content-item', animation: 'flipUp', stagger: 80, delay: 200 })

  const textColor = isNeonMode ? 'text-[#ff0000]' : isDarkMode ? 'text-white' : 'text-black'
  const textMuted = isNeonMode ? 'text-[#ff0000]/40' : isDarkMode ? 'text-white/40' : 'text-black/40'
  const footerText = isNeonMode ? 'text-[#ff0000]/60' : isDarkMode ? 'text-white/60' : 'text-black/80'

  const [leftColumn, rightColumn] = [contentsData.slice(0, 3), contentsData.slice(3, 6)]

  return (
    <section id="contents" className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'}`}>
      <div className="section-padding flex flex-col justify-between">
        <div className="flex-1 flex flex-col justify-center">
          <h2 ref={titleRef} className={`section-title transition-colors duration-500 ${textColor}`}>[.CONTENTS]</h2>

          <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 grid-gap">
            {[leftColumn, rightColumn].map((column, colIndex) => (
              <div key={colIndex} className="content-spacing">
                {column.map((item) => (
                  <div key={item.number} className="content-item group cursor-default transition-transform duration-300 hover:translate-x-2">
                    <div className="flex items-baseline gap-3 sm:gap-4">
                      <span className={`content-number transition-colors duration-500 ${textColor}`}>{item.number}.</span>
                      <h3 className={`content-title transition-colors duration-500 ${textColor}`}>{item.title}</h3>
                    </div>
                    <span className={`content-subtitle block ml-9 sm:ml-11 mt-2 transition-colors duration-500 ${textMuted}`}>Available Soon</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-end">
          <span className={`section-footer-text transition-colors duration-500 ${footerText}`}>Contents / Portfolio 2026</span>
          <span className={`section-footer-text transition-colors duration-500 ${footerText}`}>Lei Gabriel</span>
        </div>
      </div>
    </section>
  )
}

export default ContentsSection
