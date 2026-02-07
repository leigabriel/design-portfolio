import { useState, useEffect } from 'react'

export default function LoadingScreen({ onComplete }) {
    const [exiting, setExiting] = useState(false)
    const [visible, setVisible] = useState(true)

    useEffect(() => {
        const exitTimer = setTimeout(() => setExiting(true), 2200)
        const removeTimer = setTimeout(() => {
            setVisible(false)
            onComplete?.()
        }, 1000)
        return () => {
            clearTimeout(exitTimer)
            clearTimeout(removeTimer)
        }
    }, [onComplete])

    if (!visible) return null

    return (
        <div className={'loading-screen' + (exiting ? ' loading-exit' : '')}>
            <div className="loading-inner">
                <div className="loading-bar-track">
                    <div className="loading-bar-fill" />
                </div>
            </div>
        </div>
    )
}
