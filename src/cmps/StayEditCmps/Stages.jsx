import React, { useEffect, useRef, useState } from 'react'

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


export function Stage2() {

    function handleSelect() {

    }


    return <section className="stage-2">
        <section className='text'>
            <span className='question'>What type of place will guests have?</span>
        </section>

        <section className='options'>
            <div onClick={() => handleSelect}>
                <span className='title'>
                    An Entire place
                </span>
                <span className='subtitles'>Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen.</span>
            </div>
            <div onClick={() => handleSelect}>
                <span className='title'>
                    A room
                </span>
                <span className='subtitles'>Guests have their own private room for sleeping. Other areas could be shared.</span>
            </div>
            <div onClick={() => handleSelect()}>
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
        const updatedStay = { ...stay, type: value }
        editStay(updatedStay)
    }

    return (
        <section className="stage-3">
            <section className='text'>
                <span className='question'>Which of these best describes your place?</span>
            </section>

            <section className='options'>
                <div onClick={() => handleSelect('house')} className={stay.type === 'house' ? 'selected' : ''}>
                    <div className='icon'></div>
                    <span className='title'>House</span>
                </div>

                <div onClick={() => handleSelect('apartment')} className={stay.type === 'apartment' ? 'selected' : ''}>
                    <div className='icon'></div>
                    <span className='title'>Apartment</span>
                </div>

                <div onClick={() => handleSelect('hotel')} className={stay.type === 'hotel' ? 'selected' : ''}>
                    <div className='icon'></div>
                    <span className='title'>Guesthouse</span>
                </div>

                <div onClick={() => handleSelect('guesthouse')} className={stay.type === 'guesthouse' ? 'selected' : ''}>
                    <div className='icon'></div>
                    <span className='title'>Hotel</span>
                </div>
            </section>
        </section>
    );
}

export function Stage4({ stay, editStay }) {
    console.log(stay);

    const isCapacityZero = stay.capacity === 0
    const isCapacityMax = stay.capacity === 16

    const isBathsZero = stay.baths === 0
    const isBathsMax = stay.baths === 16

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
                        <button onClick={() => !isCapacityZero && editStay({ ...stay, capacity: stay.capacity - 1 })} className={isCapacityZero ? 'disabled' : ''}>-</button>
                        <span>{stay.capacity}</span>
                        <button onClick={() => !isCapacityMax && editStay({ ...stay, capacity: stay.capacity + 1 })} className={isCapacityMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>

                <div>
                    <span>Bedrooms</span>
                    <div className='control'>
                        <button onClick={() => !isBathsZero && editStay({ ...stay, baths: stay.baths - 1 })} className={isBathsZero ? 'disabled' : ''}>-</button>
                        <span>{stay.baths}</span>
                        <button onClick={() => !isBathsMax && editStay({ ...stay, baths: stay.baths + 1 })} className={isBathsMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>

                <div>
                    <span>Bathrooms</span>
                    <div className='control'>
                        <button onClick={() => !isBathsZero && editStay({ ...stay, baths: stay.baths - 1 })} className={isBathsZero ? 'disabled' : ''}>-</button>
                        <span>4</span>
                        <button onClick={() => !isBathsMax && editStay({ ...stay, baths: stay.baths + 1 })} className={isBathsMax ? 'disabled' : ''}>+</button>
                    </div>
                </div>
            </section>
        </section>
    )
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

export function Stage9() {
    return <section className="stage-9">
        <section className='text'>
            <span className="question">Create your description</span>
            <span className="description">Share what makes your place special.</span>
            <pre><textarea name="" id="" /></pre>
        </section>
    </section>

}


export function Stage10({stay,editStay}) {
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

export function Stage12() {
    return <section className="stage-12">
        <section className='text'>
            <span className="question">Review your listing</span>
            <span className="description">Here's what we'll show to guests. Make sure everything looks good.
            </span>
        </section>
    </section>


}
