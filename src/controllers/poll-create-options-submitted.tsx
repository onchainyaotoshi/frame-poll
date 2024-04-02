import { FrameContext, FrameResponse } from "frog"
import QuestionController from './question'
import ErrorController from './error'
import {validateOptions} from '../utils/poll'

import { type TypedResponse } from "../../node_modules/frog/types/response";

export default async (c: FrameContext): Promise<TypedResponse<FrameResponse>> =>{
    const {inputText, deriveState} = c;
    const {id} = c.req.param() as { id: string };

    if(!inputText && id != '1'){
        return ErrorController(c, {
          content: `The submission failed because at least 2 options are required. Enter multiple options by separating them with a '${process.env.FC_POLL_SEPARATOR}' e.g., apple${process.env.FC_POLL_SEPARATOR} banana${process.env.FC_POLL_SEPARATOR} avocado${process.env.FC_POLL_SEPARATOR} etc...`,
          btnBackValue: 'poll-create-options-back',
          btnBackAction: '/1'
        });
    }

    if(inputText && id == '0'){
        const validatedOptions: ValidationResultType<string[]> = validateOptions(inputText) as ValidationResultType<string[]>;
        if(!validatedOptions.pass){
            return ErrorController(c, {
                content: validatedOptions.message,
                btnBackValue: 'poll-create-options-back',
                btnBackAction: '/1'
            });
        }
    }

    const state= await deriveState((previousState) => {
        if(id == '0'){
            const state = previousState as PollType;
            state.options = inputText?.trim();
    
            if(state.options != undefined){
                state.validatedOptions = (validateOptions(state.options as string)) as ValidationResultType<string[]>;
            }
        }
    }) as PollType;

    return QuestionController(c, {
        content: `${state.question}\n${state.options}`,
        placeholder: `Poll expiry in hours (e.g., 24)`,
        btnSubmitValue: 'poll-create-deadline-submitted',
        btnSubmitAction: '/0',
        btnBackValue: 'poll-create-options-back',
        btnBackAction: '/1'
    });
}



