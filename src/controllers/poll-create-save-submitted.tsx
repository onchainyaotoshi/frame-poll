import { FrameContext, FrameResponse } from "frog"
import BackHomeController from './back-home'

import PollModel from '../models/poll';
import PollOptionModel from '../models/poll_option';

import { type TypedResponse } from "../../node_modules/frog/types/response";

export default async (c: FrameContext): Promise<TypedResponse<FrameResponse>> =>{
    const {deriveState} = c;
    
    const state:any = await deriveState((async previousState=>{
        const state = previousState as PollType;
        
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
        content: `Copy and paste the link below so users can vote on the poll you created or you can click 'share'.\n${process.env.FC_DOMAIN}/vote/${state._id!}`
    });
}

