import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style from '../components/style-index'
import { type TypedResponse } from "../../node_modules/frog/types/response.js";

export default (c: FrameContext, a?: string): TypedResponse<FrameResponse> => c.res({
    action: a ? a : undefined,
    image: `${process.env.FC_DOMAIN}/images/main.png?ver=5`,
    intents: [
        <Button value="login">{`Les Goh`}</Button>,
    ],
});