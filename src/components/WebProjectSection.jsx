import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/ThemeContext'
import { useStaggerAnimation } from '../hooks/useScrollAnimation'

const postersData = [
    { 
        id: 1, 
        src: '/img/web/01-dental.png', 
        alt: 'Dental Booking System',
        title: 'Dental Booking System',
        description: 'A comprehensive dental appointment booking system that allows patients to schedule appointments online, manage their dental records, and receive reminders.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
        githubUrl: 'https://github.com/username/dental-booking',
        liveUrl: 'https://dental-booking.example.com'
    },
    { 
        id: 2, 
        src: '/img/web/', 
        alt: 'Your Daily Boost',
        title: 'Your Daily Boost',
        description: 'A motivational web application that provides daily quotes, productivity tips, and wellness reminders to help users start their day right.',
        technologies: ['React', 'Firebase', 'CSS3'],
        githubUrl: 'https://github.com/username/daily-boost',
        liveUrl: 'https://daily-boost.example.com'
    },
    { 
        id: 3, 
        src: '/img/web/', 
        alt: 'Bulusan Zoo System',
        title: 'Bulusan Zoo System',
        description: 'An interactive zoo management system featuring animal information, ticket booking, event scheduling, and virtual tours.',
        technologies: ['React', 'Express', 'PostgreSQL', 'Tailwind CSS'],
        githubUrl: 'https://github.com/username/bulusan-zoo',
        liveUrl: 'https://bulusan-zoo.example.com'
    }
]

function ProjectPopup({ project, onClose, shadowColor }) {
    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-[99999]" onClick={onClose}>
            <button onClick={onClose} className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 text-white text-xl hover:bg-white/20 z-[100000]">✕</button>
            <div className="relative animate-popup max-w-[90vw] max-h-[90vh] flex flex-col md:flex-row items-center gap-8 md:gap-12 p-0 md:p-8 bg-transparent" onClick={(e) => e.stopPropagation()}>
                {/* Left: Image */}
                <div className="overflow-hidden flex-shrink-0" style={{ boxShadow: '0 25px 50px ' + shadowColor }}>
                    <img src={project.src} alt={project.alt} className="max-w-full max-h-[40vh] md:max-h-[70vh] md:max-w-[50vw] object-contain" draggable="false" />
                </div>
                {/* Right: Info */}
                <div className="flex flex-col justify-between h-full max-w-md w-full">
                    <div>
                        <h3 className="text-lg md:text-2xl font-medium tracking-tight text-white mb-3">{project.title}</h3>
                        <p className="text-base md:text-lg font-medium leading-relaxed text-gray-300 mb-5">{project.description}</p>
                        <div className="flex flex-wrap gap-3 mb-6">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="text-xs uppercase tracking-widest text-gray-400">{tech}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-8 pt-4 border-t border-white/10">
                        {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-medium uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                                GitHub →
                            </a>
                        )}
                        {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-base md:text-lg font-medium uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                                Live →
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    )
}

function WebProjectSection() {
    const { isDarkMode } = useTheme()
    const [selectedProject, setSelectedProject] = useState(null)
    const gridRef = useStaggerAnimation({ selector: '.poster-item', animation: 'scaleUp', stagger: 80, delay: 150 })

    const shadowColor = isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)'

    return (
        <section id="posters" className={'relative overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
            <div ref={gridRef} className="grid grid-cols-3 gap-0">
                {postersData.map((project) => (
                    <div 
                        key={project.id} 
                        className="poster-item aspect-[3/4] overflow-hidden cursor-pointer" 
                        onClick={() => setSelectedProject(project)}
                    >
                        <img 
                            src={project.src} 
                            alt={project.alt} 
                            className="w-full h-full object-fill" 
                            loading="lazy" 
                            draggable="false" 
                        />
                    </div>
                ))}
            </div>
            {selectedProject && <ProjectPopup project={selectedProject} onClose={() => setSelectedProject(null)} shadowColor={shadowColor} />}
        </section>
    )
}

export default WebProjectSection