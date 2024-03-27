import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import PollResultComponent from '../components/poll-result'

import { type TypedResponse } from "../../node_modules/frog/types/response.js";

export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => c.res({
    action: opts.action ? opts.action : undefined,
    image: PollResultComponent(c, opts.state),
    intents: [
      <Button value={opts.backValue ? opts.backValue : 'back'}>Back</Button>
    ]
  });