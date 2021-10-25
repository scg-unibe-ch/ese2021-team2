import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DeleteRequest } from '../models/accountDelete.model';
import {MulterRequest} from '../models/multerRequest.model';
import {upload} from '../middlewares/fileFilter';
import path from 'path';
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

    public updateProfileImage(req: MulterRequest): Promise<User> {
        console.log(req.file + ' PARAMS ID');

        return User.findByPk(req.params.id)
            .then(async found => {
                if (!found) {
                    console.log('in if');

                    return Promise.reject('User not found!');
                } else {
                    return new Promise<User>((resolve, reject) => {
                        upload.single('image')(req, null, async (error: any) => {
                            found.profile_image = req.file.filename;
                            await found.save()
                                .then(created => resolve(created))
                                .catch(() => reject('Could not upload image!'));
                        });
                    });
                }
            })
            .catch(() => Promise.reject('Could not upload image!'));
    }

    public getProfileImage(userId: number): Promise < string > {
        return User.findByPk(userId)
            .then(found => {
                if (found) {
                    const fileName: string = found.profile_image;
                    if (fileName) {
                        return Promise.resolve(' C:/Users/User/Desktop/ESE-Projekt/ese2021-team2/scaffolding/backend/uploads/' + fileName);
                        // C:/Users/User/Desktop/ESE-Projekt/ese2021-team2

                    } else {
                        return Promise.resolve('C:/Users/User/Desktop/ESE-Projekt/ese2021-team2/scaffolding/backend/uploads/default_image.jpg');
                    }
                } else {
                    return Promise.reject('no such user found');
                }
            })
            .catch(() => Promise.reject('no such user!'));

    }
}
