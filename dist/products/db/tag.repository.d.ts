import { Tag } from './tag.entity';
export declare const TagRepository: import("typeorm").Repository<Tag> & {
    findTagsByName(names: string[]): Promise<Tag[]>;
};
