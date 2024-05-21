import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn({ type: 'int' })
  admin_id: number;

  @Column({ type: 'char', length: 50 })
  position: string;

  @ManyToOne(() => Utilizador, (utilizador) => utilizador.admin)
  utilizador: Utilizador;

  // constructor(admin: Partial<Admin>, utilizador: Partial<Utilizador>) {
  //   super(utilizador);
  //   Object.assign(this, admin);
  // }
}
