export function ProgressFooter({ editStage, setEditStage, onSaveStay }) {
    // Calculate the width of the progress bar filling based on the editStage
    const progressBarWidth = editStage * 8.33 + '%'

    return (
        <section className="progress-footer">
            <button onClick={() => {
                if (editStage > 1) {
                    setEditStage(prevStage => prevStage - 1);
                }
            }} className={`back-btn ${editStage === 1 ? 'disabled' : ''}`}>
                Back
            </button>

            <div>
            {editStage < 12 && (
                <div onClick={() => setEditStage(prevStage => prevStage + 1)} className="next-btn">
                    Next
                </div>
            )}
            
            {editStage >= 12 && (
                <div onClick={onSaveStay} className="Publish-btn">
                    Publish
                </div>
            )}
        </div>

            <div className="progress-bar-background"></div>

            <div className="progress-bar-filling" style={{ width: progressBarWidth }}></div>
        </section>
    )
}
