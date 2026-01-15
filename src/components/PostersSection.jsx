import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/ThemeContext'
import { useStaggerAnimation } from '../hooks/useScrollAnimation'

const postersData = [
    { id: 1, src: '/img/posters/01-multo.png', alt: 'Multo Poster' },
    { id: 2, src: '/img/posters/02-vintage.png', alt: 'Vintage Poster' },
    { id: 3, src: '/img/posters/03-yunjin.png', alt: 'Yunjin Poster' },
    { id: 4, src: '/img/posters/04-giselle.jpg', alt: 'Giselle Poster' },
    { id: 5, src: '/img/posters/05-pusa.png', alt: 'Pusa Poster' },
    { id: 6, src: '/img/posters/06-jennie.png', alt: 'Jennie Poster' },
    { id: 7, src: '/img/posters/07-perception.png', alt: 'Perception Poster' },
    { id: 8, src: '/img/posters/08-kanibalismo.png', alt: 'Kanibalismo Poster' }
    // { id: 9, src: '/img/posters/09-kalayaan.png', alt: 'Vintage Poster' }
]

function ImagePopup({ poster, onClose, shadowColor }) {
    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-[#212631]/75 backdrop-blur-sm z-[99999]" onClick={onClose}>
            <button onClick={onClose} className="fixed top-4 right-4 w-10 h-10 flex items-center justify-center bg-white/10 text-white text-xl hover:bg-white/20 z-[100000]">✕</button>
            <div className="relative overflow-hidden animate-popup max-w-[90vw] max-h-[90vh]" style={{ boxShadow: '0 25px 50px ' + shadowColor }} onClick={(e) => e.stopPropagation()}>
                <img src={poster.src} alt={poster.alt} className="max-w-full max-h-[85vh] object-contain" draggable="false" />
            </div>
        </div>,
        document.body
    )
}

function PostersSection() {
    const { isDarkMode } = useTheme()
    const [selectedPoster, setSelectedPoster] = useState(null)
    const gridRef = useStaggerAnimation({ selector: '.poster-item', animation: 'scaleUp', stagger: 80, delay: 150 })

    const shadowColor = isDarkMode ? 'rgba(0, 0, 0, 0.6)' : 'rgba(0, 0, 0, 0.3)'

    return (
        <section id="posters" className={'relative overflow-hidden ' + (isDarkMode ? 'bg-[#212631]' : 'bg-[#f2f2f2]')}>
            <style>{'.animate-popup { animation: popupFade 0.3s ease-out forwards; } @keyframes popupFade { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }'}</style>
            <div ref={gridRef} className="grid grid-cols-2 gap-0">
                {postersData.map((poster) => (
                    <div key={poster.id} className="poster-item aspect-[4/5] overflow-hidden cursor-pointer" onClick={() => setSelectedPoster(poster)}>
                        <img src={poster.src} alt={poster.alt} className="w-full h-full object-fill" loading="lazy" draggable="false" />
                    </div>
                ))}
            </div>
            {selectedPoster && <ImagePopup poster={selectedPoster} onClose={() => setSelectedPoster(null)} shadowColor={shadowColor} />}
        </section>
    )
}

export default PostersSection