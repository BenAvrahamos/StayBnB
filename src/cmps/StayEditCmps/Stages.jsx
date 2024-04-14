import React, { useEffect, useRef, useState } from 'react'
import { utilService } from '../../services/util.service'
import { SvgPathCmp } from '../HelperCmps/SvgPathCmp'
import { ButtonGroup } from '../HelperCmps/ButtonGroup'

export function Stage1() {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    }, [])

    return (
        <section className="stage-1">
            <section className="text">
                <span className="step">Step 1</span>
                <span className="question">Tell us about your place</span>
                <span className="description">In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room. Then let us know the location and how many guests can stay.</span>
            </section>
            <video ref={videoRef} src="src\assets\vids\BuildHouseVidIntro.mp4" autoPlay muted></video>
        </section>
    )
}


export function Stage2({ stay, editStay }) {

    function handleSelect(value) {
        const updatedStay = { ...stay, placeType: value }
        console.log(stay);
        editStay(updatedStay)
    }


    return <section className="stage-2">
        <section className='text'>
            <span className='question'>What type of place will guests have?</span>
        </section>

        <section className='options'>
            <div onClick={() => handleSelect('An entire home')} className={stay.placeType === 'An entire home' ? 'selected' : ''}>
                <span className='title'>
                An entire home
                </span>
                <span className='subtitles'>Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen.</span>
                <SvgPathCmp name={'house'}/> 
            </div>
            <div onClick={() => handleSelect('A room')} className={stay.placeType === 'A room' ? 'selected' : ''}>
                <span className='title'>
                    A room
                </span>
                <span className='subtitles'>Guests have their own private room for sleeping. Other areas could be shared.</span>
                <SvgPathCmp name={'Workspace'}/> 
            </div>
            <div onClick={() => handleSelect('A Shared room')} className={stay.placeType === 'A Shared room' ? 'selected' : ''}>
                <span className='title'>
                    A Shared room
                </span>
                <span className='subtitles'>Guests sleep in a bedroom or a common area that could be shared with others.</span>
            </div>
        </section>
    </section>

}

export function Stage3({ stay, editStay }) {
    function handleSelect(value) {
        const updatedStay = { ...stay, propertyType: value }
        editStay(updatedStay)
    }

    return (
        <section className="stage-3">
            <section className='text'>
                <span className='question'>Which of these best describes your place?</span>
            </section>

            <section className='options'>
                <div onClick={() => handleSelect('house')} className={stay.propertyType === 'house' ? 'selected' : ''}>
                        <SvgPathCmp name={'house'}/> 
                    <div className='icon'></div>
                    <span className='title'>House</span>
                </div>

                <div onClick={() => handleSelect('apartment')} className={stay.propertyType === 'apartment' ? 'selected' : ''}>
                <SvgPathCmp name={'apartment'}/> 
                    <span className='title'>Apartment</span>
                </div>

                <div onClick={() => handleSelect('hotel')} className={stay.propertyType === 'hotel' ? 'selected' : ''}>
                <SvgPathCmp name={'guesthouse'}/> 
                    <span className='title'>Guesthouse</span>
                </div>

                <div onClick={() => handleSelect('guesthouse')} className={stay.propertyType === 'guesthouse' ? 'selected' : ''}>
                <SvgPathCmp name={'hotel'}/> 
                    <span className='title'>Hotel</span>
                </div>
            </section>
        </section>
    );
}

