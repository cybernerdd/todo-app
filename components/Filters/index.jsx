import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Overlay } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

const Filters = ({ filters, setFilters, setTodos, setIsFiltersOpen }) => {
  const [dueDatePickerVisible, setDueDatePickerVisible] = useState(false);
  const storeTodos = useSelector((state) => state.todos);

  const handleApplyFilters = () => {
    const filteredTodos = storeTodos.filter((todo) => {
      if (
        filters.showCompleted !== null &&
        todo.isCompleted !== filters.showCompleted
      ) {
        return false;
      }
      if (
        filters.filterDueDate &&
        moment(todo.dueDate, 'YYYY/MM/DD')
          .startOf('day')
          .diff(moment(filters.filterDueDate).startOf('day'), 'days') !== 0
      ) {
        return false;
      }
      if (filters.filterCategory && todo.category !== filters.filterCategory) {
        return false;
      }
      return true;
    });
    setTodos(filteredTodos);
    setIsFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setFilters({
      showCompleted: null,
      filterDueDate: null,
      filterCategory: null,
    });
    setTodos(storeTodos);
    setIsFiltersOpen(false);
  };

  const renderDueDatePicker = () => {
    if (!dueDatePickerVisible) {
      return null;
    }
    return (
      <DateTimePicker
        value={filters.filterDueDate || new Date()}
        mode='date'
        display='default'
        onChange={(event, date) => {
          if (event.type === 'set') {
            setFilters((prev) => ({ ...prev, filterDueDate: date }));
            setDueDatePickerVisible(false);
          }
        }}
      />
    );
  };

  return (
    <Overlay
      style={styles.container}
      overlayStyle={{ width: '90%' }}
      onBackdropPress={() => setIsFiltersOpen(false)}
    >
      <View>
        {/* status filters */}
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginLeft: '5%',
              marginBottom: 15,
            }}
          >
            Filter by Status
          </Text>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            <TouchableOpacity
              style={[
                styles.filterOptionButton,
                filters.showCompleted === null && {
                  backgroundColor: '#00BFFF',
                },
              ]}
              onPress={() =>
                setFilters((prev) => ({ ...prev, showCompleted: null }))
              }
            >
              <Text style={styles.filterOptionText}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOptionButton,
                filters.showCompleted === false && {
                  backgroundColor: '#00BFFF',
                },
              ]}
              onPress={() =>
                setFilters((prev) => ({ ...prev, showCompleted: false }))
              }
            >
              <Text style={styles.filterOptionText}>Remaining</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterOptionButton,
                filters.showCompleted === true && {
                  backgroundColor: '#00BFFF',
                },
              ]}
              onPress={() =>
                setFilters((prev) => ({ ...prev, showCompleted: true }))
              }
            >
              <Text style={styles.filterOptionText}>Completed</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* date filters */}
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginLeft: '5%',
              marginTop: 10,
              marginBottom: 15,
            }}
          >
            Filter by Date
          </Text>
          <View style={{ paddingHorizontal: 10 }}>
            <TouchableOpacity
              style={[
                styles.filterOptionButton,
                filters.filterDueDate && { backgroundColor: '#00BFFF' },
              ]}
              onPress={() => setDueDatePickerVisible(true)}
            >
              <Text style={styles.filterOptionText}>
                {filters.filterDueDate
                  ? moment(filters.filterDueDate).format('MMM DD, YYYY')
                  : 'Due Date'}
              </Text>
            </TouchableOpacity>
            {renderDueDatePicker()}
          </View>
        </View>

        {/* category */}
        <View>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              marginLeft: '5%',
              marginTop: 10,
            }}
          >
            Filter by Category
          </Text>
          <View style={{ paddingHorizontal: 10 }}>
            <Picker
              selectedValue={filters.filterCategory}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, filterCategory: value }))
              }
            >
              <Picker.Item label='All' value={null} />
              <Picker.Item label='Personal' value='Personal' />
              <Picker.Item label='Work' value='Work' />
            </Picker>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={handleClearFilters}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={handleApplyFilters}
          >
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterOptionButton: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  filterOptionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  filterPicker: {
    height: 40,
    width: '100%',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  clearButton: {
    backgroundColor: '#d3d3d3',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Filters;
