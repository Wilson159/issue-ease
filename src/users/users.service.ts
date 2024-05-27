import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) { }

    create(createUserDto: CreateUserDto): Promise<User> {
        try {
            return this.userModel.create(createUserDto);
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.findAll();

        if (users.length < 1)
            throw new NotFoundException()

        return this.userModel.findAll();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userModel.findByPk(id);

        if (!user)
            throw new NotFoundException()

        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userModel.findByPk(id);
        if (!user)
            throw new NotFoundException()

        try {
            return user.update(updateUserDto);
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async delete(id: number): Promise<void> {
        const user = await this.userModel.findByPk(id);

        if (!user)
            throw new NotFoundException()

        try {
            return user.destroy();
        } catch (error) {
            throw new BadRequestException()
        }
    }
}
