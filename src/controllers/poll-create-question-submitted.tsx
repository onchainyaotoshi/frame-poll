import { FrameContext, FrameResponse } from "frog"
import QuestionController from './question'
import ErrorController from './error'

import { type TypedResponse } from "../../node_modules/frog/types/response";

export default async (c: FrameContext): Promise<TypedResponse<FrameResponse>> =>{
    const {frameData, verified, inputText, deriveState} = c;
    const { fid } = frameData ?? {};
    const {id} = c.req.param() as { id: string };

     if(!inputText && id != '1'){
        return ErrorController(c, {
          content: `Question required !!!`,
          btnBackValue: 'poll-create-question-back',
          btnBackAction: '/1'
        });
    }

    const state:any = await deriveState((previousState) => {
        if(id == '0'){
            const state = previousState as PollType;
            state.question = inputText?.trim();
        }
    }) as PollType;
    
    return QuestionController(c, {
        content: `${state.question}`,
        placeholder: `e.g., Apple${process.env.FC_POLL_SEPARATOR} Banana${process.env.FC_POLL_SEPARATOR}`,
        btnSubmitValue: 'poll-create-options-submitted',
        btnSubmitAction: '/0',
        btnBackValue: 'poll-create-question-back',
        btnBackAction: '/1'
    });
}

