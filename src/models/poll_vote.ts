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

  static async getVoteCountsByOptionInPercentage(poll_id: number): Promise<{ total_voters: number, vote_details: Array<{ option_text: string, vote_percentage: number }> }> {
    // First, get the total number of votes for the poll
    const totalVotesResult = await db(this.tableName)
      .where({ poll_id })
      .count('* as total_votes')
      .first();
  
    // Handle the case where totalVotesResult might be undefined
    const totalVotes: number = totalVotesResult ? parseInt(totalVotesResult.total_votes as string) : 0;
  
    if (totalVotes === 0) {
      // Fetch all poll options with a vote_percentage of 0 if there are no votes yet
      const options = await db('poll_options')
        .where({ poll_id })
        .select('option_text');
  
      const voteDetails = options.map(option => ({
        option_text: option.option_text,
        vote_percentage: 0 // Manually set vote_percentage to 0
      }));
  
      return { total_voters: 0, vote_details: voteDetails };
    }
  
    // Then, get the count of votes for each option and calculate the percentage for cases where totalVotes is not 0
    const voteCounts = await db('poll_options')
      .leftJoin(`${this.tableName}`, function() {
        this.on('poll_votes.option_id', '=', 'poll_options.option_id')
          .andOn('poll_votes.poll_id', '=', db.raw('?', [poll_id]))
      })
      .where('poll_options.poll_id', poll_id)
      .groupBy('poll_options.option_text')
      .select('poll_options.option_text')
      .count('poll_votes.option_id as votes')
      .select(db.raw('COALESCE(ROUND((COUNT(poll_votes.option_id)::decimal / ?) * 100, 2), 0) as vote_percentage', [totalVotes]));
  
    const voteDetails = voteCounts.map(vote => ({
      option_text: String(vote.option_text), // Explicitly cast option_text to string
      vote_percentage: Number(vote.vote_percentage) // Ensure vote_percentage is a number
    }));
  
    return {
      total_voters: totalVotes,
      vote_details: voteDetails
    };
  }
}
