import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useSmoothScroll } from '../context/SmoothScrollContext'

const contentsData = [
    { number: '01', title: 'Poster Design', status: 'view', target: 'poster-title', color: '#ffffff' },
    { number: '02', title: 'Web Projects', status: 'view', target: 'web-title', color: '#f3f706' },
    { number: '03', title: 'Photography', status: 'soon', target: null, color: '#a6F5C5' },
    { number: '04', title: 'UI/UX Design', status: 'soon', target: null, color: '#f05fc4' }
]

function ContentsSection() {
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
                <h2 className="section-title mb-8 md:mb-12 text-white">[.CONTENTS]</h2>
                <div className="contents-grid">
                    {contentsData.map((item) => (
                        <div
                            key={item.number}
                            className={'folder-card' + (item.target ? '' : ' disabled opacity-60')}
                            onClick={() => handleClick(item.target)}
                        >
                            <div className="folder-tab" style={{ backgroundColor: item.color }}>
                                {item.number}
                            </div>
                            <div className="folder-body" style={{ backgroundColor: item.color }}>
                                <div>
                                    <span className="folder-number text-black/50">{item.number}</span>
                                    <h3 className="folder-title text-black">{item.title}</h3>
                                </div>
                                <span
                                    className="folder-status"
                                    style={{
                                        color: item.status === 'soon' ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.8)',
                                        backgroundColor: item.status === 'soon' ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.12)',
                                    }}
                                >
                                    {item.status === 'soon' ? 'Coming Soon' : 'View Below ↓'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ContentsSection