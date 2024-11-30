import { useState } from "react";

export const SortFilterFunctions = () => {
    // States
    const [sortBy, setSortBy] = useState("");
    const [direction, setDirection] = useState("asc");
    const [filters, setFilters] = useState([]);
    const [filterValues, setFilterValues] = useState({});

    // Available filters (can be modified per use case)
    const availableFilters = [
        "price",
        "salt",
        "fat",
        "protein",
        "carbs",
        "fiber",
        "weight",
    ];

    // Apply sorting to a given array of products
    const applySorting = (products) => {
        if (!sortBy) return products; // Return original array if no sorting is applied

        return [...products].sort((a, b) => {
            if (direction === "asc") return a[sortBy] - b[sortBy];
            else return b[sortBy] - a[sortBy];
        });
    };

    // Apply filtering to a given array of products
    const applyFiltering = (products) => {
        let filtered = [...products];
        filters.forEach((filter) => {
            const min = filterValues[`${filter}_min`] || 0;
            const max = filterValues[`${filter}_max`] || Infinity;
            filtered = filtered.filter(
                (product) => product[filter] >= min && product[filter] <= max
            );
        });
        return filtered;
    };

    // Add a new filter to the list
    const handleAddFilter = (filter) => {
        if (!filters.includes(filter)) {
            setFilters([...filters, filter]);
        }
    };

    // Remove a filter from the list
    const handleRemoveFilter = (filter) => {
        setFilters(filters.filter((f) => f !== filter));
        const newFilterValues = { ...filterValues };
        delete newFilterValues[`${filter}_min`];
        delete newFilterValues[`${filter}_max`];
        setFilterValues(newFilterValues);
        applyFiltering();
    };


    let debounceTimer;

    const handleFilterChange = (filter, type, value) => {
        clearTimeout(debounceTimer);

        if (value === "") {
            setFilterValues((prev) => ({
                ...prev,
                [`${filter}_${type}`]: null,
            }));
            return;
        }

        if (value.match(/^\d*\.?\d{0,2}$/)) {
            setFilterValues((prev) => ({
                ...prev,
                [`${filter}_${type}`]: value,
            }));

            debounceTimer = setTimeout(() => {
                if (value.endsWith('.')) {
                    return;
                }

                const numericValue = Math.max(0, Number(value));
                setFilterValues((prev) => ({
                    ...prev,
                    [`${filter}_${type}`]: numericValue.toString(),
                }));
            }, 200);
        }
    };

    return {
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
        applySorting,
        applyFiltering,
    };
};