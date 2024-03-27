import db from '../utils/db.js';

export interface IVoteModel {
  vote_id?: number; // Optional since it's auto-incremented by the database
  poll_id: number;
  option_id: number;
  fid: number; // Assuming 'fid' is a user identifier from the 'users' table
  created_at?: Date; // Optional, as it's defaulted by the database
}

export default class VoteModel {
  static tableName = 'poll_votes';

  // Method to create a new vote
  static async createVote({ poll_id, option_id, fid }: Omit<IVoteModel, 'vote_id' | 'created_at'>): Promise<IVoteModel> {
    const [createdVote] = await db(this.tableName).insert({
      poll_id,
      option_id,
      fid
    }).returning('*');

    return createdVote;
  }


  // Method to check if a user has already voted in a poll and return the option they voted for
  static async getUserVoteOption(poll_id: number, fid: number): Promise<string | null> {
    const voteOption = await db(this.tableName)
      .join('poll_options', `${this.tableName}.option_id`, '=', 'poll_options.option_id')
      .where({
        [`${this.tableName}.poll_id`]: poll_id, // Specify the table for 'poll_id'
        [`${this.tableName}.fid`]: fid
      })
      .select('poll_options.option_text')
      .first();

    return voteOption ? voteOption.option_text : null; // Returns the option text if found, null otherwise
  }
}
