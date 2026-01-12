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
        <section className={'relative min-h-[150px] md:min-h-[200px] overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
            <div className="section-padding flex flex-col justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                        <div ref={numberRef} className="flex items-center gap-2 md:gap-4 shrink-0">
                            <span className={'text-4xl md:text-5xl lg:text-7xl font-bold ' + accentColor}>✳</span>
                            <span className={'text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight ' + textColor}>01.</span>
                        </div>
                        <h2 ref={titleRef} className={'font-[Timetwist] text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight uppercase ' + textColor}>POSTERS</h2>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 mt-6 md:mt-8">
                    <span className={'section-footer-text ' + textMuted}>Posters Design</span>
                    <span className={'section-footer-text ' + textMuted}>Click to View Full Photo</span>
                </div>
            </div>
        </section>
    )
}

export default PosterTitleSection