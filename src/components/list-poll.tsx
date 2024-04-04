import { FrameContext } from "frog";
import moment from 'moment';

export default (c: FrameContext, opts: Record<string, any>): JSX.Element => (<div
  style={{
    alignItems: 'center',
    background: '#344afb',
    backgroundSize: '100% 100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '100%',
    // justifyContent: 'center',
    // textAlign: 'center',
    width: '100%',
    color:'white',
    fontSize:36,
    fontWeight:'bold'
  }}
>


    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', padding:24 }}>
      {/* Header */}
      <div style={{ display: 'flex'}}>
        <div style={{ flex: 1, textAlign: 'left', paddingLeft: '10px', border:'2px solid white', fontWeight:'bold'  }}>ID</div>
        <div style={{ flex: 3, textAlign: 'left', paddingLeft: '10px', border:'2px solid white', fontWeight:'bold'  }}>Question</div>
        <div style={{ flex: 2, textAlign: 'left', paddingLeft: '10px', border:'2px solid white', fontWeight:'bold'  }}>{`End`}</div>
      </div>

      {/* Data Rows */}

      
      {
        opts.data && opts.data.length > 0 ? (
          opts.data.map((item: any, index: number) => (
            <div key={index} style={{ display: 'flex'}}>
              <div style={{ flex: 1, textAlign: 'left', paddingLeft: '10px', border:'2px solid white', display:'flex'  }}>{item.poll_id}</div>
              <div style={{ flex: 3, textAlign: 'left', paddingLeft: '10px', border:'2px solid white', display:'flex'  }}>{item.question.length < parseInt(process.env.FC_CL_LIMIT!) ? item.question : item.question.substring(0,process.env.FC_CL_LIMIT)+"..."}</div>
              <div style={{ flex: 2, textAlign: 'left', paddingLeft: '10px', border:'2px solid white', display:'flex'  }}>{moment.utc(item.deadline).format(process.env.FC_FORMAT_DATE)}</div>
            </div>
          ))
        ) 
        
        : 
        
         (
          
       <div
      style={{
        marginTop:24,
        display:'flex',
        textAlign:'center',
        justifyContent:'center',
        whitespace:'pre-wrap'
      }}
    >
      {`No polls were found. \nTo create a new poll, \nplease enter the question in the textbox and click the 'Create' button.`}
    </div>
        )
       }
    </div>
</div>)