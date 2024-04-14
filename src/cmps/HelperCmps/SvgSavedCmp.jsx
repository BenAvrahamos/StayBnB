
export function SvgSavedCmp({ folder, svgNames, handleChange, selectedValue = '' }) {

    // function doesFileExist(filePath) {
    //     try {
    //         return fs.existsSync(filePath)
    //     } catch (error) {
    //         return false
    //     }
    // }

    return <>
        {svgNames.map(name =>
            <div key={name} onClick={() => handleChange(name)}
                className={`svg ${name.replace(/_/g, ' ')} ${(selectedValue === name) ? 'selected' : ''}`}>
                <img src={`./src/assets/svg/${folder}/${name}.svg`} alt={name} />
                <p>{name.replace(/_/g, ' ')}</p>
            </div>)}
    </>
}
