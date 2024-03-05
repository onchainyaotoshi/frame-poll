import { FrameContext, FrameResponse } from "frog"
import Style1 from '../components/style-1.js'

export default (c: FrameContext): FrameResponse => c.res({
    image: Style1("Placeholder", c)
});