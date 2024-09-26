import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      total: 0, // Общее количество товаров
      currentPage: 1, // Текущая страница
      itemsPerPage: 10, // Количество товаров на странице
    };
  }

  // Метод для загрузки товаров с учетом страницы
  async load(page = 1) {
    const { itemsPerPage } = this.getState();
    const skip = (page - 1) * itemsPerPage;
    const limit = itemsPerPage;
  
    try {
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`);
      const json = await response.json();
      
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          total: json.result.count, // Устанавливаем общее количество товаров
          currentPage: page, // Установка текущей страницы
        },
        'Загружены товары из АПИ',
      );
    } catch (error) {
      console.error("Ошибка при загрузке товаров:", error);
    }
  }

  // Метод для изменения страницы
  setPage(page) {
    this.load(page);
  }
}

export default Catalog;
