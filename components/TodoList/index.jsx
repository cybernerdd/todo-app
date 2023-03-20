import { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';

import TodoItem from '..//TodoItem';
import AddTodo from '../AddTodo';
import Filters from '../Filters';

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const [filters, setFilters] = useState({
    showCompleted: null,
    filterDueDate: null,
    filterCategory: null,
  });
  const [filtered, setFiltered] = useState(todos);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);

  useEffect(() => {
    setFiltered(todos);
  }, [todos]);

  const renderTodoItem = ({ item }) => <TodoItem item={item} />;

  return (
    <View style={styles.container}>
      {isNewTodoModalOpen && (
        <AddTodo setIsModalVisible={setIsNewTodoModalOpen} />
      )}
      {isFiltersOpen && (
        <Filters
          filters={filters}
          setFilters={setFilters}
          setTodos={setFiltered}
          setIsFiltersOpen={setIsFiltersOpen}
        />
      )}

      <View style={styles.headerContainer}>
        <Text
          style={styles.filters}
          onPress={() => setIsNewTodoModalOpen(true)}>
          Add New TODO
        </Text>
        <Text style={styles.filters} onPress={() => setIsFiltersOpen(true)}>
          Filters
        </Text>
      </View>

      <Text style={{ fontWeight: 'bold', fontSize: 18 }}>All TODO's</Text>
      <FlatList
        style={styles.list}
        data={filtered}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.empty}>No Todo's Found</Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 20 : 50,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  list: {
    flex: 1,
    marginTop: 10,
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  filters: {
    marginVertical: 10,
    color: '#007AFF',
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 5,
  },
});

export default TodoList;
