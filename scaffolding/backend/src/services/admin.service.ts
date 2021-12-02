import { Admin } from './../models/admin.model';
const { Op } = require('sequelize');

export class AdminService {

    public isAdmin(userId: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            Admin.findOne({
                where: {
                    userId: userId
                }
            }).then(admin => {
                if (admin) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    public makeAdmin(userId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            Admin.create({
                userId: userId
            })
            .then(() => resolve())
            .catch(err => reject(err));
        });
    }

}
