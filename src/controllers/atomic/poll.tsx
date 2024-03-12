import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../../components/style-1'

export default (c: FrameContext, a?: string): FrameResponse => c.res({
    action: a ? a : undefined,
    image: Style1(c, "Poll Menu"),
    intents: [
        <TextInput placeholder="Fav fruits? ➕ | ID e.g., 1 👁️❌"/>,
        <Button value="poll-create-question-submitted" action="/0">Create (➕)</Button>,
        <Button value="poll-view">View (👁️)</Button>,
        <Button value="poll-delete">Delete (❌)</Button>,
        <Button value="poll-back">Back</Button>
    ]
});