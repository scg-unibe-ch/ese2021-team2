import { UserAttributes, User } from '../models/user.model';
import { LoginResponse, LoginRequest } from '../models/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DeleteRequest } from '../models/accountDelete.model';
import { UpdateRequest, UpdateResponse } from '../models/accountUpdate.model';
import { MulterRequest } from '../models/multerRequest.model';
import { upload } from '../middlewares/fileFilter';
import { like } from 'sequelize/types/lib/operators';
import { Like } from '../models/like.model';
import path from 'path';
const { Op } = require('sequelize');

export class UserService {

    public register(user: UserAttributes): Promise<UserAttributes> {
        const saltRounds = 12;
        user.password = bcrypt.hashSync(user.password, saltRounds); // hashes the password, never store passwords as plaintext
        return User.create(user)
            .then(inserted => Promise.resolve(inserted))
            .catch(err => Promise.reject(err));
    }

    public login(loginRequestee: LoginRequest): Promise<User | LoginResponse> {
        const secret = process.env.JWT_SECRET;
        return User.findOne({
            where: {
                [Op.or]: [
                    { userName: loginRequestee.userName },
                    { email: loginRequestee.email }
                ]
            }
        })
        .then(user => {
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
                            profile_image: user.profile_image
                        },
                        secret, { expiresIn: '2h' });
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
    public delete(deleteRequestee: DeleteRequest): Promise<number> {
        try {
            const tokenUsername: string = deleteRequestee.tokenPayload.userName;
            return User.destroy({
                where: {
                    userName: tokenUsername
                }
            });
        } catch (err) {
            return Promise.reject('Deletion unsuccessful');
        }
    }

    public async update(updateRequestee: UpdateRequest ): Promise<User | UpdateResponse> {
        const secret = process.env.JWT_SECRET;
        try {
            const passedUsername: string = updateRequestee.userName;
             await User.update({
                fname: updateRequestee.fname,
                lname: updateRequestee.lname,
                email: updateRequestee.email,
                street: updateRequestee.street,
                housenr: updateRequestee.housenr,
                zipCode: updateRequestee.zipCode,
                city: updateRequestee.city,
                birthday: updateRequestee.birthday,
                phonenumber: updateRequestee.phonenumber,
            }, {
                where: {
                    userName: passedUsername
                },
            }).catch((err) => {
                 return Promise.reject({ message: err }); }
                 );

            // create new token with update information
             return User.findOne({
                where: {
                    userName: passedUsername
                }
            }).then((user: User) => {
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
                },
                secret, { expiresIn: '2h' });
                return Promise.resolve({ user, token });
            }).catch((err) => Promise.reject(err));
        } catch (err) {
            return Promise.reject('Update unsuccessful');
        }
    }

    public getAllUsers(): Promise<User[]> {
        return User.findAll();
    }

    public getUser(userid: number): Promise<User> {
        return User.findByPk(userid);
    }

    public getLikedPosts(userid: number) {
        return Like.findAll({
            where: {
                userId: userid
            }
        });
    }

    public likePost(userid: number, postid: number) {
        return Like.create({userId: userid, postId: postid}).then(inserted => Promise.resolve(inserted)).catch(err => Promise.reject(err));
    }

    public updateProfileImage(req: MulterRequest): Promise<User> {
        console.log(req.file + ' PARAMS ID');

        return User.findByPk(req.params.id)
            .then(async found => {
                if (!found) {
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
                        return Promise.resolve('./uploads/' + fileName);

                    } else {
                        return Promise.reject('./uploads/default_image.jpg');
                    }
                } else {
                    return Promise.reject('No such user found');
                }
            })
            .catch(() => Promise.reject('Could not fetch image'));

    }

    deleteProfileImage(userId: number): Promise<string> {
        return User.findByPk(userId)
            .then(async found => {
                    found.profile_image = '';
                    await found.save();
                    return Promise.resolve('Profile Image deleted');
                }
            )
            .catch(() => Promise.reject('Could not delete image!'));
    }
}
