import { FrameContext } from "frog";

export default (c: FrameContext, state: any, showInput: boolean): JSX.Element => (<div
    style={{
        alignItems: 'center',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        backgroundSize: '100% 100%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        height: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%'
    }}
>
    <div
        display="flex"
        style={{
            color: 'white',
            fontSize: 48,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 24,
            padding: '0 120px',
            whiteSpace: 'pre-wrap'
        }}
    >{state.poll.question}</div>

    {/* instructions */}

    <div style={{
        color: 'white',
        fontSize: 36,
        position: 'absolute',
        bottom: 16, left: 16
    }}>{`Vote within ${state.poll.duration}hrs before poll closes.`}</div>

    {/* content */}


    {
        showInput ?

        state.poll.validatedOptions.data.map((val: string, index: number) => <div
            display="flex"
            style={{
                color: 'white',
                fontSize: 36,
            }}
        >{`${index + 1}. ${val}`}</div>)
        :
        <></>
    }



</div>)