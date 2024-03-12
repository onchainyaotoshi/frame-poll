import db from '../utils/db.js';

interface IPollModel {
  poll_id?: number; // Optional since it's auto-incremented by the database
  fid: number;
  question: string;
  options: string;
  created_at?: Date; // Optional, as it's defaulted by the database
}


export default class PollModel {
  static tableName = 'polls';

  // Method to create a new poll
  static async create({ fid, question, options }: Omit<IPollModel, 'poll_id' | 'created_at'>): Promise<IPollModel> {
    const [createdPoll] = await db(this.tableName).insert({
      fid,
      question,
      options
    }).returning('*');

    return createdPoll;
  }
}