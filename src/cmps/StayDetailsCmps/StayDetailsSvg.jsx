import { staySvgService } from '../../services/stay-svg.service'
import { StringToSvg } from "./StringToSvg"

export function StayDetailsSvg({ bed }) {
    if (bed === 'couch' || bed === 'sofa bed') {
        return <span className={`icon ${bed}`} key={bed}><StringToSvg svgString={staySvgService.sofaBed} /></span>
    }
    if (bed === 'double bed') {
        return <span className={`icon ${bed}`} key={bed}><StringToSvg svgString={staySvgService.doubleBed} /></span>
    }
    if (bed === 'single bed') {
        return <span className={`icon ${bed}`} key={bed}><StringToSvg svgString={staySvgService.singleBed} /></span>
    }
    if (bed === 'king size bed' || bed === 'queen size bed') {
        return <span className={`icon ${bed}`} key={bed}><StringToSvg svgString={staySvgService.queenKingBed} /></span>
    }
}
