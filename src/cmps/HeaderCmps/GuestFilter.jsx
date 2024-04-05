export function GuestFilter() {

    return <section className="guest-filter">

        <div className="options">

            <article className="option">
                <div className="description">
                    Adults
                    <span>Ages 13 or above</span>
                </div>

                <div className="count">
                    <button>-</button>
                    0
                    <button>+</button>
                </div>

            </article>



            <article className="option">
                <div className="description">
                    Children
                    <span>Ages 2 - 12</span>
                </div>

                <div className="count">
                    <button>-</button>
                    0
                    <button>+</button>
                </div>


            </article>

            <article className="option">
                <div className="description">
                    Infants
                    <span>Under 2</span>
                </div>

                <div className="count">
                    <button>-</button>
                    0
                    <button>+</button>
                </div>

            </article>

            <article className="option">
                <div className="description">
                    Pets
                </div>

                <div className="count">
                    <button>-</button>
                    0
                    <button>+</button>
                </div>

            </article>

        </div>



    </section>
}