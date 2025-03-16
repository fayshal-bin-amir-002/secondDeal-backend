import { Server } from "socket.io";
import { verifyToken } from "../utils/token.utils";
import config from "../config";
import User from "../modules/user/user.model";
import { Message } from "../modules/message/message.model";
import { MessageService } from "../modules/message/message.service";

let onlineUsers = new Set();

const handleSocketConnection = async (io: Server) => {
  io.on("connection", async (socket) => {
    const connectedUserId = socket.handshake.auth?.userId;

    if (!connectedUserId) {
      return;
    }

    if (connectedUserId) {
      socket.join(connectedUserId);

      onlineUsers.add(connectedUserId);
      io.emit("onlineUsers", Array.from(onlineUsers));
    }

    // message page full conversation
    socket.on("message-page", async (id) => {
      const messageUser = await User.findById(id)
        .select("_id name email phoneNumber")
        .lean();

      const messageUserWithStatus = {
        ...messageUser,
        isOnline: onlineUsers.has(messageUser?._id?.toString()),
      };

      socket.emit("message-user", messageUserWithStatus);

      const conversationMessages = await Message.find({
        $or: [
          { sender: connectedUserId, receiver: id },
          { sender: id, receiver: connectedUserId },
        ],
      }).sort({ createdAt: -1 });

      socket.emit("conversation", conversationMessages);
    });

    // new message
    socket.on("new-message", async (data) => {
      const message = await Message.create(data);

      const sidebarConversationSender =
        await MessageService.getSidebarConversation(data?.sender);
      const sidebarConversationReceiver =
        await MessageService.getSidebarConversation(data?.receiver);

      io.to(data?.sender?.toString()).emit("message", message);
      io.to(data?.receiver?.toString()).emit("message", message);

      io.to(data?.sender?.toString()).emit(
        "sidebar-conversation",
        sidebarConversationSender
      );
      io.to(data?.receiver?.toString()).emit(
        "sidebar-conversation",
        sidebarConversationReceiver
      );
    });

    // side bar conversation
    socket.on("sidebar", async (currentUserId) => {
      const sidebarConversation =
        await MessageService.getSidebarConversation(currentUserId);

      socket.emit("sidebar-conversation", sidebarConversation);
    });

    // mark messages as seen
    socket.on("seen-message", async (id) => {
      await Message.updateMany(
        {
          sender: id,
          receiver: connectedUserId,
          seen: false,
        },
        { $set: { seen: true } }
      );
      const sidebarConversationSender =
        await MessageService.getSidebarConversation(id);
      const sidebarConversationReceiver =
        await MessageService.getSidebarConversation(connectedUserId);

      io.to(id?.toString()).emit(
        "sidebar-conversation",
        sidebarConversationSender
      );
      io.to(connectedUserId?.toString()).emit(
        "sidebar-conversation",
        sidebarConversationReceiver
      );
    });

    // user disconnect
    socket.on("disconnect", async () => {
      onlineUsers.delete(connectedUserId);
      io.emit("onlineUsers", Array.from(onlineUsers));
    });
  });
};

export default handleSocketConnection;
