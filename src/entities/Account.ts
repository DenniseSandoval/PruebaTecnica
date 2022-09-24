import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { Client } from "./Client";
import { Movement } from "./Movement";

@Entity()
export class Account extends BaseEntity{
  @PrimaryGeneratedColumn()
  accountId: string

  @Column()
  accountNumber: string

  @Column()
  accountType: string

  @Column()
  initialBalance: number

  @Column()
  state: string

  @ManyToOne(()=> Client, client=>client.accounts)
  @JoinColumn({name: 'client_id'})
  client: Client;

  @OneToMany (() => Movement, movement => movement.account)
    movements: Movement[];
}
