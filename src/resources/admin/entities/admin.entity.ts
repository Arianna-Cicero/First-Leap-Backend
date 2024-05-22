import { Column, Entity, ManyToOne } from 'typeorm';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';

@Entity('admin')
export class Admin extends Utilizador {
  @Column({ type: 'char', length: 50 })
  position: string;

  @ManyToOne(() => Utilizador, { cascade: true, eager: true })
  utilizador: Utilizador;

  constructor(admin: Partial<Admin>, utilizador: Partial<Utilizador>) {
    super(utilizador);
    Object.assign(this, admin);
  }
}
