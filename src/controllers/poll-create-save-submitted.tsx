import { FrameContext, FrameResponse } from "frog"
import QuestionController from './atomic/question'
import ErrorController from './atomic/error'
import BackHomeController from './atomic/back-home'

import PollModel from '../models/poll';
import PollOptionModel from '../models/poll_option';

export default async (c: FrameContext): Promise<FrameResponse> =>{
    const {cycle, frameData, verified, inputText, deriveState} = c;
    const { fid } = frameData ?? {};
    
    const state:any = await deriveState((async previousState=>{
        const state = previousState as Poll;
        
        const poll = await PollModel.create({
            fid: state.fid!,
            question: state.question!,
            options:  state.options!.trim()
        });

        await PollOptionModel.createBatch(poll.poll_id!,state.validatedOptions!.data!);        
    }));
    
    return BackHomeController(c, {
        content: `You can post this link\n${process.env.FC_DOMAIN}${state.poll_id!}`
    });
}

