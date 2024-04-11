import { useState } from "react"
import { StayEditIntro } from "../cmps/StayEditCmps/StayEditIntro"
import { ProgressFooter } from "../cmps/StayEditCmps/ProgressFooter"

export function StayEdit() {

    const [editStage, setEditStage] = useState('intro')

    return <section className="add-stay">

        {editStage === 'intro' && <StayEditIntro />}



        <ProgressFooter />



    </section>
}