import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useSmoothScroll } from '../context/SmoothScrollContext'

const contentsData = [
    { number: '01', title: 'Poster Design', status: 'view', target: 'poster-title', color: '#E8C547' },
    { number: '02', title: 'Web Projects', status: 'view', target: 'web-title', color: '#7FB3D5' },
    { number: '03', title: 'Photography', status: 'soon', target: null, color: '#F5A6A6' },
    { number: '04', title: 'UI/UX Design', status: 'soon', target: null, color: '#A6F5C5' }
]

function ContentsSection() {
    const titleRef = useScrollAnimation({ animation: 'rotateIn', delay: 0 })
    const ctx = useSmoothScroll()

    const handleClick = (target) => {
        if (!target) return
        const el = document.getElementById(target)
        if (el && ctx) {
            const lenis = ctx.getLenis()
            if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.5 })
        }
    }

    return (
        <section id="contents" className="folder-section relative min-h-[50vh] overflow-hidden bg-[#004aeb]">
            <div className="section-padding">
                <h2 ref={titleRef} className="section-title mb-8 md:mb-12 text-white">[.CONTENTS]</h2>
                <div className="contents-grid">
                    {contentsData.map((item) => (
                        <div
                            key={item.number}
                            className={'contents-item' + (item.target ? '' : ' opacity-60 cursor-default')}
                            onClick={() => handleClick(item.target)}
                        >
                            <div className="contents-item-bg" style={{ backgroundColor: item.color }} />
                            <span className="contents-item-number">{item.number}</span>
                            <h3 className="contents-item-title">{item.title}</h3>
                            <span
                                className="contents-item-status mt-2 inline-block"
                                style={{
                                    color: item.status === 'soon' ? 'rgba(235,235,235,0.4)' : '#ebebeb',
                                    backgroundColor: item.status === 'soon' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                                }}
                            >
                                {item.status === 'soon' ? 'Coming Soon' : 'View Below ↓'}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ContentsSection