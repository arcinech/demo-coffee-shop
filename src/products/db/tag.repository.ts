import { In } from 'typeorm';
import { Tag } from './tag.entity';
import { dataSource } from '../../db/data-source';

export const TagRepository = dataSource.getRepository(Tag).extend({
  findTagsByName(names: string[]): Promise<Tag[]> {
    return this.find({
      where: {
        name: In(names),
      },
    });
  },
});
