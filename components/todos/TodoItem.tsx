import { useDispatch } from 'react-redux';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { View } from '../Themed';
import Icon from 'react-native-vector-icons/Entypo';
import { Badge } from 'react-native-elements';

import { removeTodo, toggleTodo } from '../../store/features/todoSlice';
import { ITodoItemProps } from '../../interfaces';

/**
 * Component that shows single todo item
 *
 * @component
 * @example
 *
 * return <TodoItem item={item} />
 *
 * @returns {ReactElement}
 * @author Faizan Ahmad <a-f.a@outlook.com>
 * @version 1.0.0
 */

const TodoItem = ({ item }: ITodoItemProps) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.todo}>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => dispatch(toggleTodo(item.id))}>
        {item.isCompleted ? (
          <Text style={styles.checkmark}>✓</Text>
        ) : (
          <Text style={styles.uncheckedBox}> </Text>
        )}
      </TouchableOpacity>
      <View style={styles.todoDetails}>
        <Text
          style={[
            styles.todoText,
            item.isCompleted && styles.completedTodoText,
          ]}>
          {item.text}
        </Text>
        {item.description && (
          <Text style={styles.todoDescription}>{item.description}</Text>
        )}
        <View style={styles.badgeContainer}>
          <Badge value={item.category} badgeStyle={styles.categoryBadge} />
          {item.dueDate && (
            <Badge
              value={item.dueDate}
              badgeStyle={styles.dueDateBadge}
              textStyle={styles.dueDateBadgeText}
            />
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeTodo(item.id))}
        style={styles.deleteButton}>
        <Icon name='cross' size={24} color='#FF5722' />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 10,
    paddingVertical: 8,
  },
  checkbox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    width: 20,
    height: 20,
    padding: 3,
  },
  checkmark: {
    fontSize: 16,
    color: 'green',
    backgroundColor: 'green',
  },
  todoDetails: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
  },
  completedTodoText: {
    textDecorationLine: 'line-through',
    color: '#ccc',
  },
  uncheckedBox: {
    backgroundColor: 'white',
  },
  todoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    marginRight: 5,
  },
  dueDateBadge: {
    backgroundColor: '#E83151',
  },
  dueDateBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    marginLeft: 10,
  },
});

export default TodoItem;
