import { Button, FrameContext, FrameResponse } from "frog"
import Style1 from '../components/style-1.js'
import { type TypedResponse } from "../../node_modules/frog/types/response.js";


export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => c.res({
    action: opts.action ? opts.action : undefined,
    image: Style1(c, opts.content),
    intents: [
        <Button>Home</Button>,
        <Button.Link href={`https://warpcast.com/~/compose?text=Please+take+a+moment+to+vote&embeds[]=${process.env.FC_DOMAIN+"/vote/"+opts.state._id}`}>Share</Button.Link>,
    ],
});