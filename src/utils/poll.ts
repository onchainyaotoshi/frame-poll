import { IPollModel } from "../models/poll";
import moment from 'moment'; // Make sure to import moment

export const validateOptions = (inputText:string): ValidationResultType<string[]>=>{
    const transformed = inputText.trim().split(process.env.FC_POLL_SEPARATOR as string).map((val:string)=>val.trim()).filter((val:string)=>val.length > 0);
    if(transformed.length < 2 || transformed.length > 9){
        return {
            pass:false,
            message: "Inadequate poll options. Please provide Min. 2 or Max.9 options to create a poll."
        }
    }

    return {
        pass:true,
        data:transformed
    }
}

export class Poll implements PollType {
    fid: number | undefined;
    question: string | undefined;
    options: string | undefined;
    duration: number | undefined;
    validatedOptions: ValidationResultType<string[]> | undefined;
    _id: number | undefined;
  
    constructor(poll: IPollModel) {
      this.fid = poll.fid;
      this.question = poll.question;
      this.options = poll.options;

      const deadlineMoment = moment(poll.deadline);
      const createdMoment = moment(poll.created_at);

      this.duration = Math.round(moment.duration(deadlineMoment.diff(createdMoment)).asHours());
      
      this._id = poll.poll_id;
      // Initialize validatedOptions based on some validation logic
      this.validatedOptions = validateOptions(poll.options!);
    }
  }