import { getFrogApp } from '../utils/app'

import VoteController from '../controllers/vote'
import PollModel from '../models/poll'
import ErrorController from '../controllers/error'
import { Poll } from '../utils/poll';
import PollOptionModel from '../models/poll_option';

export const app = getFrogApp({
    initialState: {
        fid: undefined,
        question: undefined,
        options: undefined,
        duration: undefined,
        validatedOptions: undefined,
        _id: undefined
    }
});

app.frame('/:id?', async (c) => {
    const { buttonValue, status, frameData, inputText, deriveState, initialPath } = c;
    const fid = frameData?.fid;
    const { id } = c.req.param() as { id: string };

    const isExpired = await PollModel.isPollExpired(parseInt(id));

    if (isExpired === null) {
        return ErrorController(c, {
            content: `The poll (${id}) was not found`,
            hideBack:true
        });
    }else if(isExpired === true){
        return ErrorController(c, {
            content: `The poll (${id}) has expired`,
            hideBack:true
        });
    }

    const data = await PollModel.getPollById(parseInt(id));
    const poll = new Poll(data!);
    const option = await PollOptionModel.getByPollId(parseInt(id));
    console.log("button clicked",buttonValue);

    return VoteController(c, {
        model: {
            poll:poll,
            option:option
        }
    });
})