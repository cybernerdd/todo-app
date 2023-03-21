import { useState } from 'react';
import { View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Input, Text, Overlay } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

import { addTodo } from '../../store/features/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IAddTodoProps, ICategory } from '../../interfaces';
import { RootState } from '../../store/store';

/**
 * Component that shows modal to add todos
 *
 * @component
 * @example
 *
 * return <AddTodo setIsModalVisible={setIsModalVisible} />
 *
 * @returns {ReactElement}
 * @author Faizan Ahmad <a-f.a@outlook.com>
 * @version 1.0.0
 */

const AddTodo = ({ setIsModalVisible }: IAddTodoProps) => {
  const [todoText, setTodoText] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoCategory, setTodoCategory] = useState('Personal');
  const [selectedDate, setSelectedDate] = useState(
    moment(new Date()).format('YYYY-MM-DD')
  );
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );
  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const handleAddTodo = () => {
    if (todoText.trim() && todoCategory && selectedDate) {
      dispatch(
        addTodo({
          text: todoText.trim(),
          description: todoDescription.trim(),
          category: todoCategory,
          dueDate: selectedDate,
          isCompleted: false,
        })
      );
      setTodoText('');
      setTodoDescription('');
      setTodoCategory('Personal');
      setSelectedDate('');
      setIsModalVisible(false);
    } else {
      Alert.alert('Error', 'Please fill out all the fields');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Overlay
        isVisible={true}
        onBackdropPress={() => setIsModalVisible(false)}
        overlayStyle={{ width: '90%' }}>
        <View>
          <Input
            placeholder='Enter Todo'
            value={todoText}
            onChangeText={setTodoText}
          />
          <Input
            placeholder='Enter Description'
            value={todoDescription}
            onChangeText={setTodoDescription}
          />
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: '5%' }}>
            Category:
          </Text>
          <Picker
            selectedValue={todoCategory}
            onValueChange={(itemValue) => setTodoCategory(itemValue)}>
            {categories.map((item: ICategory) => (
              <Picker.Item
                key={item.id}
                label={item.label}
                value={item.value}
              />
            ))}
          </Picker>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: '5%',
                flex: 1,
              }}>
              Due Date:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: '5%',
                color: selectedDate ? '#00BFFF' : 'black',
              }}
              onPress={showDatePicker}>
              {selectedDate
                ? moment(selectedDate).format('YYYY-MM-DD')
                : 'Select Date'}
            </Text>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Button title='Add Todo' onPress={handleAddTodo} />
        </View>
      </Overlay>
    </KeyboardAvoidingView>
  );
};

export default AddTodo;
