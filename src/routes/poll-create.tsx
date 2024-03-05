import { Frog, Button, TextInput } from 'frog'
import { neynar } from 'frog/hubs'
import Style1 from '../components/style-1.js'
import {isLive} from '../utils/dev-tools.js'

export const app = new Frog({
  hub: neynar({ apiKey: process.env.NEYNAR_API_KEY || '' }),
  verify: 'silent'
})

app.frame('/', (c) => {
  
  const { frameData, verified } = c

  return c.res({
    image: Style1("Create Pool",c),
    intents: [
      <TextInput placeholder='Enter poll title...'/>,
      <Button value="create">Submit</Button>,
      <Button value="pool">Back</Button>
    ]
  });

  if(!verified && isLive()){
    
  }else{
    return c.res({
      image: Style1("Poll Menu",c),
      intents: [
        <Button.Reset>Create New Poll</Button.Reset>
      ]
    });
  }
})