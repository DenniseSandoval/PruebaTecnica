import { Column, Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn} from "typeorm";
import { Account } from "./Account";
import { Person } from "./Person";

@Entity()
export class Client extends Person{
  @PrimaryGeneratedColumn()
  clientId: string

  @Column({})
  password: string

  @Column({})
  state: boolean

  @OneToOne(type => Person, person => person.client)
  @JoinColumn()
    person: Person;

  @OneToMany (() => Account, account => account.client)
    accounts: Account[];
}
