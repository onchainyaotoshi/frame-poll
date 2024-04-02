import { Button, FrameContext, FrameResponse } from "frog"
import PollResultComponent from '../components/poll-result'

import { type TypedResponse } from "../../node_modules/frog/types/response.js";

export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => c.res({
    action: opts.action ? opts.action : undefined,
    image: PollResultComponent(c, opts),
    intents: [
      !opts.hideBack ? <Button value={opts.backValue ? opts.backValue : 'back'}>Back</Button> : null,
      <Button.Link href={`https://warpcast.com/~/compose?text=Please+take+a+moment+to+vote&embeds[]=${process.env.FC_DOMAIN+"/vote/"+opts.id}`}>Share</Button.Link>,
    ]
  });