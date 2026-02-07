import { useScrollAnimation, useStaggerAnimation } from '../hooks/useScrollAnimation'

const skillsData = [
    { category: 'Software', items: ['Affinity by Canva', 'Canva', 'Capcut', 'VS Code'] },
    { category: 'Core Skills', items: ['Poster Design', 'Web Developer', 'Photography', 'UI/UX Design'] },
    { category: 'Languages', items: ['English', 'Filipino'] }
]

function SkillsSection() {
    const titleRef = useScrollAnimation({ animation: 'rotateIn', delay: 0 })
    const skillsRef = useStaggerAnimation({ selector: '.skill-item', animation: 'slideIn', stagger: 120, delay: 200 })

    return (
        <section id="skills" className="folder-section relative min-h-[50vh] overflow-hidden bg-[#f3f706]">
            <div className="section-padding">
                <h2 ref={titleRef} className="section-title mb-8 md:mb-12 text-black">[.SKILLS]</h2>
                <div ref={skillsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
                    {skillsData.map((skill) => (
                        <div key={skill.category} className="skill-item">
                            <h3 className="content-title font-[Timetwist] mb-4 md:mb-6 text-black">{skill.category}</h3>
                            <ul className="space-y-2 md:space-y-3">
                                {skill.items.map((item) => (
                                    <li key={item} className="skill-item-text cursor-default text-black/80">{item}</li>
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