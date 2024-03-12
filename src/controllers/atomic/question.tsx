import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../../components/style-1.js'

export default (c: FrameContext, opts:Record<string,any>): FrameResponse => c.res({
    action: opts.action ? opts.action : undefined,
    image: Style1(c, opts.content),
    intents: [
      <TextInput placeholder={opts.placeholder}/>,
      opts.btnSubmitAction ? <Button value={opts.btnSubmitValue ? opts.btnSubmitValue: 'submit'} action={opts.btnSubmitAction}>Submit</Button> : <Button value={opts.btnSubmitValue ? opts.btnSubmitValue: 'submit'}>Submit</Button>,
      opts.btnBackAction ? <Button value={opts.btnBackValue ? opts.btnBackValue : 'back'} action={opts.btnBackAction}>Back</Button> : <Button value={opts.btnBackValue ? opts.btnBackValue : 'back'}>Back</Button>,
    ]
  });