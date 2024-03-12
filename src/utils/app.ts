import { Frog, FrogConstructorParameters } from 'frog'
import { neynar } from 'frog/hubs'
import { isLive } from './dev-tools';
import _ from 'lodash';

const frogAppArgs: FrogConstructorParameters = {
    dev:{
        appFid: 282770
    }
}

if(isLive()){
    frogAppArgs.hub = neynar({ apiKey: process.env.NEYNAR_API_KEY || '' });
    frogAppArgs.verify = 'silent';
}

export const getFrogApp = (opts: FrogConstructorParameters<Poll> = {}) => new Frog<{ State: Poll }>(_.merge(frogAppArgs,opts));