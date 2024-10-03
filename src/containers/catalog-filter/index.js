import { memo, useCallback, useMemo, useEffect, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();
  const [categories, setCategories] = useState([]);

  // Функция для формирования иерархии категорий
  function formatCategories(categories) {
    const map = {};
    categories.forEach(cat => {
      map[cat._id] = { ...cat, children: [] };  
    });
    const result = [];
    categories.forEach(cat => {
      if (cat.parent && map[cat.parent._id]) {
        map[cat.parent._id].children.push(map[cat._id]);  
      } else {
        result.push(map[cat._id]);  
      }
    });
    return result;
  }


  function flattenCategories(categories, level = 0) {
    return categories.reduce((acc, cat) => {
      
      const prefix = '- '.repeat(level).trim();  
      acc.push({
        value: cat._id,
        title: `${prefix} ${cat.title}`,  
      });
      if (cat.children && cat.children.length > 0) {
        acc = acc.concat(flattenCategories(cat.children, level + 1));  
      }
      return acc;
    }, []);
  }
  
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json = await response.json();
        const hierarchicalCategories = formatCategories(json.result.items);  
        const formattedCategories = flattenCategories(hierarchicalCategories);  
        setCategories([{ value: 'all', title: 'Все' }, ...formattedCategories]);
      } catch (error) {
        console.error('Ошибка при загрузке категорий:', error);
      }
    }
  
    fetchCategories();
  }, []);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category || 'all',  
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс фильтров
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Фильтр по категории
    onCategoryChange: useCallback(category => {
      store.actions.catalog.setParams({ category, page: 1 });  
    }, [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">

      <Select options={categories} value={select.category} onChange={callbacks.onCategoryChange} />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />

      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />

      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
