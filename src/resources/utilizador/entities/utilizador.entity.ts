import { Emailverification } from 'src/resources/emailverification/entities/emailverification.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Utilizador {
  @PrimaryGeneratedColumn()
  User_id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  permisson: number;

  @Column({ nullable: false })
  number: number;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  birth_date: Date;

  @ManyToOne(
    () => Emailverification,
    (emailverificaiton) => emailverificaiton.utilizador,
  )
  emailverification: Emailverification;

  constructor(utilizador: Partial<Utilizador>) {
    Object.assign(this, utilizador);
  }
}
