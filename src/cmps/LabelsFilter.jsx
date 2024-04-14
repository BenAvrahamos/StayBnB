import { useState } from "react"

import { SvgSavedCmp } from "./HelperCmps/SvgSavedCmp"
import { FilterModal } from './FilterModal'

import { filterLists } from "../services/filterLists.service"

export function LabelsFilter({ setStayFilter, filterBy, scrolledPage }) {
	const [showFilterModal, setShowFilter] = useState(false)

	function handleChange(label) {
		setStayFilter({ ...filterBy, label: [label] })
	}

	const openFilterModal = () => {
		setShowFilter(true)
	}

	const scrolledHeader = () => {
        if (scrolledPage) {
            return 'labels-header-expanded'
        } else {
            return ''
        }
    }

	return <>
		<section className={`index-filter-section grid ${scrolledHeader()}`}>
			<section className="label-filter-section grid">
				<SvgSavedCmp
					folder={'labels'}
					svgNames={filterLists.filterLabels}
					handleChange={handleChange} />
			</section>
			<button className="flex align-center" onClick={openFilterModal}>
				<img src="./src/assets/svg/filter.svg" /> <span>Filters</span></button>
		</section>
		{showFilterModal && <FilterModal
			setShowFilter={setShowFilter}
			setStayFilter={setStayFilter}
			filterBy={filterBy}
		/>}
	</>
}