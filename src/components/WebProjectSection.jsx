import { useTheme } from '../context/ThemeContext'
import { useStaggerAnimation } from '../hooks/useScrollAnimation'

function WebProjectSection() {
    const { isDarkMode } = useTheme();
    const gridRef = useStaggerAnimation({ selector: '.poster-item', animation: 'scaleUp', stagger: 80, delay: 150 });

    // Project data restored here
    const postersData = [
        {
            id: 1,
            src: '/img/web/01-dental.png',
            alt: 'Dental Booking System',
            liveUrl: 'https://dentalcare-health.ct.ws/',
            title: 'Dental Care System'
        }
    ];

    return (
        <section id="posters" className={'relative overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
            <div ref={gridRef} className="grid grid-cols-3 gap-0">
                {postersData.map((project) => (
                    <div
                        key={project.id}
                        className="poster-item aspect-[3/4] overflow-hidden cursor-pointer relative group"
                        onClick={() => {
                            if (project.liveUrl) {
                                window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                            }
                        }}
                    >
                        <div className="absolute top-0 left-0 w-full z-10 uppercase text-white text-left py-2 text-sm font-semibold tracking-wide">
                            {project.title}
                        </div>
                        <img
                            src={project.src}
                            alt={project.alt}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            draggable="false"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default WebProjectSection