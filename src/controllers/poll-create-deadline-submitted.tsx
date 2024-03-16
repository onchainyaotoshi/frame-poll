import { FrameContext, FrameResponse } from "frog"
import PoolPreviewController from './poll-preview'
import ErrorController from './error'

import { type TypedResponse } from "../../node_modules/frog/types/response";

export default async (c: FrameContext): Promise<TypedResponse<FrameResponse>> =>{
    const { frameData, verified, inputText, deriveState } = c;
    const { fid } = frameData ?? {};
    const {id} = c.req.param() as { id: string };

    if(!inputText && id != '1'){
        return ErrorController(c, {
          content: `The expected input is a positive number. ex: 8`,
          btnBackValue: 'poll-create-deadline-back',
          btnBackAction: '/1'
        });
    }

    if(inputText && id == '0'){
        if(!isValidUnsignedInteger(inputText.trim())){
            return ErrorController(c, {
                content: "The expected input is a positive number. ex: 12",
                btnBackValue: 'poll-create-deadline-back',
                btnBackAction: '/1'
            });
        }
    }

    const state= await deriveState((previousState) => {
        console.log(id, previousState);
        if(id == '0'){
            const state = previousState as Poll;
            state.duration = Number(inputText?.trim())
        }
    }) as Poll;

    return PoolPreviewController(c, {
        state: state,
        btnSubmitValue: 'poll-create-save',
        btnSubmitAction: '/0',
        btnBackValue: 'poll-create-deadline-back',
        btnBackAction: '/1'
    });
}

function isValidUnsignedInteger(str: string) {
    const num = Number(str); // or use parseInt(str, 10) for integer parsing
    return Number.isInteger(num) && num >= 0;
}