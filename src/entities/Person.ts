import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToOne} from "typeorm";
import { Client } from "./Client";
@Entity()
export class Person extends BaseEntity {
  @PrimaryGeneratedColumn()
  personId: string;

  @Column()
  name: string;

  @Column({nullable:true})
  gender: string;

  @Column({nullable:true})
  age: number;

  @Column({nullable:true})
  id: string;

  @Column({nullable:true})
  address: string;

  @Column({nullable:true})
  phone: string;

  @OneToOne(type => Client, client => client.person,{
    cascade: true,
  })
    client: Client;
}
