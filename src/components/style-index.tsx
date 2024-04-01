import { FrameContext } from "frog";

export default (c: FrameContext, content: string): JSX.Element => (<div
  style={{
    alignItems: 'center',
    background: '#344afb',
    backgroundSize: '100% 100%',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    height: '100%',
    // justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  }}
>
<img src="/images/teacher.png?ver=1" width={512} height={682} style={{
    position: 'absolute',
    bottom: 0, left: 0
  }}/>

<img src="/images/nyam.png?ver=1" width={640} height={480} style={{
    position: 'absolute',
    bottom: -48, right: -96
  }}/>
  
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
      marginLeft:64
    }}
  >
    {content}
  </div>
</div>)