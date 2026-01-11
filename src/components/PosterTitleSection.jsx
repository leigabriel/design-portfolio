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
        <section className={`relative min-h-[50vh] sm:min-h-[60vh] overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]'}`}>
            <div className="section-padding flex flex-col justify-between">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-center md:justify-between">
                        <div ref={numberRef} className="flex items-center gap-2 sm:gap-3 md:gap-4 shrink-0">
                            <span className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold transition-colors duration-500 ${accentColor}`}>✳</span>
                            <span className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight transition-colors duration-500 ${textColor}`}>01.</span>
                        </div>
                        <h2 ref={titleRef} className={`font-[Timetwist] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight uppercase transition-colors duration-500 ${textColor}`}>POSTERS</h2>
                    </div>
                </div>
                <div className="flex justify-between items-end">
                    <span className={`section-footer-text transition-colors duration-500 ${textMuted}`}>Posters Design</span>
                    <span className={`section-footer-text transition-colors duration-500 ${textMuted}`}>2026</span>
                </div>
            </div>
        </section>
    )
}

export default PosterTitleSection