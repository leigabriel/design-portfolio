import { useState, useCallback } from 'react'
import { SmoothScrollProvider } from './context/SmoothScrollContext'
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

function AppContent() {
    useSecurityProtection()
    const [loading, setLoading] = useState(true)
    const nav = useNavigation()
    const handleLoadingComplete = useCallback(() => setLoading(false), [])

    return (
        <>
            {/* {loading && <LoadingScreen onComplete={handleLoadingComplete} />} */}
            <NavigationSidebar isOpen={nav.isOpen} onClose={nav.close} />
            <main className="bg-[#212631]">
                <HeroSection onMenuOpen={nav.open} />
                <AboutSection />
                <SkillsSection />
                <ContentsSection />
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
