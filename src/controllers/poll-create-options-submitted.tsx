import { FrameContext, FrameResponse } from "frog"
import PoolPreviewController from './atomic/poll-preview'
import ErrorController from './atomic/error'
import {validateOptions} from '../utils/poll'

export default async (c: FrameContext): Promise<FrameResponse> =>{
    const {cycle, frameData, verified, inputText, deriveState} = c;
    const { fid } = frameData ?? {};
    const {id} = c.req.param() as { id: string };

    if(!inputText && id != '1'){
        return ErrorController(c, {
          content: `The submission failed because at least 2 options are required. Enter multiple options by separating them with a '${process.env.FC_POLL_SEPARATOR}' e.g., apple${process.env.FC_POLL_SEPARATOR} banana${process.env.FC_POLL_SEPARATOR} avocado${process.env.FC_POLL_SEPARATOR} etc...`,
          btnBackValue: 'poll-create-options-back',
          btnBackAction: '/1'
        });
    }

    if(inputText && id == '0'){
        const validatedOptions: ValidationResult<string[]> = validateOptions(inputText);
        if(!validatedOptions.pass){
            return ErrorController(c, {
                content: validatedOptions.message,
                btnBackValue: 'poll-create-options-back',
                btnBackAction: '/1'
            });
        }
    }

    const state= deriveState((previousState) => {
        const state = previousState as Poll;
        state.options = inputText?.trim();

        if(state.options != undefined){
            state.validatedOptions = validateOptions(state.options as string);
        }
    }) as Poll;

    return PoolPreviewController(c, {
        state: state,
        btnSubmitValue: 'poll-create-save',
        btnSubmitAction: '/0',
        btnBackValue: 'poll-create-options-back',
        btnBackAction: '/1'
    });
}



