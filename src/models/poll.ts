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

  static async listNewToOld(limit: number = 0): Promise<IPollModel[]> {
    const polls = await db(this.tableName)
      .select(
        'poll_id',
        'fid',
        'options',
        'deadline',
        'created_at',
        'question'
        // db.raw(`CASE WHEN LENGTH(question) > 12 THEN CONCAT(SUBSTRING(question, 1, 12), '...') ELSE question END as question`), // Truncate question and append '...' if longer than 12 chars
        // db.raw(`ROUND((EXTRACT(EPOCH FROM (deadline - created_at)) / 3600)) as exp`) // Calculate the approximate difference in hours between 'deadline' and 'created_at', rounded to the nearest hour
    )
      .orderBy('created_at', 'desc') // Order by 'created_at' in descending order
      .limit(limit ? limit : parseInt(process.env.FC_ML_QUESTION!)); // Limit the results to 'limit'
  
    return polls;
  }

  static async getPollById(poll_id: number): Promise<IPollModel | null> {
    const poll = await db(this.tableName)
      .where({ poll_id })
      .first();
  
    return poll || null; // Returns the poll object or null if not found
  }

  static async isPollExpired(poll_id: number): Promise<boolean | null> {
    const poll = await this.getPollById(poll_id);

    if (!poll || !poll.deadline) {
      // If there's no poll, or the poll has no deadline, consider it not found for safety
      return null;
    }

    // Convert the deadline to a moment object for comparison
    const deadlineMoment = moment.utc(poll.deadline);

    // Compare the deadline with the current time (also in UTC)
    return moment.utc().isAfter(deadlineMoment);
  }
}