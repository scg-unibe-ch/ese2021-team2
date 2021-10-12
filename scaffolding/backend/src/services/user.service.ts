import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        console.log('reached be user.services.ts line 15');


        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                userName: loginRequestee.userName
            }
        })
        .then(user => {
            console.log('reached be user.services.ts line 25');
            if (bcrypt.compareSync(loginRequestee.password, user.password)) {// compares the hash with the password from the login request
                const token: string = jwt.sign({
                    userName: user.userName,
                    userId: user.userId,
                    admin: user.admin,
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    street: user.street,
                    housenr: user.housenr,
                    zipCode: user.zipCode,
                    city: user.city,
                    birthday: user.birthday,
                    phonenumber: user.phonenumber
                    }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            } else {
                return Promise.reject({ message: 'not authorized' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
    }

    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}
