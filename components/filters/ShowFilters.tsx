import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Filters } from '../../interfaces';

/**
 * Component that lists the applied filters
 *
 * @component
 * @example
 *
 * return <ShowFilters filters={filters} onClearFilters={onClearFilters} />
 *
 * @returns {ReactElement}
 * @author Faizan Ahmad <a-f.a@outlook.com>
 * @version 1.0.0
 */

const ShowFilters = ({
  filters,
  onClearFilters,
}: {
  filters: Filters;
  onClearFilters: () => void;
}) => {
  const hasFiltersApplied =
    filters.showCompleted !== null ||
    filters.filterDueDate ||
    filters.filterCategory;

  if (!hasFiltersApplied) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Applied Filters</Text>
        <TouchableOpacity style={styles.clearButton} onPress={onClearFilters}>
          <Text style={styles.clearButtonText}>Clear Filters</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filtersContainer}>
        {filters.showCompleted !== null && (
          <View style={styles.filter}>
            <Text style={styles.filterText}>
              {filters.showCompleted === null
                ? 'All'
                : filters.showCompleted === false
                ? 'Remaining'
                : 'Completed'}
            </Text>
          </View>
        )}

        {filters.filterDueDate && (
          <View style={styles.filter}>
            <Text style={styles.filterText}>{filters.filterDueDate}</Text>
          </View>
        )}

        {filters.filterCategory && (
          <View style={styles.filter}>
            <Text style={styles.filterText}>
              {filters.filterCategory === null ? 'All' : filters.filterCategory}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 10,
    width: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -20,
  },
  heading: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filter: {
    padding: 5,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 50,
    minWidth: 50,
    marginRight: 15,
  },
  filterText: {
    color: 'white',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#C4C4C4',
    padding: 5,
    borderRadius: 50,
    minWidth: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clearButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ShowFilters;
