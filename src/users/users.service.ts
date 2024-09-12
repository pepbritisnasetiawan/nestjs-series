import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Leane Gram',
      email: 'lean@mail.com',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Hon',
      email: 'ervin@mail.com',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bow',
      email: 'clem@mail.com',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lee',
      email: 'pati@mail.com',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsea Nimora',
      email: 'chelsea@mail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  create(createUserDto: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUserDto: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUserDto };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removeUser;
  }
}
