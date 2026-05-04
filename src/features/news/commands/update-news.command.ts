import { UpdateNewsDto } from '../dto/update-news.dto';

export class UpdateNewsCommand {
  constructor(public readonly id: number, public readonly updateNewsDto: UpdateNewsDto) {}
}
