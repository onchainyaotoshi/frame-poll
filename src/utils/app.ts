import { Frog, FrogConstructorParameters } from 'frog'
import { neynar } from 'frog/hubs'
import { isLive } from './dev-tools';
import _ from 'lodash';

const frogAppArgs: FrogConstructorParameters = {
    // dev:{
    //     appFid: 282770,
    //     enabled: parseInt(process.env.FC_DEV_NGROK!) === 0
    // }
}

if(isLive()){
    frogAppArgs.hub = neynar({ apiKey: process.env.NEYNAR_API_KEY || '' });
    frogAppArgs.verify = 'silent';
}

export const getFrogApp = (opts: FrogConstructorParameters<{State:PollType}> = {}) => new Frog(_.merge(frogAppArgs,opts));