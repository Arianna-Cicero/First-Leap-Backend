import { Inject, Injectable } from '@nestjs/common';
import { comparePasswords } from 'src/auth/bcrypt';
import { UtilizadorService } from 'src/resources/utilizador/utilizador.service';

@Injectable()
export class AuthService {

    constructor(@Inject('UTILIZADOR_SERVICE') private readonly utilizadorService: UtilizadorService) {

    }
    async validateUser(username: string, password: string){
        const userDB = await this.utilizadorService.findUserByUsername(username);
        if (userDB ) {
            const matched = comparePasswords(password, userDB.password);
            if (matched){
                console.log('User validation sucess!');
                return userDB;
            }
            else {
                console.log("Passwords do not match");
                return null;
            }
        }
        console.log('User validation failed!')
        return null;
    }
}
