import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import CategoryForm from '../../components/categories/CategoryForm';
import CategoryList from '../../components/categories/List';

const CategoriesScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.form}>
          <CategoryForm />
        </View>
        <View style={styles.list}>
          <CategoryList />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  header: {
    height: 90,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    marginTop: -20,
  },
  form: {
    marginBottom: 20,
  },
  list: {
    flex: 1,
  },
});

export default CategoriesScreen;
