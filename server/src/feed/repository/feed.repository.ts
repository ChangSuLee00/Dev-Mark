import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FeedEntity } from '../entities/feed.entity';

@Injectable()
export class FeedRepository {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
  ) {}

  async createFeed(feed) {
    try {
      const image = feed.img ? feed.img.url : '';
      const feed_order = {
        ...feed,
        user: { id: parseInt(feed.user_id) },
        img: image,
        // box property 뿐 아니라 user property로 포함한다.
      };
      const result = await this.feedRepository.save(feed_order);
    } catch (error) {
      throw new InternalServerErrorException('error while saving Feed');
      // 내부 서버 에러 500}
    }
  }
}
