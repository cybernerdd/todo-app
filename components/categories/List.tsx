import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { removeCategory } from '../../store/features/categoriesSlice';
import { RootState } from '../../store/store';
import { ICategory } from '../../interfaces';

/**
 * Component for listing the categories
 *
 * @component
 * @example
 *
 * return <CategoriesList />
 *
 * @returns {ReactElement}
 * @author Faizan Ahmad <a-f.a@outlook.com>
 * @version 1.0.0
 */

const CategoriesList = () => {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: RootState) => state.categories.categories
  );

  const handleDelete = (id: number) => {
    dispatch(removeCategory(id));
  };

  const renderItem = ({ item }: { item: ICategory }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.categoryName}>{item.label}</Text>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryName: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#f00',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default CategoriesList;
