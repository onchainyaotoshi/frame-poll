import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../../components/style-1.js'

export default (c: FrameContext, a?: string): FrameResponse => c.res({
    action: a ? a : undefined,
    image: Style1(c, `Create Your Own Poll`),
    intents: [
        <Button value="login">Let's go</Button>,
    ],
});