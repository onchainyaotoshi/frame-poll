import { FrameContext } from "frog";
import moment from 'moment';

export default (c: FrameContext, options: Record<string,any>): JSX.Element => (
  <div
    style={{
      display: 'flex', // Ensuring display is set to 'flex'
      flexDirection: 'column',
      alignItems: 'center',
      background: '#344afb',
      backgroundSize: '100% 100%',
      height: '100%',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%'
    }}
  >
    <div
    style={{
      color: 'white',
      fontSize: 36
    }}
  >
    {options.poll.question}
  </div>
    {/* Mapping through vote_details to display each option as a progress bar */}
    {
      options.state.vote_details.map((val: Record<string, any>, index: number) => (
        <div 
          key={index} 
          style={{ 
            display: 'flex', // Ensuring display is set to 'flex'
            flexDirection: 'column', 
            width: '100%', 
            padding:'12px 24px'
          }}
        >
          {/* Option Text */}
          <div style={{ color: 'white', fontSize: 24, marginBottom: 5,}}>
            {val.option_text}
          </div>
          {/* Progress Bar Container */}
          <div 
            style={{ 
              display: 'flex', // Set to 'flex' to satisfy the rule, even though it has only one child
              background: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: 5 
            }}
          >
            {/* Progress Bar */}
            <div
              style={{
                background: 'white',
                width: `${val.vote_percentage}%`,
                height: 24,
                borderRadius: 5,
                display: 'flex', // Ensuring display is set to 'flex'
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: 10,
                boxSizing: 'border-box'
              }}
            >
              {/* Percentage Text Inside the Bar */}
              <span style={{ color: '#344afb' }}>
                {`${val.vote_percentage}%`}
              </span>
            </div>
          </div>
        </div>
      ))
    }

{/* instructions */}
<div style={{
        color: 'white',
        fontSize: 36,
        position: 'absolute',
        top: 16, left: 16
    }}>{`ID: ${options.poll.poll_id}, Voters: ${options.state.total_voters}`}</div>

<div
    display="flex"
    style={{
      color: 'white',
      fontSize: 36,
      fontStyle: 'normal',
      letterSpacing: '-0.025em',
      lineHeight: 1.4,
      // marginTop: 24,
      // padding: '0 120px',
      whiteSpace: 'pre-wrap',
      position:'absolute',
      right:16,
      top:16
    }}
  >{`Voted: ${options.userVote ? options.userVote : 'none'}`}</div>
  

<div
    display="flex"
    style={{
      color: 'white',
      fontSize: 36,
      fontStyle: 'normal',
      letterSpacing: '-0.025em',
      lineHeight: 1.4,
      // marginTop: 24,
      // padding: '0 120px',
      whiteSpace: 'pre-wrap',
      position:'absolute',
      left:16,
      bottom:16
    }}
  >{`From: ${moment.utc(options.poll.created_at).format(process.env.FC_FORMAT_DATE)}, To: ${moment.utc(options.poll.deadline).format(process.env.FC_FORMAT_DATE)}`}</div>

  </div>



);
