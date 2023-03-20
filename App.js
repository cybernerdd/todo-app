import { Provider } from 'react-redux';

import store from './store/store';
import TodoList from './components/TodoList';

const App = () => {
  return (
    <Provider store={store}>
      <TodoList />
    </Provider>
  );
};

export default App;
