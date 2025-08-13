import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Firestore } from 'firebase-admin/firestore';
import { CreateUserDto } from 'shared/src/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject("FIREBASE_ADMIN") private firestore: Firestore
    ){}

  // Common function
    // Generate access token
        async generateToken(user: CreateUserDto): Promise<string> {
            const payload = { email: user.email, password: user.password };
            return this.jwtService.sign(payload);
        }
    // generate new hash or password
        private async hashPassword(password: string): Promise<string> {
            const saltRounds = 10;
            return await bcrypt.hash(password, saltRounds);
        }


  // Add User
    async addUser(collection: string, data: CreateUserDto): Promise<any> {
        const token = await this.generateToken(data);
        data["token"] = token;
        const hashPassword = await this.hashPassword(data.password);
        data["password"] = hashPassword;
        const docRef = this.firestore.collection(collection).doc();
        const doc = await docRef.set(data);
        console.log(doc);
        // return docRef.id;
        return data["token"];
    }

  // Add User By ID
    async getUser(collection: string, id: string): Promise<any> {
        const doc = await this.firestore.collection(collection).doc(id).get();
        if (!doc.exists) {
        throw new Error("Document not found");
        }
        var data = doc.data();
        delete data!["password"];
        return data;
    }


  // Update User
    async updateUser(collection: string, id: string, data: Partial<CreateUserDto>): Promise<any> {
    // If password is being updated, hash it
    if (data.password) {
        data.password = await this.hashPassword(data.password);
    }
    await this.firestore.collection(collection).doc(id).update(data);
    return {
        data : "Data Update successfully"
    }
    }

// Delete User
    async deleteUser(collection: string, id: string): Promise<void> {
    await this.firestore.collection(collection).doc(id).delete();
    }

// Get All Users
    async getAllUsers(collection: string): Promise<any[]> {
    const snapshot = await this.firestore.collection(collection).get();
    return snapshot.docs.map((doc) => {
        const user = doc.data();
        delete user.password; // Remove password from each user
        return user;
    });
    }

}
