import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
const saltRounds = 12;

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const hash = await bcrypt.hash(createUserDto.password, saltRounds);
      createUserDto.password = hash;
      return await this.prisma.user.create({ data: createUserDto });
    } catch (error) {
      if ((error.code = 'P2002')) {
        throw new BadRequestException(
          'A user with these credentials already exists!',
        );
      } else {
        throw new HttpException(error, 500);
      }
    }
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      throw new HttpException(
        'There was some error while updating the changes.',
        500,
      );
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new HttpException(
        'There was some error while deleting the user.',
        500,
      );
    }
  }

  async getDocuments(id: string) {
    return await this.prisma.user.findMany({
      where: { id },
      include: { Documents: true },
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });
    const result = await bcrypt.compare(loginUserDto.password, user.password);
    const response = { success: true, data: user };
    if (result) {
      return response;
    } else {
      throw new HttpException('Invalid User Credentials', 500);
    }
  }
}
