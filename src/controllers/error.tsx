import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import StyleError from '../components/style-error'
import { type TypedResponse } from "../../node_modules/frog/types/response";

export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => c.res({
    action: opts.action ? opts.action : undefined,
    image: StyleError(c, opts.content),
    intents: [
      opts.hideBack ? null : 

      opts.isReset ? <Button.Reset>Back</Button.Reset>
      :
      opts.btnBackAction ? <Button value={opts.btnBackValue ? opts.btnBackValue : 'back'} action={opts.btnBackAction}>Back</Button> : <Button value={opts.btnBackValue ? opts.btnBackValue : 'back'}>Back</Button>,
    ]
  });