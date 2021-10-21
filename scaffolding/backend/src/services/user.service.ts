import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DeleteRequest } from '../models/accountDelete.model';
const { Op } = require('sequelize');

export class UserService {




    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {


        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                [Op.or]: [
                {userName: loginRequestee.userName},
                {email: loginRequestee.email}
                 ]
            }
    }).then(user => {
            console.log(user);
            if (user != null) {
                if (bcrypt.compareSync(loginRequestee.password, user.password)) {
                    // compares the hash with the password from the login request
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
                    phonenumber: user.phonenumber,
                    }, secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
                } else {
                    return Promise.reject({ message: 'Wrong Password' });
                }
            } else {
                return Promise.reject({ message: ' Email/Username not found' });
            }
        })
        .catch(err => Promise.reject({ message: err }));
    }

    // deletes a user from the database
    public delete(deleteRequestee: DeleteRequest): Promise<string> {
        try {
            const tokenUsername: string = deleteRequestee.tokenPayload.userName;
            const passedUsername: string = deleteRequestee.userName;
            if (tokenUsername.normalize() === passedUsername.normalize()) {
                User.destroy({
                    where: {
                        userName: passedUsername
                    }
                });
                return Promise.resolve('User successfully deleted');
            } else {
                return Promise.reject('Deletion unsuccessful');
            }
        } catch (err) {
            return Promise.reject('Deletion unsuccessful');
        }
    }
    public getAll(): Promise<User[]> {
        return User.findAll();
    }
}
