import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import anime from 'animejs'
import { useTheme } from '../context/ThemeContext'

const portfolioItems = [
    { id: 1, image: '/img/cards/01.png', rotate: -6 },
    { id: 2, image: '/img/cards/02.png', rotate: -2 },
    { id: 3, image: '/img/cards/03.png', rotate: 3 },
    { id: 4, image: '/img/cards/04.png', rotate: -1 },
    { id: 5, image: '/img/cards/05.png', rotate: 5 },
    { id: 6, image: '/img/cards/06.png', rotate: 2 }
]

function ImagePopup({ item, onClose, shadowColor }) {
    useEffect(() => {
        const handleEsc = (e) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', handleEsc)
        return () => document.removeEventListener('keydown', handleEsc)
    }, [onClose])

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[99999]" onClick={onClose}>
            <button onClick={onClose} className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 text-white text-xl hover:bg-white/20 z-[100000]">✕</button>
            <div className="relative overflow-hidden animate-popup" style={{ boxShadow: '0 25px 50px ' + shadowColor }} onClick={(e) => e.stopPropagation()}>
                <img src={item.image} alt={'Project ' + item.id} className="w-[90vw] max-w-[500px] h-auto object-contain" draggable="false" />
            </div>
        </div>,
        document.body
    )
}

function PortfolioCard({ item, index, onSelect, shadowColor }) {
    const cardRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        if (cardRef.current) anime({ targets: cardRef.current, translateY: [100, 0], opacity: [0, 1], rotate: [0, item.rotate], duration: 800, delay: 200 + (index * 100), easing: 'easeOutExpo' })
    }, [index, item.rotate])

    const handleHover = (hovered) => {
        setIsHovered(hovered)
        if (cardRef.current) anime({ targets: cardRef.current, scale: hovered ? 1.15 : 1, rotate: hovered ? 0 : item.rotate, duration: 400, easing: 'easeOutExpo' })
    }

    return (
        <div
            ref={cardRef}
            className="portfolio-card relative portfolio-card-size aspect-[5/7] overflow-hidden cursor-pointer opacity-0"
            style={{ transform: 'rotate(' + item.rotate + 'deg)', boxShadow: isHovered ? '0 30px 60px ' + shadowColor : '0 20px 40px ' + shadowColor }}
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
            onClick={() => onSelect(item)}
        >
            <img src={item.image} alt={'Project ' + item.id} className="w-full h-full object-fill" loading="lazy" draggable="false" />
        </div>
    )
}

function HeroSection() {
    const { isDarkMode, toggleTheme } = useTheme()
    const [selectedItem, setSelectedItem] = useState(null)
    const titleRef = useRef(null)
    const headerRef = useRef(null)
    const footerRef = useRef(null)

    const textColor = isDarkMode ? 'text-white' : 'text-black'
    const shadowColor = isDarkMode ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.25)'

    useEffect(() => {
        if (titleRef.current) {
            const text = titleRef.current.textContent || ''
            titleRef.current.innerHTML = text.split('').map(char => char === ' ' ? ' ' : '<span style="display:inline-block">' + char + '</span>').join('')
            titleRef.current.style.opacity = '1'
        }
        if (headerRef.current) anime({ targets: headerRef.current.children, opacity: [0, 1], translateY: [-20, 0], delay: anime.stagger(100, { start: 600 }), duration: 600, easing: 'easeOutExpo' })
        if (footerRef.current) anime({ targets: footerRef.current.children, opacity: [0, 1], translateY: [20, 0], delay: anime.stagger(100, { start: 800 }), duration: 600, easing: 'easeOutExpo' })
    }, [])

    return (
        <section className={'relative h-screen overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
            <style>{'.animate-popup { animation: popupFade 0.3s ease-out forwards; } @keyframes popupFade { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }'}</style>
            <header ref={headerRef} className="absolute top-0 left-0 right-0 flex justify-between items-start z-50" style={{ padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 5rem)' }}>
                <h1 className={'header-text opacity-0 ' + textColor}>Lei Gabriel</h1>
                <span className={'header-text text-right opacity-0 ' + textColor}>
                    <button onClick={toggleTheme} className="hover:underline cursor-pointer">{isDarkMode ? 'Light' : 'Dark'} Mode</button>
                </span>
            </header>
            <div className="absolute inset-0 flex items-center justify-center z-10 translate-y-[-10%]">
                <h2 ref={titleRef} className={'portfolio-title opacity-0 ' + textColor} style={{ willChange: 'transform' }}>PORTFOLIO</h2>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="flex items-end justify-center card-gap translate-y-[25%]" style={{ perspective: '1000px' }}>
                    {portfolioItems.map((item, index) => (<PortfolioCard key={item.id} item={item} index={index} onSelect={setSelectedItem} shadowColor={shadowColor} />))}
                </div>
            </div>
            <footer ref={footerRef} className="absolute bottom-0 left-0 right-0 flex justify-between items-end z-50" style={{ padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 5rem)' }}>
                <span className={'header-text opacity-0 ' + textColor}>Web Developer/</span>
                <span className={'header-text opacity-0 ' + textColor}>Graphic Designer</span>
            </footer>
            {selectedItem && <ImagePopup item={selectedItem} onClose={() => setSelectedItem(null)} shadowColor={shadowColor} />}
        </section>
    )
}

export default HeroSection