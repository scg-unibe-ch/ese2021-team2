import { Subject } from './../models/subject.model';
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

    // TODO: When the subjects get an icon it also has to be added right here.
    public createSubject(name: string): Promise<Subject> {
        return new Promise((resolve, reject) => {
            Subject.create({
                name: name
            }).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    }
}
