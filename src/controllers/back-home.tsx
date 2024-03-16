import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../components/style-1.js'
import { type TypedResponse } from "../../node_modules/frog/types/response.js";


export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => c.res({
    action: opts.action ? opts.action : undefined,
    image: Style1(c, opts.content),
    intents: [
        <Button.Reset>Home</Button.Reset>,
        <Button.Link href={`/tool/${opts.state._id}`}>Copy</Button.Link>,
    ],
});