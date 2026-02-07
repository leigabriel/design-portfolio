import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useSmoothScroll } from '../context/SmoothScrollContext'

const navLinks = [
    { label: 'Home', target: 'hero' },
    { label: 'About', target: 'about' },
    { label: 'Skills', target: 'skills' },
    { label: 'Contents', target: 'contents' },
    { label: 'Contact', target: 'contact' },
]

function NavigationSidebar({ isOpen, onClose }) {
    const ctx = useSmoothScroll()

    const handleNav = (target) => {
        const el = document.getElementById(target)
        if (el && ctx) {
            const lenis = ctx.getLenis()
            if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.5 })
        }
        onClose()
    }

    return createPortal(
        <>
            <div className={'nav-overlay' + (isOpen ? ' open' : '')} onClick={onClose} />
            <nav className={'nav-sidebar' + (isOpen ? ' open' : '')}>
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-[#000000] text-2xl cursor-pointer hover:text-[#212631] transition-colors"
                >
                    ✕
                </button>
                <div className="flex flex-col gap-2">
                    {navLinks.map((link, i) => (
                        <button
                            key={link.target}
                            className="nav-link text-left"
                            onClick={() => handleNav(link.target)}
                            style={{ animationDelay: isOpen ? (i * 0.05) + 's' : '0s' }}
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
                <div className="mt-auto pt-12">
                    <p className="text-[#000000]/40 text-xs tracking-widest uppercase">Lei Gabriel © 2026</p>
                </div>
            </nav>
        </>,
        document.body
    )
}

export function useNavigation() {
    const [isOpen, setIsOpen] = useState(false)
    const open = () => setIsOpen(true)
    const close = () => setIsOpen(false)
    return { isOpen, open, close }
}

export default NavigationSidebar