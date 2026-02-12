import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useHeroDeparture } from '../hooks/useScrollAnimation'

const portfolioItems = [
    { id: 1, image: '/img/cards/01.webp', rotate: -6 },
    { id: 2, image: '/img/cards/02.webp', rotate: -2 },
    { id: 3, image: '/img/cards/03.webp', rotate: 3 },
    { id: 4, image: '/img/cards/04.webp', rotate: -1 },
    { id: 5, image: '/img/cards/05.webp', rotate: 5 },
    { id: 6, image: '/img/cards/06.webp', rotate: 2 }
]

function ImagePopup({ item, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [onClose])

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-[#212631]/75 backdrop-blur-sm z-[99999]" onClick={onClose}>
            <button onClick={onClose} className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 text-white text-xl hover:bg-white/20 z-[100000] cursor-pointer">✕</button>
            <div className="relative overflow-hidden animate-popup" style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
                <img src={item.image} alt={'Project ' + item.id} className="w-[90vw] max-w-[500px] h-auto object-contain" draggable="false" />
            </div>
        </div>,
        document.body
    )
}

function PortfolioCard({ item, index, onSelect }) {
    return (
        <div
            className="hero-card-entrance"
            style={{ animationDelay: (0.3 + index * 0.08) + 's' }}
        >
            <div
                className="portfolio-card relative portfolio-card-size aspect-[99/140] cursor-pointer"
                style={{ '--card-rotate': item.rotate + 'deg' }}
                onClick={() => onSelect(item)}
            >
                <img src={item.image} alt={'Project ' + item.id} className="hero-card-image w-full h-full object-fill" loading="lazy" draggable="false" />
            </div>
        </div>
    )
}

function HeroSection({ onMenuOpen }) {
    const [selectedItem, setSelectedItem] = useState(null)

    const titleDepartureRef = useHeroDeparture({ fadeStart: 0.1, fadeEnd: 0.55, parallaxSpeed: -0.15, lerpFactor: 0.06 })
    const cardsDepartureRef = useHeroDeparture({ fadeStart: 0.12, fadeEnd: 0.5, parallaxSpeed: -0.08, lerpFactor: 0.05 })
    const headerDepartureRef = useHeroDeparture({ fadeStart: 0.08, fadeEnd: 0.4, parallaxSpeed: -0.25, lerpFactor: 0.07 })

    return (
        <section id="hero" className="relative h-screen overflow-hidden bg-[#000000]">
            <style>{`
                .animate-popup { animation: popupFade 0.3s ease-out forwards; }
                @keyframes popupFade { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
                .hero-entrance { animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) both; }
                .hero-entrance-delay-1 { animation-delay: 0.15s; }
                .hero-entrance-delay-2 { animation-delay: 0.25s; }
                @keyframes heroFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .hero-title-entrance { animation: heroTitleIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) both; animation-delay: 0.05s; }
                @keyframes heroTitleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
                .hero-card-entrance { animation: heroCardIn 0.9s cubic-bezier(0.16, 1, 0.3, 1) both; }
                @keyframes heroCardIn { from { opacity: 0; transform: translateY(80px) scale(0.85); } to { opacity: 1; transform: translateY(0) scale(1); } }
            `}</style>
            <header ref={headerDepartureRef} className="fixed top-0 left-0 right-0 flex justify-between items-start z-50" style={{ padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 5rem)' }}>
                <h1 className="header-text text-white hero-entrance"></h1>
                <button className="menu-btn hero-entrance hero-entrance-delay-1" onClick={onMenuOpen}>Menu</button>
            </header>
            <div ref={titleDepartureRef} className="absolute inset-0 flex items-center justify-center z-10 translate-y-[-10%]">
                <h2 className="portfolio-title hero-title-entrance" style={{ willChange: 'transform' }}>
                    <span>L</span>
                    <span className='text-[#f3f706]'>EI</span>
                    <span>G</span>
                    <span className='text-[#004aeb]'>AB</span>
                    <span>RI</span>
                    <span className='text-[#f05fc4]'>EL</span>
                </h2>
            </div>
            <div ref={cardsDepartureRef} className="absolute inset-0 flex items-center justify-center z-20">
                <div className="flex items-end justify-center card-gap translate-y-[30%]" style={{ perspective: '1000px' }}>
                    {portfolioItems.map((item, index) => (
                        <PortfolioCard key={item.id} item={item} index={index} onSelect={setSelectedItem} />
                    ))}
                </div>
            </div>
            {selectedItem && <ImagePopup item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </section>
    )
}

export default HeroSection