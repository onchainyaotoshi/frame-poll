import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../../components/style-1.js'

export default (c: FrameContext, opts:Record<string,any>): FrameResponse => c.res({
    action: opts.action ? opts.action : undefined,
    image: Style1(c, opts.content),
    intents: [
      <Button value={opts.backValue ? opts.backValue : 'back'}>Back</Button>
    ]
  });