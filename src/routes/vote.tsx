import { getFrogApp } from '../utils/app'

import VoteController from '../controllers/vote'
import PollModel from '../models/poll'
import ErrorController from '../controllers/error'
import { Poll } from '../utils/poll';
import PollOptionModel from '../models/poll_option';
import PollVoteModel from '../models/poll_vote';
import moment from 'moment';

import PollResult from '../controllers/poll-result'

export const app = getFrogApp({
});

app.frame('/:id?', async (c) => {
    const { buttonValue,  frameData, inputText } = c;

    const fid = frameData?.fid;
    const { id } = c.req.param() as { id: string };

    if(isNaN(parseInt(id))){
        return ErrorController(c, {
            content: `The poll (${id}) was not found`,
            hideBack:true
        });
    }

    const isExpired = await PollModel.isPollExpired(parseInt(id));
    if (isExpired === null) {
        return ErrorController(c, {
            content: `The poll (${id}) was not found`,
            hideBack:true
        });
    }

    let isVoted = await PollVoteModel.getUserVoteOption(parseInt(id),fid!);
    const data = await PollModel.getPollById(parseInt(id));

    if(isExpired === true || isVoted){
        // const message = isVoted ? `The poll (${id}) has expired. \nYour Vote:\n'${isVoted}'` : `The poll (${id}) has expired`
        const voteModel = await PollVoteModel.getVoteCountsByOptionInPercentage(parseInt(id));
        
        return PollResult(c, {
            state: voteModel,
            id:id,
            userVote:isVoted,
            poll:data,
            deadline:moment.utc(data!.deadline).format(process.env.FC_FORMAT_DATE),
            hideBack:true
        });
    }

    const poll = new Poll(data!);
    const option = await PollOptionModel.getByPollId(parseInt(id));
    
    if(!isNaN(parseInt(buttonValue!)) || buttonValue === 'vote-submit'){
        let optionId:number = 0;
        if(option.length > 4){
            if(inputText && !isNaN(parseInt(inputText.trim()))){
                const index = parseInt(inputText.trim());
                if(index > 0 && index <= option.length){
                    optionId = option[index-1].option_id!;
                }else{
                    return ErrorController(c, {
                        content: `Please enter a number (1-${option.length}) to vote.`,
                        hideBack:false
                    });
                }
            }
        }else{
            optionId = parseInt(buttonValue!);
        }
        let exists = false;
        let optionText = null;
        for(let i=0;i<option.length;i++){
            if(option[i].option_id == optionId){
                optionText = option[i].option_text;
                exists = true;
                break;
            }
        }

        if(exists){
            await PollVoteModel.createVote({
                poll_id:parseInt(id),
                option_id:optionId,
                fid:fid!
            });

            isVoted = optionText;
        }else{
            return ErrorController(c, {
                content: `Sorry, the option you selected (${optionId}) is not available. Please choose a valid option from the list.`,
                hideBack:false
            });
        }
    }

    return VoteController(c, {
        voted: isVoted,
        model: {
            data:data,
            poll:poll,
            option:option
        }
    });
})