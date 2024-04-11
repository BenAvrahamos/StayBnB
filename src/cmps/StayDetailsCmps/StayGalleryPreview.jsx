import { useState, useEffect } from 'react'
import { staySvgService } from '../../services/stay-svg.service'
import { StringToSvg } from './StringToSvg'

export function StayGalleryPreview({ stay }) {
    const [fivePicsPreview, setFivePicsPreview] = useState([])

    useEffect(() => {
        if (stay.imgUrls.length >= 5) setFivePicsPreview(stay.imgUrls.slice(0, 5))
    }, [])

    return (
        <section className="gallery-stay-details" id="gallery">
            {fivePicsPreview && fivePicsPreview.map((pic,idx) => <img key={idx} src={pic} className={`img${idx}`} />)}
            <div className='show-all-btn flex align-center'>{<StringToSvg svgString={staySvgService['showallphotos']} />} Show all photos</div>
        </section>
        
    )
}