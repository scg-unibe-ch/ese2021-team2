import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

export interface SubjectAttributes {
    name: String;
    subjectId: number;
}

export interface SubjectCreationAttributes extends Optional<SubjectAttributes, 'subjectId'> { }

export class Subject extends Model<SubjectAttributes, SubjectCreationAttributes> implements SubjectAttributes {

    subjectId: number;
    name: string;

    public static initialize(sequelize: Sequelize) {
        Subject.init(
            {
                subjectId: {
                    type: DataTypes.INTEGER,
                    primaryKey: true
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'subjects'
            }
        );
    }
}
