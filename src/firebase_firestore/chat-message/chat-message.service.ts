import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Firestore } from 'firebase-admin/firestore';
import { MessageDto } from 'shared/src/message.dto';

@Injectable()
export class ChatMessageService {
    constructor(
            private readonly jwtService: JwtService,
            @Inject("FIREBASE_ADMIN") private firestore: Firestore
        ){}

    async sendMessage(dto: MessageDto) {
        let room;

        // ✅ Step 1: If roomID is provided, use it directly
        if (dto.roomID) {
          room = await this.firestore.collection("chatRooms").doc(dto.roomID).get();
          if (!room.exists) {
            throw new Error(`Room with ID ${dto.roomID} does not exist`);
          }
        } else {
          // ✅ Step 2: Otherwise, find or create room
          const roomQuery = await this.firestore
            .collection("chatRooms")
            .where("participants", "array-contains", dto.senderId)
            .get();

          const found = roomQuery.docs.find((r) =>
            r.data().participants.includes(dto.recipientId),
          );

          if (found) {
            room = found; // existing room
          } else {
            const newRoomRef = this.firestore.collection("chatRooms").doc();
            await newRoomRef.set({
              participants: [dto.senderId, dto.recipientId],
              createdAt: Date.now(),
              lastMessage: null,
            });
            room = await newRoomRef.get();
          }
        }

        if (!room?.exists) {
          throw new Error("Room creation failed");
        }

        // ✅ Step 3: Save message in messages subcollection
        const msgRef = this.firestore
          .collection("chatRooms")
          .doc(room.id)
          .collection("messages")
          .doc();

        await msgRef.set({
          senderId: dto.senderId,
          recipientId: dto.recipientId,
          text: dto.text || null,
          mediaUrl: dto.mediaUrl || null,
          type: dto.type,
          createdAt: Date.now(),
        });

        // ✅ Step 4: Update room’s last message
        await this.firestore.collection("chatRooms").doc(room.id).update({
          lastMessage: {
            text: dto.text,
            senderId: dto.senderId,
            createdAt: Date.now(),
          },
        });

        return { roomId: room.id, messageId: msgRef.id };
    }



// ✅ Fetch messages for a given room
  async getMessages(roomId: string) {
    const messagesRef = this.firestore
      .collection('chatRooms')
      .doc(roomId)
      .collection('messages')
      .orderBy('createdAt', 'asc'); // oldest → newest
      

    const snapshot = await messagesRef.get();

    if (snapshot.empty) {
      throw new HttpException("ChatRoom not found or Delete", HttpStatus.NOT_FOUND);
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // ✅ Get or create a room between two participants
    async getOrCreateRoom(senderId: string, receiverId: string) {
      // Step 1: Find if room exists
      const roomQuery = await this.firestore
        .collection("chatRooms")
        .where("participants", "array-contains", senderId)
        .get();

      const found = roomQuery.docs.find((r) =>
        r.data().participants.includes(receiverId),
      );

      if (!found) {
        throw new HttpException("Chat not found..", HttpStatus.NOT_FOUND);
      }else{
      return { roomId: found!.id, ...found!.data() };
      }
      // // Step 2: Create if not exists
      // const newRoomRef = this.firestore.collection("chatRooms").doc();
      // await newRoomRef.set({
      //   participants: [senderId, receiverId],
      //   createdAt: Date.now(),
      //   lastMessage: null,
      // });

      // return { roomId: newRoomRef.id };
    }


    // Delete (soft delete) a message
   async softDeleteMessage(roomId: string, messageId: string) {
      const messageRef = this.firestore
        .collection("chatRooms")
        .doc(roomId)
        .collection("messages")
        .doc(messageId);

      await messageRef.update({
        deletedAt: Date.now(),
      });

      return { success: true, message: "Message deleted" };
    }


    async updateMessage(roomId: string, messageId: string, body: { text?: string; deletedAt?: number }) {
        const messageRef = this.firestore
          .collection("chatRooms")
          .doc(roomId)
          .collection("messages")
          .doc(messageId);

        const updateData: any = {};

        if (body.text) {
          updateData.text = body.text; // normal update
        }

        if (body.deletedAt) {
          updateData.deletedAt = body.deletedAt; // soft delete
        }

        await messageRef.update(updateData);

        return { id: messageId, ...updateData };
}

}
