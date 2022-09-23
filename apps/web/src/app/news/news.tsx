import './news.module.scss';
import { useContext } from 'react';
import { NewsContext } from '../app';

/* eslint-disable-next-line */
export interface NewsProps { }
export interface PeaceOfNews {
  id: number,
  title: string,
  description: string,
  createdAt: number
}

export function News(props: NewsProps) {
  const sortNews = (news: PeaceOfNews[]) => {
    return news.sort((a, b) => a.createdAt - b.createdAt)
  }

  const fetchedNews = useContext(NewsContext);
  const news = sortNews(fetchedNews);

  return (
    <div>
      <h1>Последние новости</h1>
      <ul>
        {news.map(peaceOfNews => {
          return <li key={peaceOfNews.id}>
            <h2>{peaceOfNews.title}</h2>
            <p>{peaceOfNews.description}</p>
            <hr />
          </li>
        })}
      </ul>
    </div>
  );
}

export default News;
