import { Injectable } from '@nestjs/common';
import { CreateUtilizadorDto } from './dto/create-utilizador.dto';
import { UpdateUtilizadorDto } from './dto/update-utilizador.dto';
import { EntityManager, Repository, FindOneOptions } from 'typeorm';
import { Utilizador } from './entities/utilizador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { encodePassword } from 'src/auth/bcrypt';
import { EmailService } from '@src/mailer/sendMail';
@Injectable()
export class UtilizadorService {
  constructor(
    @InjectRepository(Utilizador)
    private userRepository: Repository<Utilizador>,
    private readonly entityManager: EntityManager,
    private readonly emailService: EmailService,
  ) {}

  async create(createUtilizadorDto: CreateUtilizadorDto) {
    const hashedPassword = await encodePassword(createUtilizadorDto.password);
    const utilizador = new Utilizador({
      ...createUtilizadorDto,
      password: hashedPassword,
    });
    const emailTemplate = this.emailService.getEmailTemplate('verification_code');
    await this.emailService.sendEmail(utilizador.email, emailTemplate.subject, emailTemplate.text, emailTemplate.html);

    await this.entityManager.save(utilizador);
  }

  async findUserByUsername(username: string) {
    const options: FindOneOptions = { where: { username } };
    return this.userRepository.findOne(options);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.find({
      where: {
        User_id: id,
      },
    });
  }

  async update(
    id: number,
    updateUtilizadorDto: UpdateUtilizadorDto,
  ): Promise<Utilizador> {
    await this.userRepository.update(id, updateUtilizadorDto);
    const updatedUser = await this.userRepository.findOne({
      where: { User_id: id },
    });
    this.userRepository.find;
    if (!updatedUser) {
      throw new Error('utilizador no encontrado');
    }
    return updatedUser;
  }

  // async remove(id: number) {
  //   await this.userRepository.delete(id);
  //   return `utilizador de ID #${id} eliminado`;
  // }
}
