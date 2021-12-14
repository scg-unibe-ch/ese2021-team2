import { Subject, SubjectAttributes } from './../models/subject.model';

export class SubjectService {

    // TODO: When the subjects get an icon it also has to be added right here.
    public createSubject(name: string): Promise<Subject> {
        return new Promise((resolve, reject) => {
            Subject.create({ name: name })
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }

    // TODO: Pass the image in here once the image is implemented
    public modifySubject(newSubject: SubjectAttributes): Promise<void> {
        return new Promise((resolve, reject) => {
                Subject.update({
                    subjectId: newSubject.subjectId,
                    name: newSubject.name
                }, {
                where: {
                    subjectId: newSubject.subjectId
                }
            })
            .then(res => resolve())
            .catch(err => reject(err));

        });
    }

    public deleteSubject(subjectId: number): Promise<void> {
        return new Promise((resolve, reject) => {
            Subject.destroy({
                where: {
                    subjectId: subjectId
                }
            })
            .then(() => resolve())
            .catch(err => reject(err));
        });
    }

    public getAllSubjects(): Promise<Subject[]> {
        return new Promise((resolve, reject) => {
            Subject.findAll()
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }

    public getSubject(id: number): Promise<Subject> {
        return new Promise((resolve, reject) => {
            Subject.findByPk(id)
            .then(res => resolve(res))
            .catch(err => reject(err));
        });
    }
}
