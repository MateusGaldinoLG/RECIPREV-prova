import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateOperation1658963084859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'operations',
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true, 
                    },
                    {
                        name: 'CNPJ',
                        type: 'text'
                    }, 
                    {
                        name: 'razao_social',
                        type: 'text'
                    },
                    {
                        name: 'tipo',
                        type: 'text'
                    },
                    {
                        name: 'date',
                        type: 'text',
                        default: `DATE('now')`
                    },
                    {
                        name: 'num_cotas',
                        type: 'integer',
                    },
                    {
                        name: 'valor_unitario',
                        type: 'real'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
