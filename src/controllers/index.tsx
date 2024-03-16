import { Button, FrameContext, FrameResponse, TextInput } from "frog"
import Style1 from '../components/style-1.js'
import { type TypedResponse } from "../../node_modules/frog/types/response.js";

export default (c: FrameContext, a?: string): TypedResponse<FrameResponse> => c.res({
    action: a ? a : undefined,
    image: Style1(c, `Create Your Own Poll`),
    intents: [
        <Button value="login">{`Enter`}</Button>,
    ],
});