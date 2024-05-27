import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
const cuid = require('cuid');

@Table
export class User extends Model<User> {
    @PrimaryKey
    @Default(cuid())
    @Column
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;
}
