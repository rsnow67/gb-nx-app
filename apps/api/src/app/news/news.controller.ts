import {
  Body,
  CACHE_MANAGER,
  Controller,
  Get,
  Header,
  Inject,
  Post
} from '@nestjs/common';
import { Cache } from 'cache-manager';

import { IsNotEmpty } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

@Controller('news')
export class NewsController {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  @Get()
  async getNews() {
    const cachedNews = await this.cacheManager.get('news');

    if (!cachedNews) {
      return new Promise(resolve => {
        const news = Object.keys([...Array(20)])
          .map(key => Number(key) + 1)
          .map(n => ({
            id: n,
            title: `Важная новость ${n}`,
            description: (rand => ([...Array(rand(1000))].map(() => rand(10 ** 16).toString(36).substring(rand(10))).join(' ')))(max => Math.ceil(Math.random() * max)),
            createdAt: Date.now()
          }))

        this.cacheManager.set('news', news, { ttl: 0 });

        setTimeout(() => {
          resolve(news);
        }, 100)
      });
    }

    return new Promise(resolve => {
      setTimeout(() => {
        resolve(cachedNews);
      }, 100);
    })
  }

  @Post()
  @Header('Cache-Control', 'none')
  create(@Body() peaceOfNews: CreateNewsDto) {
    return new Promise(resolve => {
      setTimeout(() => {
        console.log('Новость успешно создана', peaceOfNews);
        resolve({
          id: Math.ceil(Math.random() * 1000),
          ...peaceOfNews
        });
      }, 100)
    });
  }
}
