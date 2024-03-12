import db from '../utils/db.js';

interface IPollOptionModel {
  option_id?: number; // Optional since it's auto-incremented by the database
  poll_id: number;
  option_text: string;
  created_at?: Date; // Optional, as it's defaulted by the database
}


export default class PollOptionModel {
  static tableName = 'poll_options';

  // Method to batch insert poll options without needing to return the IDs
  static async createBatch(poll_id: number, option_texts: string[]): Promise<void> {
    const optionsToInsert = option_texts.map(option_text => ({
      poll_id, // Same poll_id for all options
      option_text // Individual option text from the array
    }));

    await db.batchInsert(this.tableName, optionsToInsert, 30); // The '30' here is the batch size, adjust as needed
    // No need to handle the return value
  }
}