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

// For sending messages
async sendMessage(dto: MessageDto) {
        // Step 1: Check if a chat room already exists between these 2 users
        const roomQuery = await this.firestore
            .collection('chatRooms')
            .where('participants', 'array-contains', dto.senderId)
            .get();

        let room: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData> | null = null;

        // find a room that contains both participants
        const found = roomQuery.docs.find((r) =>
            r.data().participants.includes(dto.recipientId),
        );

        if (found) {
            room = found; // this is a QueryDocumentSnapshot (safe)
        } else {
            // Step 2: If no room exists, create one
            const newRoomRef = this.firestore.collection('chatRooms').doc();
            await newRoomRef.set({
            participants: [dto.senderId, dto.recipientId],
            createdAt: Date.now(),
            lastMessage: null,
            });
            room = await newRoomRef.get(); // this is a DocumentSnapshot
        }

        if (!room.exists) {
            throw new Error('Room creation failed');
        }

        // Step 3: Save message inside room
        const msgRef = this.firestore
            .collection('chatRooms')
            .doc(room.id)
            .collection('messages')
            .doc();

        await msgRef.set({
            senderId: dto.senderId,
            recipientId: dto.recipientId,
            text: dto.text || null,
            mediaUrl: dto.mediaUrl || null,
            type: dto.type,
            createdAt: Date.now(),
        });

        // Step 4: Update room’s last message
        await this.firestore.collection('chatRooms').doc(room.id).update({
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

}
