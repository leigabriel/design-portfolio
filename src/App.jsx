import { useState, useCallback, useEffect, useRef } from 'react'
import { SmoothScrollProvider, useSmoothScroll } from './context/SmoothScrollContext'
import { useSecurityProtection } from './hooks/useSecurityProtection'
// import LoadingScreen from './components/LoadingScreen'
import NavigationSidebar, { useNavigation } from './components/NavigationSidebar'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ContentsSection from './components/ContentsSection'
import PosterTitleSection from './components/PosterTitleSection'
import PostersSection from './components/PostersSection'
import WebTitleSection from './components/WebTitleSection'
import WebProjectSection from './components/WebProjectSection'
import ContactSection from './components/ContactSection'

function ScrollRevealHeader({ onMenuOpen }) {
    const [visible, setVisible] = useState(false)
    const lastScrollY = useRef(0)
    const scrollDelta = useRef(0)
    const ctx = useSmoothScroll()

    useEffect(() => {
        if (!ctx) return

        const SCROLL_THRESHOLD = 5 // Minimum scroll delta to trigger visibility change
        const HERO_THRESHOLD = window.innerHeight * 0.3 // Show earlier, at 30% of viewport

        const unsubscribe = ctx.subscribe(({ scrollY }) => {
            const delta = scrollY - lastScrollY.current
            scrollDelta.current += delta

            // Only update visibility when scroll delta exceeds threshold
            if (Math.abs(scrollDelta.current) > SCROLL_THRESHOLD) {
                const isScrollingUp = scrollDelta.current < 0
                const isAtTop = scrollY < 100
                const isPastHero = scrollY > HERO_THRESHOLD

                if (isAtTop) {
                    setVisible(false)
                } else if (isPastHero) {
                    setVisible(isScrollingUp)
                }

                scrollDelta.current = 0 // Reset delta after threshold reached
            }

            lastScrollY.current = scrollY
        })

        return unsubscribe
    }, [ctx])

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-[9000] transition-transform duration-300 ease-out ${visible ? 'translate-y-0' : '-translate-y-full'}`}
            style={{ padding: 'clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 5rem)' }}
        >
            <div className="flex justify-end">
                <button
                    className="menu-btn px-4 py-2 rounded-lg"
                    onClick={onMenuOpen}
                >
                    Menu
                </button>
            </div>
        </header>
    )
}

function AppContent() {
    useSecurityProtection()
    const [loading, setLoading] = useState(true)
    const nav = useNavigation()
    const handleLoadingComplete = useCallback(() => setLoading(false), [])

    return (
        <>
            {/* {loading && <LoadingScreen onComplete={handleLoadingComplete} />} */}
            <ScrollRevealHeader onMenuOpen={nav.open} />
            <NavigationSidebar isOpen={nav.isOpen} onClose={nav.close} />
            <main className="bg-[#212631]">
                <HeroSection onMenuOpen={nav.open} />
                <div className="sticky-sections-container">
                    <AboutSection />
                    <SkillsSection />
                    <ContentsSection />
                </div>
                <PosterTitleSection />
                <PostersSection />
                <WebTitleSection />
                <WebProjectSection />
                <ContactSection />
            </main>
        </>
    )
}

function App() {
    return (
        <SmoothScrollProvider>
            <AppContent />
        </SmoothScrollProvider>
    )
}

export default App
