import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

function PosterTitleSection() {
  const { isDarkMode } = useTheme()
  const numberRef = useScrollAnimation({ animation: 'fadeLeft', delay: 0 })
  const titleRef = useScrollAnimation({ animation: 'fadeRight', delay: 150 })

  const textColor = isDarkMode ? 'text-white' : 'text-black'
  const textMuted = isDarkMode ? 'text-white/60' : 'text-black/60'
  const accentColor = 'text-[#7FB3D5]'

  return (
    <section className={'relative min-h-[200px] overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
      <div className="flex flex-col justify-between h-full" style={{ padding: '4rem 5rem' }}>
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex flex-row items-center justify-between">
            <div ref={numberRef} className="flex items-center gap-4 shrink-0">
              <span className={'text-7xl font-bold ' + accentColor}>✳</span>
              <span className={'text-8xl font-bold tracking-tight ' + textColor}>01.</span>
            </div>
            <h2 ref={titleRef} className={'font-[Timetwist] text-8xl font-bold tracking-tight uppercase ' + textColor}>POSTERS</h2>
          </div>
        </div>
        <div className="flex justify-between items-end mt-8">
          <span className={'section-footer-text ' + textMuted}>Posters Design</span>
          <span className={'section-footer-text ' + textMuted}>2026</span>
        </div>
      </div>
    </section>
  )
}

export default PosterTitleSection
