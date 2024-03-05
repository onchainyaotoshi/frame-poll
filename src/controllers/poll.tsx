import { Button, FrameContext, FrameResponse } from "frog"
import Style1 from '../components/style-1.js'

export default (c: FrameContext): FrameResponse => c.res({
    image: Style1("Poll Menu", c),
    intents: [
        <Button value="poll-create">Create New Poll</Button>,
        <Button value="poll-list">List Poll</Button>
    ]
});