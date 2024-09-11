/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    // Инициализируем maxCode как максимальный код из начального списка или 0, если список пуст
    const initialMaxCode = (initState.list || []).reduce((max, item) => Math.max(max, item.code), 0);

    this.state = {
      ...initState,
      selectedCode: null, // Добавляем состояние для хранения кода выбранной записи
      maxCode: initialMaxCode, // Хранение максимального кода
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
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
    // Вызываем всех слушателей
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
        // Переключаем выделение только если запись уже выделена
        item.selected = !item.selected;
        // Увеличиваем счетчик выделений
        item.selectionCount = item.selected ? item.selectionCount + 1 : item.selectionCount;
      } else {
        // Сбрасываем выделение для всех других записей
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
