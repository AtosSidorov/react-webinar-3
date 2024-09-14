/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      list: (initState.list || []).map(item => ({
        ...item,
        selectionCount: item.selectionCount || 0,
      })),
      selectedCode: null,
      nextCode: (initState.list || []).reduce((max, item) => Math.max(max, item.code), 0) + 1, // Инициализируем счетчик кодов
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
   * Генерация нового уникального кода
   * @returns {number}
   */
  getNextCode() {
    return this.state.nextCode++;
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.getNextCode();

    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: newCode, title: 'Новая запись', selectionCount: 0 },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    const filteredList = this.state.list.filter(item => item.code !== code);

    this.setState({
      ...this.state,
      list: filteredList,
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
