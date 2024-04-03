import { Frog, FrogConstructorParameters } from 'frog'
import { neynar } from 'frog/hubs'
import { isLive } from './dev-tools';
import _ from 'lodash';
import Nftoshis from 'nftoshis-gating';

const frogAppArgs: FrogConstructorParameters = {
    // dev:{
    //     appFid: 282770,
    //     enabled: parseInt(process.env.FC_DEV_NGROK!) === 0
    // },
    imageOptions: {
        format: 'png',
    },
}

// if(isLive()){
//     frogAppArgs.hub = neynar({ apiKey: process.env.NEYNAR_API_KEY || '' });
//     frogAppArgs.verify = 'silent';
// }

export const getFrogApp = (opts: FrogConstructorParameters<{State:PollType}> = {}) => new Frog(_.merge(frogAppArgs,opts));

export const nftoshis = new Nftoshis();