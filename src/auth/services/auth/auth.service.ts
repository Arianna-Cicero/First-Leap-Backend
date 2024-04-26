import { Inject, Injectable } from '@nestjs/common';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';

@Injectable()
export class AuthService {

    constructor(@Inject('UTILIZADOR_SERVICE') private readonly utilizadorService: UtilizadorService) {

    }
    async validateUser(username: string, password: string){
        const userDB = await this.utilizadorService.findUserByUsername(username);
        if (userDB && userDB.password === password) {
            console.log('User validation sucess!');
            return userDB;
        }
        console.log('User validation failed!')
        return null;
    }
}
