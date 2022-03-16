import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { City } from "../../City/entity/city";
import { v4 as uuidv4 } from "uuid";

export interface IClient {
  name: string;
  gender: string;
  birthDate: Date;
  age: number;
  city: string;
}

@Entity("client")
export class Client {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  gender: string;

  @Column()
  birthDate: Date;

  @Column()
  age: number;

  @ManyToOne((type) => City, (client) => Client)
  city: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
