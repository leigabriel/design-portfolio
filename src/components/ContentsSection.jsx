import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

function ContentsSection() {
  const { isDarkMode } = useTheme()
  const titleRef = useScrollAnimation({ animation: 'fadeUp', delay: 0 })
  const contentRef = useStaggerAnimation({ 
    selector: '.content-item', 
    animation: 'fadeUp', 
    stagger: 100,
    delay: 200 
  })

  const contentsData = [
    { number: '01', title: 'Poster Design' },
    { number: '02', title: 'Graphic Design' },
    { number: '03', title: 'Web Projects' },
    { number: '04', title: 'Photography' },
    { number: '05', title: 'Typography' },
    { number: '06', title: 'UI/UX Design' }
  ]

  const leftColumn = contentsData.slice(0, 3)
  const rightColumn = contentsData.slice(3, 6)

  return (
    <section 
      id="contents"
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${
        isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'
      }`}
    >
      <div className="absolute top-4 bottom-4 left-4 right-4 sm:top-6 sm:bottom-6 sm:left-6 sm:right-6 md:top-8 md:bottom-8 md:left-14 md:right-14 lg:left-20 lg:right-20 flex flex-col justify-between">
        
        <div className="flex-1 flex flex-col justify-center">
          <h2 
            ref={titleRef}
            className={`font-[Timetwist] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-12 sm:mb-16 md:mb-20 transition-colors duration-500 ${
              isDarkMode ? 'text-white' : 'text-black'
            }`}
          >
            [.CONTENTS]
          </h2>

          <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-32 gap-y-10 sm:gap-y-12 md:gap-y-14">
            <div className="space-y-10 sm:space-y-12 md:space-y-14">
              {leftColumn.map((item) => (
                <div 
                  key={item.number} 
                  className="content-item group cursor-default transition-transform duration-300 hover:translate-x-2"
                >
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span 
                      className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-500 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.number}.
                    </span>
                    <h3 
                      className={`text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide transition-colors duration-500 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <span 
                    className={`block ml-9 sm:ml-11 mt-1 text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors duration-500 ${
                      isDarkMode ? 'text-white/40' : 'text-black/40'
                    }`}
                  >
                    Available Soon
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-10 sm:space-y-12 md:space-y-14">
              {rightColumn.map((item) => (
                <div 
                  key={item.number} 
                  className="content-item group cursor-default transition-transform duration-300 hover:translate-x-2"
                >
                  <div className="flex items-baseline gap-3 sm:gap-4">
                    <span 
                      className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-500 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.number}.
                    </span>
                    <h3 
                      className={`text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide transition-colors duration-500 ${
                        isDarkMode ? 'text-white' : 'text-black'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <span 
                    className={`block ml-9 sm:ml-11 mt-1 text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors duration-500 ${
                      isDarkMode ? 'text-white/40' : 'text-black/40'
                    }`}
                  >
                    Available Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-end">
          <span 
            className={`text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-white/60' : 'text-black/80'
            }`}
          >
            Contents / Portfolio 2025
          </span>
          <span 
            className={`text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase transition-colors duration-500 ${
              isDarkMode ? 'text-white/60' : 'text-black/80'
            }`}
          >
            Lei Gabriel
          </span>
        </div>
      </div>
    </section>
  )
}

export default ContentsSection
