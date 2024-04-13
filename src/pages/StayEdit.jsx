import { useState } from "react"
import { Stage1, Stage10, Stage11, Stage12, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9 } from "../cmps/StayEditCmps/Stages.jsx"
import { ProgressFooter } from "../cmps/StayEditCmps/ProgressFooter"
import { StayEditHeader } from "../cmps/StayEditCmps/StayEditHeader"
import { stayService } from "../services/stay.local.service.js"


export function StayEdit() {
    const [stay, editStay] = useState(stayService.getEmptyStay)
    console.log(stay);

    const [editStage, setEditStage] = useState(1)


    return <section className="add-stay">

        <StayEditHeader />

        {editStage === 1 && <Stage1 />}
        {editStage === 2 && <Stage2 />}
        {editStage === 3 && <Stage3 stay={stay} editStay={editStay} />}
        {editStage === 4 && <Stage4 stay={stay} editStay={editStay} />}
        {editStage === 5 && <Stage5 />}
        {editStage === 6 && <Stage6 />}
        {editStage === 7 && <Stage7 stay={stay} editStay={editStay} />}
        {editStage === 8 && <Stage8 stay={stay} editStay={editStay} />}
        {editStage === 9 && <Stage9 />}
        {editStage === 10 && <Stage10 stay={stay} editStay={editStay} />}
        {editStage === 11 && <Stage11 stay={stay} editStay={editStay} />}
        {editStage === 12 && <Stage12 stay={stay} />}

        <ProgressFooter editStage={editStage} setEditStage={setEditStage} />



    </section>
}