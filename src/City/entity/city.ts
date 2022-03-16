import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Client } from "../../Client/entity/client";

@Entity("city")
export class City {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  state: string;

  @OneToMany((type) => Client, (city) => City, { cascade: true })
  client: Client[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}
