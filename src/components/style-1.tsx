import { FrameContext } from "frog";

export default (content: string, c: FrameContext): JSX.Element => (<div
  style={{
    alignItems: 'center',
    background:
      c.status === 'response'
        ? 'linear-gradient(to right, #432889, #17101F)'
        : 'black',
    backgroundSize: '100% 100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  }}
>
  <div
    style={{
      color: 'white',
      fontSize: 60,
      fontStyle: 'normal',
      letterSpacing: '-0.025em',
      lineHeight: 1.4,
      marginTop: 30,
      padding: '0 120px',
      whiteSpace: 'pre-wrap',
    }}
  >
    {content}
  </div>
</div>)