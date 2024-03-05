import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../components/style-1.js'

export default (c: FrameContext): FrameResponse => c.res({
    image: Style1("Create Poll",c),
    intents: [
      <TextInput placeholder='Enter poll title...'/>,
      <Button value="submit">Submit</Button>,
      <Button value="back">Back</Button>
    ]
  });