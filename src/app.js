import React from 'react';
import './styles.css';

/**
 * Универсальная функция для склонения слова в зависимости от числа
 * @param count {number} - Число, к которому нужно применить склонение
 * @param forms {string[]} - Массив форм слова: ['единственная форма', 'множественная форма для 2-4', 'множественная форма для 5 и больше']
 * @returns {string} - Правильная форма слова
 */
function pluralize(count, forms) {
  const remainder10 = count % 10;
  const remainder100 = count % 100;

  if (remainder10 === 1 && remainder100 !== 11) {
    return forms[0]; // для числа, оканчивающегося на 1 (кроме 11)
  } else if (remainder10 >= 2 && remainder10 <= 4 && (remainder100 < 12 || remainder100 > 14)) {
    return forms[1]; // для чисел 2-4 (кроме 12-14)
  } else {
    return forms[2]; // для чисел 5 и выше
  }
}

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">{item.title}</div>
                <div className="Item-selection-info">
                  {item.selectionCount > 0 && (
                    <span className="Item-selection-text">
                      Выделяли {item.selectionCount} {pluralize(item.selectionCount, ['раз', 'раза', 'раз'])}
                    </span>
                  )}
                </div>
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
