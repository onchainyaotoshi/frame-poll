import { getFrogApp } from '../utils/app'

import PollResult from '../controllers/poll-result'
import ErrorController from '../controllers/error'


import PollVoteModel from '../models/poll_vote';
import PollModel from '../models/poll';

export const app = getFrogApp();

app.frame('/:id?', async (c) => {
  const { id } = c.req.param() as { id: string };

  if (!isNaN(parseInt(id!))) {
    const poll = await PollModel.getPollById(parseInt(id!));
    if (poll) {
      const data = await PollVoteModel.getVoteCountsByOptionInPercentage(poll.poll_id!);
      return PollResult(c, {
        id:id,
        state: data,
        poll: poll,
        hideBack:true
      });
    }
  }

  return ErrorController(c, {
    content: `The poll (${id}) was not found`,
    hideBack: true
  });
})