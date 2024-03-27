import { FrameContext } from "frog";

export default (c: FrameContext, state: any): JSX.Element => (<div
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
  >{`Total voters: ${state.total_voters}`}</div>

{/* instructions */}

{/* content */}
  {
  state.vote_details.map((val:Record<string,object>, index:number) => <div
    display="flex"
    style={{
      color: 'white',
      fontSize: 36,
    }}
  >{`${val.option_text}: ${val.vote_percentage}%`}</div>)
  }


</div>)