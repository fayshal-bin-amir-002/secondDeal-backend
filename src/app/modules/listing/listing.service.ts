import { IListing } from "./listing.interface";
import Listing from "./listing.model";
import { IJwtPayload } from "../../utils/token.utils";

const postAnItemIntoListing = async (user: IJwtPayload, payload: IListing) => {
  const item = {
    ...payload,
    userId: user?.userId,
  };

  const result = await Listing.create(item);
  return result;
};

export const ListingService = {
  postAnItemIntoListing,
};
