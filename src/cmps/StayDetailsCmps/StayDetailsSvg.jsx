import { stayDetailsSvgService } from '../../services/stay-details-svg'
import { StringToSvg } from "./StringToSvg"

export function StayDetailsSvg({ bed }) {
    if (bed === 'couch' || bed === 'sofa bed') {
        return <span className={`icon ${bed}`} key={bed}><StringToSvg svgString={stayDetailsSvgService.sofaBed} /></span>
    }
    if (bed === 'double bed') {
        return <span className={`icon ${bed}`} key={bed}><StringToSvg svgString={stayDetailsSvgService.doubleBed} /></span>
    }
    if (bed === 'single bed') {
        return <span className={`icon ${bed}`} key={bed}><StringToSvg svgString={stayDetailsSvgService.singleBed} /></span>
    }
    if (bed === 'king size bed' || bed === 'queen size bed') {
        return <span className={`icon ${bed}`} key={bed}><StringToSvg svgString={stayDetailsSvgService.queenKingBed} /></span>
    }
}
