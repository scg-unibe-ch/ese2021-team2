import { Optional, Model, Sequelize, DataTypes } from 'sequelize';

// TODO: Add an icon to this at some point?
export interface SubjectAttributes {
    subjectId: number;
    name: String;
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
