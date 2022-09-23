import { Inject, Injectable } from '@nestjs/common';
import { In, Like, Raw, MongoRepository } from 'typeorm';
import { User } from './user.mysql.entity'

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: MongoRepository<User>
  ) {

  }

  createOrSave(user) {
    return this.userRepository.save(user)
  }

}
