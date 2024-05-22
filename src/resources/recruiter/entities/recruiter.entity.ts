import { Company } from 'src/resources/company/entities/company.entity';
import { JobOffer } from 'src/resources/job_offer/entities/job_offer.entity';
import { SelectionProcess } from 'src/resources/selection_process/entities/selection_process.entity';
import { Utilizador } from 'src/resources/utilizador/entities/utilizador.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('recruiter')
export class Recruiter extends Utilizador {
  @Column({ type: 'char', length: 50 })
  company: string;

  @Column({ type: 'char', length: 50 })
  position: string;

  @ManyToOne(() => Utilizador, { cascade: true, eager: true })
  utilizador: Utilizador;

  @OneToMany(
    () => SelectionProcess,
    (selectionProcess) => selectionProcess.recruiter,
  )
  selectionProcess: SelectionProcess[];

  @OneToMany(() => JobOffer, (joboffer) => joboffer.recruiter)
  joboffer: JobOffer[];

  // @OneToMany(() => Company, {
  //   eager: true,
  //   cascade: true,
  // })
  // companycon: Company[];

  constructor(recruiter: Partial<Recruiter>, utilizador: Partial<Utilizador>) {
    super(utilizador);
    Object.assign(this, recruiter);
  }
}
