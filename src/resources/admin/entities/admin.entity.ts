import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export class Admin extends Utilizador {
  @Column({ type: 'char', length: 50 })
  position: string;

  // @ManyToOne(() => Utilizador, (utilizador) => utilizador.admin)
  // utilizador: Utilizador;

  constructor(admin: Partial<Admin>, utilizador: Partial<Utilizador>) {
    super(utilizador);
    Object.assign(this, admin);
  }
}
