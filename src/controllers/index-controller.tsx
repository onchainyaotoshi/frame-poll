import { FrameContext, FrameResponse } from "frog"
import { HandlerResponse } from "hono/types"

const handler = async(c:FrameContext): Promise<FrameResponse>=>{
    return c.res({
        image:'https://google.com'
    });
}

export default handler;