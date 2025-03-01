import { Schema, model, Document, Types } from "mongoose";
import { CategoryModel, ICategory } from "./category.interface";
import AppError from "../../errors/appError";
import httpStatus from "http-status";

const categorySchema = new Schema<ICategory, CategoryModel>({
  name: { type: String, required: true, unique: true },
  image: { type: String, required: true },
});

categorySchema.statics.isCategoryExistsByName = async (name: string) => {
  const existingCategory = await Category.findOne({
    name: { $regex: new RegExp(`^${name}$`, "i") },
  });

  if (existingCategory) {
    throw new AppError(httpStatus.BAD_REQUEST, "Category already exists");
  }
  return existingCategory;
};

categorySchema.statics.isCategoryExistsById = async (
  id: string | Types.ObjectId
) => {
  const existingCategory = await Category.findById(id);

  if (!existingCategory) {
    throw new AppError(httpStatus.BAD_REQUEST, "Category not found.");
  }
  return existingCategory;
};

const Category = model<ICategory, CategoryModel>("Category", categorySchema);

export default Category;
