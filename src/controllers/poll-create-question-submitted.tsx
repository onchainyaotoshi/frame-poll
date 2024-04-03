import { FrameContext, FrameResponse } from "frog"
import QuestionController from './question'
import ErrorController from './error'

import { type TypedResponse } from "../../node_modules/frog/types/response";

import { isLive } from '../utils/dev-tools';


export default async (c: FrameContext): Promise<TypedResponse<FrameResponse>> => {
    const { inputText, deriveState, frameData } = c;
    const { fid } = frameData!;
    const { id } = c.req.param() as { id: string };

    if (!inputText && id != '1') {
        return ErrorController(c, {
            content: `Question required !!!`,
            btnBackValue: 'poll-create-question-back',
            btnBackAction: '/1'
        });
    }

    const state: any = await deriveState(async (previousState) => {
        const state = previousState as PollType;
        
        if (id == '0') {
            state.question = inputText?.trim();
        }
    }) as PollType;

    if(state.verify === false){
        return ErrorController(c, {
            content: `Apologies, but it appears you do not currently hold any NFToshis.`,
            btnBackValue: 'poll-create-question-back',
            btnBackAction: '/1',
            link:{
                name:'Buy',
                href:'https://opensea.io/collection/nftoshis-official'
            }
        });
    }

    return QuestionController(c, {
        content: `${state.question}`,
        placeholder: `e.g., Apple${process.env.FC_POLL_SEPARATOR} Banana${process.env.FC_POLL_SEPARATOR}`,
        btnSubmitValue: 'poll-create-options-submitted',
        btnSubmitAction: '/0',
        btnBackValue: 'poll-create-question-back',
        btnBackAction: '/1'
    });
}

