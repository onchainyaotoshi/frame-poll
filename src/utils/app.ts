import { Frog, FrogConstructorParameters } from 'frog'
import { neynar } from 'frog/hubs'
import { isLive } from './dev-tools';
import _ from 'lodash';
import Nftoshis from 'nftoshis-gating';

const frogAppArgs: FrogConstructorParameters = {
    imageOptions: {
        format: 'png',
    },
}

// // this is not working, throw errors:
// // Error: message is invalid. invalid signer: signer 0x268741c9a443f52192636054ce2b7b746300b3fbba72185a1e23793e9d2f5e81 not found for fid 1
// frogAppArgs.hub = neynar({ apiKey: process.env.NEYNAR_API_KEY || '' });
// frogAppArgs.verify = true;

export const getFrogApp = (opts: FrogConstructorParameters<{State:PollType}> = {}) => new Frog(_.merge(frogAppArgs,opts));

export const nftoshis = new Nftoshis();