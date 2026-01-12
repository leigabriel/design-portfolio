import { useTheme } from '../context/ThemeContext'
import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const skillsData = [
    { category: 'Software', items: ['Affinity by Canva', 'Canva', 'Capcut'] },
    { category: 'Core Skills', items: ['Poster Design', 'Web Developer', 'Photography', 'UI/UX Design'] },
    { category: 'Languages', items: ['English', 'Filipino'] }
]

function SkillsSection() {
    const { isDarkMode } = useTheme()
    const titleRef = useScrollAnimation({ animation: 'rotateIn', delay: 0 })
    const skillsRef = useStaggerAnimation({ selector: '.skill-item', animation: 'slideIn', stagger: 120, delay: 200 })

    const textColor = isDarkMode ? 'text-white' : 'text-black'
    const textMuted = isDarkMode ? 'text-white/80' : 'text-black/80'

    return (
        <section id="skills" className={'relative min-h-[50vh] overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
            <div className="section-padding">
                <h2 ref={titleRef} className={'section-title mb-8 md:mb-12 ' + textColor}>[.SKILLS]</h2>
                <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                    {skillsData.map((skill) => (
                        <div key={skill.category} className="skill-item">
                            <h3 className={'content-title font-[Timetwist] mb-4 md:mb-6 ' + textColor}>{skill.category}</h3>
                            <ul className="space-y-2 md:space-y-3">
                                {skill.items.map((item) => (
                                    <li key={item} className={'skill-item-text cursor-default ' + textMuted}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default SkillsSection