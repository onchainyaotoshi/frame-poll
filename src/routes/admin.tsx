import { getFrogApp, nftoshis } from '../utils/app'

import PollController from '../controllers/home'
import PollResult from '../controllers/poll-result'
import IndexController from '../controllers/index'
import ErrorController from '../controllers/error'

import PollCreateQuestionSubmittedController from '../controllers/poll-create-question-submitted';
import PollCreateOptionsSubmittedController from '../controllers/poll-create-options-submitted';
import PollCreateSaveSubmittedController from '../controllers/poll-create-save-submitted';
import PollCreateDeadlineSubmittedController from '../controllers/poll-create-deadline-submitted';

import UserModel from '../models/user';
import PollModel from '../models/poll';
import PollVoteModel from '../models/poll_vote';

import { isLive } from '../utils/dev-tools';

export const app = getFrogApp({
  initialState: {
    fid: undefined,
    question: undefined,
    options: undefined,
    duration: undefined,
    validatedOptions: undefined,
    _id: undefined
  }
});

app.frame('/:id?', async (c) => {
  const { buttonValue, frameData, inputText, deriveState } = c;
  const fid = frameData?.fid;
  const { id } = c.req.param() as { id: string };

  const state = await deriveState((previousState: any) => {
    previousState.fid = fid;
  });

  if (buttonValue == 'poll-create-question-submitted') {
    return await PollCreateQuestionSubmittedController(c);
  }
  else if (buttonValue == 'poll-create-options-submitted') {
    return await PollCreateOptionsSubmittedController(c);
  } else if (buttonValue == 'poll-create-options-back') {
    return await PollCreateQuestionSubmittedController(c);
  } else if (buttonValue == 'poll-create-deadline-submitted') {
    return await PollCreateDeadlineSubmittedController(c);
  } else if (buttonValue == 'poll-create-deadline-back') {
    return await PollCreateOptionsSubmittedController(c);
  } else if (buttonValue == 'poll-create-save') {
    return await PollCreateSaveSubmittedController(c);
  } else if (buttonValue == 'poll-view') {
    if (!isNaN(parseInt(inputText!))) {
      const poll = await PollModel.getPollById(parseInt(inputText!));
      if (poll) {
        const data = await PollVoteModel.getVoteCountsByOptionInPercentage(poll.poll_id!);
        return PollResult(c, {
          id:parseInt(inputText!),
          state: data,
          poll: poll
        });
      }
    }

    return ErrorController(c, {
      content: `The poll (${inputText}) was not found`
    });
  } else if (buttonValue == 'poll-back') {
    return IndexController(c);
  }
  else {
    if (buttonValue == 'login') {
      try{
        if (!await nftoshis.isHolder(isLive() ? fid! : parseInt(process.env.FC_FID!))) {
          return ErrorController(c, {
            content: `Apologies, but it appears you don't currently possess any NFTOSHIS. 
            For those interested in exploring the unique benefits and becoming a part of our community, 
            please feel free to discover more about how you can get involved.`,
            link: {
              name: 'Discover More',
              href: 'https://opensea.io/collection/nftoshis-official'
            },
            isReset: true
          });
        }
  
        await UserModel.createIfNotExists(fid!);
      }catch(err: any){
        return ErrorController(c, {
          content: err.message,
          isReset: true
        });
      }
    }

    const polls = await PollModel.listNewToOld();
    return PollController(c, {
      data: polls
    });
  }
})