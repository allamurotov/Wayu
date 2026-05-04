import { CreateNewsDto } from '../dto/create-news.dto';

export class CreateNewsCommand {
  constructor(public readonly createNewsDto: CreateNewsDto) {}
}
