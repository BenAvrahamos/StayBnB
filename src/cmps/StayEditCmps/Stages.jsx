import React, { useEffect, useRef } from 'react'

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
    return <section className="stage-2">
        <section className='text'>
            <span className='question'>What type of place will guests have?</span>
        </section>

    </section>

}

export function Stage3() {
    return <section className="stage-3">
        <section className='text'>
            <span className='question'>Which of these best describes your place?
            </span>
        </section>

    </section>



}

export function Stage4() {
    return <section className="stage-4">
        <section className='text'>
            <span className='question'>Let's start with the basics
            </span>
            <span className="description">How many guests can your place accommodate?</span>
        </section>
    </section>


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

export function Stage8() {
    return <section className="stage-8">
        <section className='text'>
            <span className="question">Now, let's give your place a title</span>
            <span className="description">Short titles work best. Have fun with it—you can always change it later
            </span>
        </section>
    </section>


}

export function Stage9() {
    return <section className="stage-9">
        <section className='text'>

            <span className="question">Create your description</span>
            <span className="description">Share what makes your place special.
            </span>
        </section>
    </section>


}

export function Stage10() {
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

export function Stage11() {
    return <section className="stage-11">
        <section className='text'>
            <span className="question">Now, set your price</span>
            <span className="description">You can change it anytime.
            </span>
        </section>
    </section>


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
