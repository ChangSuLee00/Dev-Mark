import { Injectable } from '@nestjs/common';
import { boolean } from 'joi';
import { UserEntity } from 'src/user/entities/user.entity';
import { CreateFeedDto } from './dto/create-feed.dto';
import { FeedRepository } from './repository/feed.repository';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}

  async create(body: CreateFeedDto) {
    const createdFeed = await this.feedRepository.createFeed(body);
    return { status: 201, success: true };
  }

  async findPage(query: { id: number; search: string }) {
    const pagenatedFeeds = await this.feedRepository.pagenateFeed(query);
    return pagenatedFeeds;
  }

  async remove(user: UserEntity, id: number) {
    const deleteFeed = await this.feedRepository.deleteFeed(user, id);
    return { status: 201, success: true };
  }
}
