import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import ListPoll from '../components/list-poll'
import { type TypedResponse } from "../../node_modules/frog/types/response";

export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => c.res({
    action: opts.action ? opts.action : undefined,
    image: ListPoll(c, opts),
    intents: [
        <TextInput placeholder="Fav fruits? ➕ or ID e.g, 1 👁️"/>,
        <Button value="poll-create-question-submitted" action="/0">Create (➕)</Button>,
        <Button value="poll-view">View (👁️)</Button>,
        // <Button value="poll-delete">Delete (❌)</Button>,
        // <Button value="poll-back">Back</Button>
    ]
});