export interface ITodo {
  id: string;
  text: string;
  description?: string;
  category: string;
  dueDate: string;
  isCompleted: boolean;
}

export interface ICategory {
  id: number;
  label: string;
  value: string;
}

export interface IAddTodoProps {
  setIsModalVisible: (visible: boolean) => void;
}

export interface ITodoItemProps {
  item: ITodo;
}

export interface Filters {
  showCompleted: boolean | null;
  filterDueDate: string | null;
  filterCategory: string | null;
}

export interface IFilters {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
  setIsFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
