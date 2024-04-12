import { useState } from "react"
import { Stage1, Stage10, Stage11, Stage12, Stage2, Stage3, Stage4, Stage5, Stage6, Stage7, Stage8, Stage9 } from "../cmps/StayEditCmps/Stages.jsx"
import { ProgressFooter } from "../cmps/StayEditCmps/ProgressFooter"
import { StayEditHeader } from "../cmps/StayEditCmps/StayEditHeader"


export function StayEdit() {

    const [editStage, setEditStage] = useState(1)


    return <section className="add-stay">

        <StayEditHeader />

        {editStage === 1 && <Stage1 />}
        {editStage === 2 && <Stage2 />}
        {editStage === 3 && <Stage3 />}
        {editStage === 4 && <Stage4 />}
        {editStage === 5 && <Stage5 />}
        {editStage === 6 && <Stage6 />}
        {editStage === 7 && <Stage7 />}
        {editStage === 8 && <Stage8 />}
        {editStage === 9 && <Stage9 />}
        {editStage === 10 && <Stage10 />}
        {editStage === 11 && <Stage11 />}
        {editStage === 12 && <Stage12 />}

        <ProgressFooter editStage={editStage} setEditStage={setEditStage} />



    </section>
}