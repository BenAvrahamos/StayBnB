import { staySvgService } from '../../services/stay-svg.service'
import { StringToSvg } from "./StringToSvg"

export function StayDetailsSvg({ icon }) {
        return <span className={`icon ${icon}`} key={icon}><StringToSvg svgString={staySvgService[icon]} /></span>
}
