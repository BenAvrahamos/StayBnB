import { useState, useEffect } from 'react'
export function StayGalleryPreview({ stay }) {
    const [fivePicsPreview, setFivePicsPreview] = useState([])

    useEffect(() => {
        if (stay.imgUrls.length >= 5) setFivePicsPreview(stay.imgUrls.slice(0, 5))
    }, [])

    return (
        <section className="gallery-stay-details">
            {fivePicsPreview && fivePicsPreview.map((pic,idx) => <img key={idx} src={pic} className={`img${idx}`} />)}
        </section>
    )
}