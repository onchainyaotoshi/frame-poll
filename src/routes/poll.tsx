import { Frog } from 'frog'

import Poll from '../controllers/poll'
import Create from '../controllers/poll-create'
import PlaceHolder from '../controllers/placeholder'

export const app = new Frog()

app.frame('/', (c) => {
  const {buttonValue,status} = c;

  if(buttonValue == 'poll-create'){
    return Create(c);
  }else if(buttonValue == 'poll-list'){
    return PlaceHolder(c);
  }else{
    return Poll(c);
  }
})