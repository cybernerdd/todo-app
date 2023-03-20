import { useState } from 'react';
import { View, Alert, KeyboardAvoidingView } from 'react-native';
import { Button, Input, Text, Overlay } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';

import { addTodo } from '../../store/features/todoSlice';
import { useDispatch } from 'react-redux';

const AddTodo = ({ setIsModalVisible }) => {
  const [todoText, setTodoText] = useState('');
  const [todoDescription, setTodoDescription] = useState('');
  const [todoCategory, setTodoCategory] = useState('Personal');
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const dispatch = useDispatch();

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setSelectedDate(moment(date).format('MMM DD, YYYY'));
    hideDatePicker();
  };

  const handleAddTodo = () => {
    if (todoText.trim() && todoCategory && selectedDate) {
      dispatch(
        addTodo({
          id: Date.now().toString(),
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Overlay
        onBackdropPress={() => setIsModalVisible(false)}
        overlayStyle={{ width: '90%' }}
      >
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
            onValueChange={(itemValue, itemIndex) => setTodoCategory(itemValue)}
          >
            <Picker.Item label='Personal' value='Personal' />
            <Picker.Item label='Work' value='Work' />
          </Picker>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: '5%',
                flex: 1,
              }}
            >
              Due Date:
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: '5%',
                color: selectedDate ? '#00BFFF' : 'black',
              }}
              onPress={showDatePicker}
            >
              {selectedDate
                ? moment(selectedDate).format('MMM DD, YYYY')
                : 'Select Date'}
            </Text>
          </View>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

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
