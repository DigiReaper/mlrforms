import { Field, ObjectType } from '@nestjs/graphql'
import { UserEntity } from '../../entity/user.entity'
import { UserModel } from '../user/user.model'

@ObjectType('Profile')
export class ProfileModel extends UserModel {
  @Field(() => [String])
  readonly roles: string[]

  constructor(id: string, user: UserEntity) {
    super(id, user)

    this.roles = user.roles
  }
}
