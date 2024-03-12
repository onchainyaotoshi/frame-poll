import db from '../utils/db.js';

interface IUserModel {
    user_id?: number; // Optional since it's auto-incremented by the database
    fid: number;
    created_at?: Date; // Optional, as it's defaulted by the database
  }
  

  export default class UserModel {
    static tableName = 'users';
  
    static async create(fid: number): Promise<IUserModel> {
      const [newUser] = await db<IUserModel>(this.tableName).insert({ fid }).returning('*');
      return newUser;
    }
  
    static async findByFid(fid: number): Promise<IUserModel | undefined> {
      const user = await db<IUserModel>(this.tableName).where({ fid }).first();
      return user;
    }
  
    static async createIfNotExists(fid: number): Promise<IUserModel> {
      const user = await this.findByFid(fid);
      if (!user) {
        // User does not exist, create a new user
        const newUser = await this.create(fid);
        return newUser;
      }
      // User already exists, return the existing user
      return user;
    }
  }