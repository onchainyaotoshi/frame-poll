import { FrameContext, FrameResponse } from "frog"
import QuestionController from './atomic/question'
import ErrorController from './atomic/error'

export default async (c: FrameContext): Promise<FrameResponse> =>{
    const {cycle, frameData, verified, inputText, deriveState} = c;
    const { fid } = frameData ?? {};
    const {id} = c.req.param() as { id: string };

     if(!inputText && id != '1'){
        return ErrorController(c, {
          content: `Question required !!!`,
          btnBackValue: 'poll-create-question-back',
          btnBackAction: '/1'
        });
    }

    const state:any = deriveState((previousState) => {
        if(id == '0'){
            const state = previousState as Poll;
            state.question = inputText?.trim();
        }
    }) as Poll;
    
    return QuestionController(c, {
        content: `${state.question}`,
        placeholder: `e.g., Apple${process.env.FC_POLL_SEPARATOR} Banana${process.env.FC_POLL_SEPARATOR}`,
        btnSubmitValue: 'poll-create-options-submitted',
        btnSubmitAction: '/0',
        btnBackValue: 'poll-create-question-back',
        btnBackAction: '/1'
    });
}

