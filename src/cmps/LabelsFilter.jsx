import { useEffect, useState } from "react"

import { SvgCmp } from "./SvgCmp"
import { FilterModal } from './FilterModal'

export function LabelsFilter({ onSetFilter, filterBy }) {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
	const [showFilterModal, setShowFilter] = useState(false)

	const filterLabels = ['iconic_cities', 'new', 'off-the-grid', 'rooms', 'creative_spaces', 'boats', 'grand_pianos', 'vineyards', 'historical_homes', 'mansions', 'lake', 'bed_&_breakfasts', 'treehouses', 'farms', 'skiing', 'earth_homes', 'countryside', 'amazing_views', 'beach', 'desert', 'a-frames',
		'design', 'beachfront', 'caves', 'national_parks', 'castles', 'lakefront', 'islands', 'trulli', 'tropical', 'cabins', 'campers', 'camping', 'arctic', 'tiny_homes', 'surfing', 'barns', 'cycladic_homes', 'hanoks', 'ryokans', 'domes', 'shepard_huts', 'yurts', 'minsus', 'casas_particulares']

	useEffect(() => {
		onSetFilter(filterByToEdit)
	}, [filterByToEdit])

	function handleChange(label) {
		setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, ['labels']: [label] }))
	}

	const openFilterModal = () => {
		setShowFilter(true)
	}

	return <>
		<section className="index-filter-section grid align-center">
			<section className="label-filter-section grid">
				<SvgCmp
					svgNames={filterLabels}
					handleChange={handleChange} />
			</section>
			<button className="flex align-center space-evenly" onClick={openFilterModal}>
				<img src="./src/assets/svg/filter.svg" /> Filters</button>
		</section>
		{showFilterModal && <FilterModal
			setShowFilter={setShowFilter}
			onSetFilter={onSetFilter}
			filterBy={filterBy}
		/>}
	</>
}