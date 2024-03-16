import { FrameContext, FrameResponse } from "frog"
import QuestionController from './question'
import ErrorController from './error'
import BackHomeController from './back-home'

import PollModel, { IPollModel } from '../models/poll';
import PollOptionModel from '../models/poll_option';

import { type TypedResponse } from "../../node_modules/frog/types/response";

export default async (c: FrameContext): Promise<TypedResponse<FrameResponse>> =>{
    const {frameData, verified, inputText, deriveState} = c;
    const { fid } = frameData ?? {};
    
    const state:any = await deriveState((async previousState=>{
        const state = previousState as Poll;
        
        const poll = await PollModel.create({
            fid: state.fid!,
            question: state.question!,
            options:  state.options!.trim(),
            durationInHours: state.duration!
        });

        await PollOptionModel.createBatch(poll.poll_id!,state.validatedOptions!.data!);
        
        state._id = poll.poll_id!
    }));
    
    return BackHomeController(c, {
        state:state,
        content: `You can post this link\n${process.env.FC_DOMAIN}/vote/${state._id!}`
    });
}

