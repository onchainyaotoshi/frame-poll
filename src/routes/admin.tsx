import { getFrogApp } from '../utils/app'

import PollController from '../controllers/home'
import PollResult from '../controllers/poll-result'
import QuestionController from '../controllers/question'
import IndexController from '../controllers/index'
import ErrorController from '../controllers/error'


import PollVoteModel from '../models/poll_vote';

import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../components/style-1.js'

import PollCreateQuestionSubmittedController from '../controllers/poll-create-question-submitted';
import PollCreateOptionsSubmittedController from '../controllers/poll-create-options-submitted';
import PollCreateSaveSubmittedController from '../controllers/poll-create-save-submitted';
import PollCreateDeadlineSubmittedController  from '../controllers/poll-create-deadline-submitted';

import UserModel from '../models/user';
import PollModel from '../models/poll'

export const app = getFrogApp({
  initialState:{
    fid:undefined,
    question:undefined,
    options:undefined,
    duration:undefined,
    validatedOptions:undefined,
    _id:undefined
  }
});

app.frame('/:id?', async (c) => {
  const {buttonValue,status, frameData,inputText, deriveState, initialPath} = c;
  const fid = frameData?.fid;
  const {id} = c.req.param() as { id: string };

  const state = deriveState((previousState:any) => {
    previousState.fid = fid;
  });

  if(buttonValue == 'poll-create-question-submitted'){
    return await PollCreateQuestionSubmittedController(c);
  }
  else if(buttonValue == 'poll-create-options-submitted'){
    return await PollCreateOptionsSubmittedController(c);
  }else if(buttonValue == 'poll-create-options-back'){
    return await PollCreateQuestionSubmittedController(c);
  }else if(buttonValue == 'poll-create-deadline-submitted'){
    return await PollCreateDeadlineSubmittedController(c);
  }else if(buttonValue == 'poll-create-deadline-back'){
    return await PollCreateOptionsSubmittedController(c);
  }else if(buttonValue == 'poll-create-save'){
    return await PollCreateSaveSubmittedController(c);
  }else if(buttonValue == 'poll-view'){
    if(!isNaN(parseInt(inputText!))){
      const poll = await PollModel.getPollById(parseInt(inputText!));
      if(poll){
        const data = await PollVoteModel.getVoteCountsByOptionInPercentage(poll.poll_id!);
        return PollResult(c, {
          state: data,
          poll:poll
        });
      }
    }

    return ErrorController(c, {
      content: `The poll (${inputText}) was not found`
    });
  }else if(buttonValue == 'poll-back'){
    return IndexController(c);
  }
  else{
    if(buttonValue == 'login'){
      await UserModel.createIfNotExists(fid!);
    }
    
    const polls = await PollModel.listNewToOld();
    return PollController(c, {
      data: polls
    });
  }
})