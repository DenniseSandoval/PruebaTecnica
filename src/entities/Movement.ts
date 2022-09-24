import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn} from "typeorm";
import { Account } from "./Account";

@Entity()
export class Movement extends BaseEntity{
  @PrimaryGeneratedColumn()
  movementId: string

  @Column({type: 'date'})
  date: Date

  @Column()
  movementType: string

  @Column()
  value: number

  @Column()
  balance: number

  @ManyToOne(()=> Account, account=>account.movements)
  @JoinColumn({name: 'account_id'})
  account: Account;
}
