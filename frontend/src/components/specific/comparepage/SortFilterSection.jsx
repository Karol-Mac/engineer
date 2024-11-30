import {useEffect, useState} from "react";
import styles from "../../../css/CompareProductpage.module.css";

const SortFilterSection = ({
                               sortBy,
                               setSortBy,
                               direction,
                               setDirection,
                               filters,
                               availableFilters,
                               filterValues,
                               handleAddFilter,
                               handleRemoveFilter,
                               handleFilterChange,
                               onApplySortAndFilter,
                           }) => {

    const [removeFilterReset, setRemoveFilterReset] = useState(false);
    const handleFilterRemoval = (filter) => {
        setRemoveFilterReset(true);
        handleRemoveFilter(filter)
    }

    useEffect(() => {
        setRemoveFilterReset(false);
    }, [removeFilterReset]);

    return (
        <div className={styles.filtersContainer}>
            <div className={styles.sortContainer}>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Select Sort By</option>
                    <option value="price">Price</option>
                    <option value="pricePer100g">Price per 100 g</option>
                    <option value="weight">Weight</option>
                    <option value="energeticValue">Energetic Value</option>
                    <option value="carbs">Carbs</option>
                    <option value="fat">Fat</option>
                    <option value="protein">Protein</option>
                    <option value="fiber">Fiber</option>
                    <option value="salt">Salt</option>
                </select>
                <select value={direction} onChange={(e) => setDirection(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <button onClick={onApplySortAndFilter}>Apply Sort</button>
            </div>

            <div className={styles.filters}>
                <select
                    onChange={(e) => {
                        if (e.target.value) handleAddFilter(e.target.value);
                    }}
                >
                    <option value="">Add Filter</option>
                    {availableFilters.map((filter) => (
                        <option key={filter} value={filter}>
                            {filter.charAt(0).toUpperCase() + filter.slice(1)}
                        </option>
                    ))}
                </select>
                {filters.map((filter) => (
                    <div key={filter} className={styles.filterRow}>
                        <span
                            className={styles.filterLabel}
                            // onClick={() => handleRemoveFilter(filter)}
                            onClick={() => handleFilterRemoval(filter)}
                            title="Remove filter"
                        >
                            {filter.charAt(0).toUpperCase() + filter.slice(1)} ✖
                        </span>
                        <input
                            type="text"
                            placeholder="Min"
                            className={styles.inputField}
                            onChange={(e) => handleFilterChange(filter, "min", e.target.value)}
                            value={filterValues[`${filter}_min`] || ""}
                        />
                        <input
                            type="text"
                            placeholder="Max"
                            className={styles.inputField}
                            onChange={(e) => handleFilterChange(filter, "max", e.target.value)}
                            value={filterValues[`${filter}_max`] || ""}
                        />
                    </div>
                ))}
                <button onClick={onApplySortAndFilter}>Apply Filters</button>
            </div>
        </div>
    );
};

export default SortFilterSection;
