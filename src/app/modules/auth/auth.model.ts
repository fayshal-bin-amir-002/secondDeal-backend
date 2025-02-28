import { Schema, model, Document } from 'mongoose';

export interface IAuthModel extends Document {
  name: string;
  // add more fields here
}

const authSchema = new Schema<IAuthModel>({
  name: { type: String, required: true },
  // add more fields here
});

const authModel = model<IAuthModel>('Auth', authSchema);

export default authModel;
