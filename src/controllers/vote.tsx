import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import VoteComponent from '../components/vote'

import { type TypedResponse } from "../../node_modules/frog/types/response";

import { type IPollOptionModel} from "../models/poll_option"

export default (c: FrameContext, opts:Record<string,any>): TypedResponse<FrameResponse> => {
    if(opts.model.poll.validatedOptions.data.length>4){
        return c.res({
            action: opts.action ? opts.action : undefined,
            image: VoteComponent(c,opts.model, true),
            intents: [
              <TextInput placeholder={`Enter 1-${opts.model.poll.validatedOptions.data.length} to vote.`}/>,
              <Button value={'vote-submit'}>Submit</Button>
             ]
          });
    }else{
        return c.res({
            action: opts.action ? opts.action : undefined,
            image: VoteComponent(c,opts.model,false),
            intents: opts.model.option.map((val:IPollOptionModel)=>(<Button value={val.option_id!.toString()}>{val.option_text}</Button>))
        });
    }
}