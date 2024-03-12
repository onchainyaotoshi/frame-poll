import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import StyleError from '../../components/style-error'

export default (c: FrameContext, opts:Record<string,any>): FrameResponse => c.res({
    action: opts.action ? opts.action : undefined,
    image: StyleError(c, opts.content),
    intents: [
      opts.btnBackAction ? <Button value={opts.btnBackValue ? opts.btnBackValue : 'back'} action={opts.btnBackAction}>Back</Button> : <Button value={opts.btnBackValue ? opts.btnBackValue : 'back'}>Back</Button>,
    ]
  });