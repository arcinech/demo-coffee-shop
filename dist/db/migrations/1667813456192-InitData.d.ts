import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class InitData1667813456192 implements MigrationInterface {
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
    private saveTags;
    private imageNames;
    private saveProducts;
}
