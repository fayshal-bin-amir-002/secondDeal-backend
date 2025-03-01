import { Document, Model, Types } from "mongoose";

export interface ICategory extends Document {
  name: string;
  image: string;
}

export interface CategoryModel extends Model<ICategory> {
  isCategoryExistsByName(name: string): Promise<ICategory>;
  isCategoryExistsById(id: string | Types.ObjectId): Promise<ICategory>;
}
