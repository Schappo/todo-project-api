import { modelOptions, plugin, prop } from '@typegoose/typegoose';
import * as mongooseTimestamp from 'mongoose-timestamp'
import { User } from '../interfaces';

@modelOptions({ schemaOptions: { collection: 'users'} })
@plugin(mongooseTimestamp)
export class UserModel implements User {
  @prop()
  name: string;
}