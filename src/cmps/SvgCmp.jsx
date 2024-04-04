export function SvgCmp({ svgNames }) {

    function renderSvg(name) {
        try {
            const svg = `./src/assets/svg/${name}.svg`
            const nameCaps = name[0].toUpperCase() + name.slice(1)

            return <div key={name} className={`${name.replace(/_/g, ' ')}`}>
                <img src={svg} alt={name} />
                <p>{nameCaps.replace(/_/g, ' ')}</p>
            </div>
        } catch (error) {
            // SVG file not found, return a div with no image
            return <div key={name} className={`${name.replace(/_/g, ' ')}`}>
                <p>{name.replace(/_/g, ' ')}</p>
            </div>
        }
    }

    return <>
        {svgNames.map(name => renderSvg(name))}
    </>
}
