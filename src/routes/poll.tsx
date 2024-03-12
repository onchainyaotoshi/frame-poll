import { getFrogApp } from '../utils/app'

import PollController from '../controllers/atomic/poll'
import PlaceholderController from '../controllers/atomic/placeholder'
import QuestionController from '../controllers/atomic/question'
import HomeController from '../controllers/atomic/home'
import ErrorController from '../controllers/atomic/error'



import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../components/style-1.js'

import PollCreateQuestionSubmittedController from '../controllers/poll-create-question-submitted';
import PollCreateOptionsSubmittedController from '../controllers/poll-create-options-submitted';
import PollCreateSaveSubmittedController from '../controllers/poll-create-save-submitted';


import UserModel from '../models/user';

export const app = getFrogApp({
  initialState:{
    fid:undefined,
    question:undefined,
    options:undefined,
    validatedOptions:undefined
  }
});

app.frame('/:id?', async (c) => {
  const {buttonValue,status, frameData,cycle,inputText, deriveState, initialPath} = c;
  const fid = frameData?.fid;
  const {id} = c.req.param() as { id: string };
  // await User.createIfNotExists(fid);

  const state = deriveState((previousState:any) => {
    previousState.fid = fid;
  });

  console.log('pool.tsx',cycle,id, status, buttonValue, cycle,state,initialPath);
  if(buttonValue == 'poll-create-question-submitted'){
    return await PollCreateQuestionSubmittedController(c);
  }else if(buttonValue == 'poll-create-options-submitted'){
    return await PollCreateOptionsSubmittedController(c);
  }else if(buttonValue == 'poll-create-options-back'){
    return await PollCreateQuestionSubmittedController(c);
  }else if(buttonValue == 'poll-create-save'){
    return await PollCreateSaveSubmittedController(c);
  }else if(buttonValue == 'poll-view'){
    return PlaceholderController(c, {
      content: `View Page`
    });
  }else if(buttonValue == 'poll-delete'){
    return PlaceholderController(c, {
      content: `Delete Page`
    });
  }else if(buttonValue == 'poll-back'){
    return HomeController(c);
  }else{
    if(buttonValue == 'login'){
      await UserModel.createIfNotExists(fid!);
    }
    
    return PollController(c);
  }
})