import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('operations')
export class Operation{

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    cnpj: string;

    @Column()
    razao_social: string;

    @Column()
    tipo: string;

    @CreateDateColumn({
        default: () => `DATE('now')`
    })
    date: string;

    @Column()
    num_cotas: number;

    @Column()
    valor_unitario: number;
}