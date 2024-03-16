import db from '../utils/db.js';
import moment from 'moment';

export interface IPollModel {
  poll_id?: number; // Optional since it's auto-incremented by the database
  fid: number;
  question: string;
  options: string;
  deadline?: Date; // Made optional since it will be calculated
  created_at?: Date; // Optional, as it's defaulted by the database
}

export default class PollModel {
  static tableName = 'polls';

  // Method to create a new poll with deadline calculated based on duration in hours
  static async create({ fid, question, options, durationInHours }: Omit<IPollModel, 'poll_id' | 'created_at' | 'deadline'> & { durationInHours: number }): Promise<IPollModel> {
    // Calculate deadline by adding durationInHours to the current time
    const deadline = moment.utc().add(durationInHours, 'hours').toDate();

    const [createdPoll] = await db(this.tableName).insert({
      fid,
      question,
      options,
      deadline // Use the calculated deadline
    }).returning('*');

    return createdPoll;
  }
}