// src/app/main/index.js
import React, { memo, useCallback, useEffect, useState } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import Pagination from '../../components/pagination';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import localeContext from '../../store/localecontext';




function Main() {
  const store = useStore();
  const { translations, switchLanguage } = useLocale();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    store.actions.catalog.load(currentPage); 
  }, [currentPage, store.actions.catalog]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    total: state.catalog.total,
  }));

  const totalPages = Math.ceil(select.total / itemsPerPage);

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title={translations.title} />

      <BasketTool 
        onOpen={callbacks.openModalBasket} 
        amount={select.amount} 
        sum={select.sum} 
        showButton={true} 
        showBackLink={false} 
      />

      <List list={select.list} renderItem={renders.item} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={setCurrentPage} 
      />

      {/* Переключатели языков */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button onClick={() => switchLanguage('ru')}>Русский</button>
        <button onClick={() => switchLanguage('en')}>English</button>
      </div>
    </PageLayout>
  );
}

export default memo(Main);