export function Stage4({ stay, editStay }) {
    const isCapacityZero = stay.capacity === 0;
    const isCapacityMax = stay.capacity === 16;

    const isBedroomsZero = stay.sumOfBeds === 0;
    const isBedroomsMax = stay.sumOfBeds === 16;

    const isBathroomsZero = stay.bathrooms === 0;
    const isBathroomsMax = stay.bathrooms === 16;

    const isBathsZero = stay.baths === 0;
    const isBathsMax = stay.baths === 16;

    return (
        <section className="stage-4">
            <section className='text'>
                <span className='question'>Let's start with the basics</span>
                <span className="description">How many guests can your place accommodate?</span>
            </section>

            <section className='options'>
                <div>
                    <span>Guests</span>
                    <div className='control'>
                        <button onClick={() => editStay({ ...stay, capacity: Math.max(stay.capacity - 1, 0) })} className={isCapacityZero ? 'disabled' : ''}>-</button>
                        <span>{stay.capacity}</span>
                        <button onClick={() => editStay({ ...stay, capacity: Math.min(stay.capacity + 1, 16) })} className={isCapacityMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>

                <div>
                    <span>Bedrooms</span>
                    <div className='control'>
                        <button onClick={() => editStay({ ...stay, sumOfBeds: Math.max(stay.sumOfBeds - 1, 0) })} className={isBedroomsZero ? 'disabled' : ''}>-</button>
                        <span>{stay.sumOfBeds}</span>
                        <button onClick={() => editStay({ ...stay, sumOfBeds: Math.min(stay.sumOfBeds + 1, 16) })} className={isBedroomsMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>

                <div>
                    <span>Bathrooms</span>
                    <div className='control'>
                        <button onClick={() => editStay({ ...stay, bathrooms: Math.max(stay.bathrooms - 1, 0) })} className={isBathroomsZero ? 'disabled' : ''}>-</button>
                        <span>{stay.bathrooms}</span>
                        <button onClick={() => editStay({ ...stay, bathrooms: Math.min(stay.bathrooms + 1, 16) })} className={isBathroomsMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>

                <div>
                    <span>Baths</span>
                    <div className='control'>
                        <button onClick={() => editStay({ ...stay, baths: Math.max(stay.baths - 1, 0) })} className={isBathsZero ? 'disabled' : ''}>-</button>
                        <span>{stay.baths}</span>
                        <button onClick={() => editStay({ ...stay, baths: Math.min(stay.baths + 1, 16) })} className={isBathsMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>
            </section>
        </section>
    );
}



export function Stage5() {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    }, [])


    return <section className="stage-5">
        <section className="text">
            <span className="step">Step 2</span>
            <span className="question">Make your place stand out</span>
            <span className="description">In this step, you’ll add some of the amenities your place offers, plus 5 or more photos. Then, you’ll create a title and description.</span>
        </section>
        <video ref={videoRef} src="src\assets\vids\BuildHouseVidMiddle.mp4" autoPlay muted></video>
    </section>


}

export function Stage6() {
    return <section className="stage-6">
        <section className='text'>

            <span className="question">Tell guests what your place has to offer</span>
            <span className="description">You can add more amenities after you publish your listing.
            </span>

            <section className='amenities-container'>
                <article className='amenity'>
                    <div className='icon'></div>
                    <SvgPathCmp name={'apartment'}/> 
                    <div className='title'>Amenity</div>
                </article>

                <article className='amenity'>
                    <div className='icon'></div>
                    <div className='title'>Amenity</div>
                </article>

                <article className='amenity'>
                    <div className='icon'></div>
                    <div className='title'>Amenity</div>
                </article>

                <article className='amenity'>
                    <div className='icon'></div>
                    <div className='title'>Amenity</div>
                </article>

                <article className='amenity'>
                    <div className='icon'></div>
                    <div className='title'>Amenity</div>
                </article>

                <article className='amenity'>
                    <div className='icon'></div>
                    <div className='title'>Amenity</div>
                </article>

                <article className='amenity'>
                    <div className='icon'></div>
                    <div className='title'>Amenity</div>
                </article>

                <article className='amenity'>
                    <div className='icon'></div>
                    <div className='title'>Amenity</div>
                </article>




            </section>


        </section>
    </section>


}

export function Stage7() {
    return <section className="stage-7">
        <section className='text'>

            <span className="question">Add photos of your place</span>
            <span className="description">Guests are more likely to book a listing that includes photos. You can add more photos after you publish your listing.
            </span>
        </section>
    </section>


}

export function Stage8({ stay, editStay }) {
    const [inputValue, setInputValue] = useState(stay.summary)

    const handleInputChange = (event) => {
        const newValue = event.target.value

        if (newValue.length <= 32) {
            setInputValue(newValue)
            editStay({ ...stay, summary: newValue })
        } else {
            setInputValue(newValue.slice(0, 32))
        }
    }

    return (
        <section className="stage-8">
            <section className='text'>
                <span className="question">Now, let's give your place a title</span>
                <span className="description">Short titles work best. Have fun with it—you can always change it later</span>
                <input type="text" value={inputValue} onChange={handleInputChange} />
                <span className='counter'>{inputValue.length}/32</span>
            </section>
        </section>
    )
}


export function Stage9({ stay, editStay }) {
    const [inputValue, setInputValue] = useState(stay.desc);

    const handleInputChange = (event) => {
        const newValue = event.target.value

        if (newValue.length <= 500) {
            setInputValue(newValue);
            editStay({ ...stay, desc: newValue })
        } else {
            setInputValue(newValue.slice(0, 500))
        }
    }

    return (
        <section className="stage-9">
            <section className='text'>
                <span className="question">Create your description</span>
                <span className="description">Share what makes your place special.</span>
                <pre><textarea value={inputValue} onChange={handleInputChange} rows={10} cols={50} /></pre>
                <span className='counter'>{inputValue.length}/500</span>
            </section>
        </section>
    )
}


export function Stage10({ stay, editStay }) {
    const videoRef = useRef(null)

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play()
        }
    }, [])
    return <section className="stage-10">
        <section className="text">
            <span className="step">Step 3</span>
            <span className="question">Finish up and publish</span>
            <span className="description">Finally, you’ll choose if you'd like to start with an experienced guest, then you'll set your nightly price. Answer a few quick questions and publish when you're ready.</span>
        </section>
        <video ref={videoRef} src="src\assets\vids\BuildHouseVidOutro.mp4" autoPlay muted></video>
    </section>


}

export function Stage11({ stay, editStay }) {
    const [price, setPrice] = useState(stay.price || '')
    const handlePriceChange = (event) => {
        const newPrice = event.target.value
        setPrice(newPrice)
        editStay({ ...stay, price: newPrice })
    };

    return (
        <section className="stage-11">
            <section className='text'>
                <span className="question">Now, set your price</span>
                <span className="description">You can change it anytime.</span>
                <label htmlFor="">
                    <span className='price'>$</span>
                    <input type="number" value={price} onChange={handlePriceChange} />
                    <span className='per-night'>per night</span>
                </label>
            </section>
        </section>
    )
}

export function Stage12({ stay }) {
    return <section className="stage-12">
        <section className='text'>
            <span className="question">Review your listing</span>
            <span className="description">Here's what we'll show to guests. Make sure everything looks good.
            </span>

            <div className='stay-edit-preview'>
                <img src={`https://picsum.photos/id/${utilService.getRandomIntInclusive(1, 150)}/600/600`} />
                <div><span className='boldTxt'> ${stay.price} </span> night</div>

            </div>

        </section>
    </section>


}
