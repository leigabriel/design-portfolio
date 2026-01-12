import { useEffect } from 'react'

export function useSecurityProtection() {
    useEffect(() => {
        const handleContextMenu = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault()
                return false
            }
        }

        const handleDragStart = (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault()
                return false
            }
        }

        const handleCopy = (e) => {
            const selection = window.getSelection()
            if (selection && selection.toString().length === 0) {
                const target = e.target
                if (target.tagName === 'IMG') {
                    e.preventDefault()
                    return false
                }
            }
        }

        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault()
                return false
            }
        }

        document.addEventListener('contextmenu', handleContextMenu)
        document.addEventListener('dragstart', handleDragStart)
        document.addEventListener('copy', handleCopy)
        document.addEventListener('keydown', handleKeyDown)

        const style = document.createElement('style')
        style.textContent = 'img { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; pointer-events: auto; -webkit-touch-callout: none; } .no-select { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }'
        document.head.appendChild(style)

        return () => {
            document.removeEventListener('contextmenu', handleContextMenu)
            document.removeEventListener('dragstart', handleDragStart)
            document.removeEventListener('copy', handleCopy)
            document.removeEventListener('keydown', handleKeyDown)
            document.head.removeChild(style)
        }
    }, [])
}