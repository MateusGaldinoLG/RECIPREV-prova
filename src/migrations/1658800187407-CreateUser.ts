import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUser1658800187407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'text',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'text',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'text',
                        isNullable: false
                    }, 
                    {
                        name: 'isAdmin',
                        type: 'boolean',
                        default: 'FALSE',
                        isNullable: false
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
