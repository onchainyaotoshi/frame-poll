import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { Core } from '@quicknode/sdk';

import NftoshisAbi from './abi/nftoshis.json';

const core = new Core({
    endpointUrl: process.env.FC_QUICKNODE_HTTPS_URL!
});


export async function isNftoshisHolder(address: string) {
    const resp = await core.client.readContract({
        address: '0xBDB1A8772409A0C5eEb347060cbf4B41dD7B2C62',
        abi: NftoshisAbi,
        functionName: "balanceOf",
        args: [address]
    });

    if (Number(resp) <= 0) {
        return false;
    }

    return true;
}

export const neynar = new NeynarAPIClient(process.env.NEYNAR_API_KEY!);