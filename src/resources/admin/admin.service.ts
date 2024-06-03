import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUtilizadorDto } from '../utilizador/dto/create-utilizador.dto';
import { UtilizadorService } from '../utilizador/utilizador.service';
import { EmailverificationService } from '../emailverification/emailverification.service';
import { EmailService } from '@src/mailer/sendMail';
import { encodePassword } from '@src/auth/bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly entityManager: EntityManager,
    private readonly utilizadorService: UtilizadorService,
    private readonly emailVerificationService: EmailverificationService,
    private readonly emailService: EmailService,
  ) {}

  private generateNumericVerificationCode(length: number = 6): string {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  async emailverification(codigo: number, userId: number) {
    const codigodb = await this.emailVerificationService.findCode(userId);

    if (codigodb.length > 0 && codigodb[0].Verification_code) {
      if (codigo === codigodb[0].Verification_code) {
        await this.adminRepository.update(userId, { verificado: true });

        return { success: true, message: 'Verification successful' };
      } else {
        return { success: false, message: 'Verification code does not match' };
      }
    } else {
      return { success: false, message: 'Verification code not found' };
    }
  }

  async create(
    createAdminDto: CreateAdminDto,
    createUtilizadorDto: CreateUtilizadorDto,
  ): Promise<Admin> {
    return this.entityManager.transaction(async (manager) => {
      createUtilizadorDto.password = await encodePassword(
        createUtilizadorDto.password,
      );
      const utilizador =
        await this.utilizadorService.create(createUtilizadorDto);
      const admin = new Admin(createAdminDto, utilizador);
      admin.utilizador = utilizador;
      const savedAdmin = await manager.save(admin);

      const verificationCode = this.generateNumericVerificationCode();
      await this.emailVerificationService.createVerificationRecord(
        parseInt(verificationCode, 10),
        savedAdmin,
        manager,
      );

      const emailTemplate = this.emailService.getEmailTemplate(
        'verification_code',
        verificationCode,
      );

      await this.emailService.sendEmail(
        savedAdmin.email,
        emailTemplate.subject,
        emailTemplate.text,
        emailTemplate.html,
      );

      // Return the saved candidate
      return savedAdmin;
    });
  }
  async findAll() {
    return await this.adminRepository.find();
  }

  async findOne(id: number) {
    return this.adminRepository.find({
      where: {
        User_id: id,
      },
    });
  }

  async update(id: number, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    await this.adminRepository.update(id, updateAdminDto);
    const adminUpdated = await this.adminRepository.findOne({
      where: {
        User_id: id,
      },
    });
    this.adminRepository.find;
    if (!adminUpdated) {
      throw new Error('Admin no encontrado');
    }
    return adminUpdated;
  }

  async remove(id: number) {
    await this.adminRepository.delete(id);
    return `admin de id #${id} eliminado`;
  }
}
