import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import PollPreview from '../components/poll-preview'

import { type TypedResponse } from "../../node_modules/frog/types/response";

export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => c.res({
    action: opts.action ? opts.action : undefined,
    image: PollPreview(c,opts.state),
    intents: [
      <TextInput placeholder={opts.placeholder}/>,
      opts.btnSubmitAction ? <Button value={opts.btnSubmitValue ? opts.btnSubmitValue: 'submit'} action={opts.btnSubmitAction}>Submit</Button> : <Button value={opts.btnSubmitValue ? opts.btnSubmitValue: 'submit'}>Submit</Button>,
      opts.btnBackAction ? <Button value={opts.btnBackValue ? opts.btnBackValue : 'back'} action={opts.btnBackAction}>Back</Button> : <Button value={opts.btnBackValue ? opts.btnBackValue : 'back'}>Back</Button>,
    ]
  });