export function CheckboxGroup({ type, items, selectedValues = [], handleChange }) {
    console.log(selectedValues)
    return (
        <div className="checkbox-group grid">
            {items.map((item) => (
                <div key={item.value} className="checkbox-item">
                    <input
                        type="checkbox"
                        id={item.value}
                        value={item.value}
                        checked={selectedValues.includes(item.value)}
                        onChange={() => handleChange(type, item.value)}
                    />
                    <label htmlFor={item.value}>{item.label || item.value}</label>
                </div>
            ))}
        </div>
    )
}