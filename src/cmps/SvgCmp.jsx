export function SvgCmp({ svgNames }) {

    function doesFileExist(filePath) {
        try {
            return fs.existsSync(filePath)
        } catch (error) {
            return false;
        }
    }

    function renderSvg(name) {
        const svg = `./src/assets/svg/${name}.svg`
        const nameCaps = name[0].toUpperCase() + name.slice(1)

            return <div key={name} className={`${name.replace(/_/g, ' ')} flex column center`}>
                {doesFileExist(svg) && <img src={svg} alt={name} />}
                <p>{nameCaps.replace(/_/g, ' ')}</p>
            </div>
    }

    return <>
        {svgNames.map(name => renderSvg(name))}
    </>
}
