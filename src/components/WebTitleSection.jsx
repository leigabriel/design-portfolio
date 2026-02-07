import { useScrollTransform } from '../hooks/useScrollAnimation'

function WebTitleSection() {
    const numberRef = useScrollTransform({
        progressRange: [0.0, 0.55],
        translateX: [-80, 0],
        opacity: [0, 1],
        lerpFactor: 0.05,
        easing: 'easeOut',
    })
    const titleRef = useScrollTransform({
        progressRange: [0.0, 0.55],
        translateX: [80, 0],
        opacity: [0, 1],
        lerpFactor: 0.04,
        easing: 'easeOut',
    })
    const footerRef = useScrollTransform({
        progressRange: [0.05, 0.5],
        translateY: [30, 0],
        opacity: [0, 1],
        lerpFactor: 0.06,
        easing: 'easeOut',
    })

    return (
        <section id="web-title" className="folder-section relative min-h-[150px] md:min-h-[200px] overflow-hidden bg-[#f3f706]">
            <div className="section-padding flex flex-col justify-between h-full">
                <div className="flex-1 flex flex-col justify-center">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                        <div ref={numberRef} className="flex items-center gap-2 md:gap-4 shrink-0">
                            <span className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#7FB3D5]">✳</span>
                            <span className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-black">02.</span>
                        </div>
                        <h2 ref={titleRef} className="font-[Timetwist] text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight uppercase text-black">Web</h2>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 mt-6 md:mt-8" ref={footerRef}>
                    <span className="section-footer-text text-black/60">Web Projects</span>
                    <span className="section-footer-text text-black/60">Click to View Full Details</span>
                </div>
            </div>
        </section>
    )
}

export default WebTitleSection