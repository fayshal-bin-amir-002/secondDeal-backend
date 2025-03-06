import { IJwtPayload } from "../../utils/token.utils";
import Listing from "../listing/listing.model";
import Transaction from "../transactions/transactions.model";
import { UserRole } from "../user/user.interface";
import User from "../user/user.model";

const getMetaData = async (user: IJwtPayload) => {
  if (user?.role === UserRole.ADMIN) {
    const totalUser = await User.countDocuments({ role: UserRole.USER });
    const totalActiveUser = await User.countDocuments({
      isActive: true,
      role: UserRole.USER,
    });
    const totalBlockedUser = await User.countDocuments({
      isActive: false,
      role: UserRole.USER,
    });
    const totalListingProduct = await Listing.countDocuments();
    const totalTransactions = await Transaction.aggregate([
      { $group: { _id: "$status", total: { $sum: 1 } } },
    ]);
    return {
      totalUser,
      totalActiveUser,
      totalBlockedUser,
      totalListingProduct,
      totalTransactions,
    };
  } else if (user?.role === UserRole.USER) {
    const totalItemPosted = await Listing.countDocuments({
      userId: user?.userId,
    });
    return {
      totalItemPosted,
    };
  }
};

export const MetaService = {
  getMetaData,
};
