import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../../components/style-1.js'
import type { TypedResponse } from "frog";


export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => c.res({
    action: opts.action ? opts.action : undefined,
    image: Style1(c, opts.content),
    intents: [
        <Button.Reset>Home</Button.Reset>,
    ],
});