import { useState } from "react"

import { SvgSavedCmp } from "./HelperCmps/SvgSavedCmp"
import { FilterModal } from './FilterModal'

import { filterLists } from "../services/filterLists.service"


export function LabelsFilter({ setStayFilter, filterBy, isFixed }) {
	const [showFilterModal, setShowFilter] = useState(false)

	function handleChange(label) {
		setStayFilter({ ...filterBy, label: [label] })
	}

	const openFilterModal = () => {
		setShowFilter(true)
	}

	return <>
		<section className={`index-filter-section grid align-center ${isFixed ? 'fixed-label-filter' : ''}`}>
			<section className="label-filter-section grid">
				<SvgSavedCmp
					folder={'labels'}
					svgNames={filterLists.filterLabels}
					handleChange={handleChange} />
			</section>
			<button className="flex align-center space-evenly" onClick={openFilterModal}>
				<img src="./src/assets/svg/filter.svg" /> <span>Filters</span></button>
		</section>
		{showFilterModal && <FilterModal
			setShowFilter={setShowFilter}
			setStayFilter={setStayFilter}
			filterBy={filterBy}
		/>}
	</>
}