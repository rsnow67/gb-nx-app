import styles from './app.module.scss';
import NxWelcome from './nx-welcome';

import { Route, Link } from 'react-router-dom';
import News, { PeaceOfNews } from './news/news';
import CreateNews from './create-news/create-news';
import { createContext, useEffect, useState } from 'react';

export const NewsContext = createContext([] as PeaceOfNews[]);

export function App() {
  const [news, setNews] = useState([] as PeaceOfNews[]);

  useEffect(() => {
    fetch('http://localhost:3333/api/news')
      .then(response => response.json())
      .then(news => setNews(news));
  }, []);

  return (
    <>
      {/*<NxWelcome title="web" />*/}
      <div />

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Главная</Link>
          </li>
          <li>
            <Link to="/news">Новости</Link>
          </li>
          <li>
            <Link to="/create">Добавить новость</Link>
          </li>
        </ul>
      </div>
      <Route
        path="/"
        exact
        render={() => (
          <h1>Главная страница</h1>
        )}
      />
      <Route
        path="/news"
        exact
        render={() => (
          <NewsContext.Provider value={news}>
            <News />
          </NewsContext.Provider>
        )}
      />
      <Route
        path="/create"
        exact
        render={() => (
          <CreateNews />
        )}
      />
      {/* END: routes */}
    </>
  );
}

export default App;
