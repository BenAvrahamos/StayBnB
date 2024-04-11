import { useRef } from 'react'
export function DynamicLocalHeaderNav() {

    function onMoveToSection(e) {
        e.stopPropagation()
        const targetElement = e.target
        const targetPosition = targetElement.getBoundingClientRect().top
        console.log(targetPosition)
        const scrollPosition = targetPosition + 30 // Adjust the scroll position to stop 80px before the target
        window.scrollTo({ top: scrollPosition, behavior: 'smooth' })
    }

    return <div className="dynamic-header-nav flex align-center">
        <a href="#gallery" onClick={onMoveToSection}>Photos</a>
        <a href="#amenities" onClick={onMoveToSection}>Amenities</a>
        <a href="#reviews" onClick={onMoveToSection}>Reviews</a>
        <a href="#location" onClick={onMoveToSection}>Location</a>
    </div>
}