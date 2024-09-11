/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    const initialMaxCode = (initState.list || []).reduce((max, item) => Math.max(max, item.code), 0);
    const initialList = (initState.list || []).map(item => ({
      ...item,
      selectionCount: item.selectionCount || 0, 
    }));

    this.state = {
      ...initState,
      list: initialList,
      selectedCode: null,
      maxCode: initialMaxCode, 
    };
    this.listeners = []; 
  }

  /**
   * @param listener {Function}
   * @returns {Function} 
   */
  subscribe(listener) {
    this.listeners.push(listener);
      return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.state.maxCode + 1;

    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: newCode, title: 'Новая запись', selectionCount: 0 }, // Добавляем поле selectionCount
      ],
      maxCode: newCode,
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const filteredList = this.state.list.filter(item => item.code !== code);
    const maxCode = filteredList.length > 0
      ? Math.max(...filteredList.map(item => item.code))
      : 0;

    this.setState({
      ...this.state,
      list: filteredList,
      maxCode: maxCode,
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    const selectedCode = this.state.selectedCode === code ? null : code;
    const list = this.state.list.map(item => {
      if (item.code === code) {
        item.selected = !item.selected;
        item.selectionCount = item.selected ? item.selectionCount + 1 : item.selectionCount;
      } else {
        item.selected = false;
      }
      return item;
    });

    this.setState({
      ...this.state,
      list: list,
      selectedCode: selectedCode,
    });
  }
}

export default Store;
