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
  >{state.question}</div>

{/* instructions */}
  <div style={{
    color: 'white',
    fontSize: 36,
    position: 'absolute',
    top: 16, left: 16
  }}>Preview</div>

<div style={{
    color: 'white',
    fontSize: 36,
    position: 'absolute',
    bottom: 16, left: 16
  }}>{`Finished? Click 'Submit' to proceed.`}</div>

  
<div style={{
    color: 'white',
    fontSize: 36,
    position: 'absolute',
    top: 16, right: 16
  }}>{`Vote within ${state.duration}hrs before poll closes.`}</div>

{/* content */}
  {state.validatedOptions.data.map((val:string, index:number) => <div
    display="flex"
    style={{
      color: 'white',
      fontSize: 36,
    }}
  >{`${index + 1}. ${val}`}</div>)}

{/* farcaster buttons */}
  {state.validatedOptions.length > 4 ?(
    <>
  <div style={{
    fontSize: 24,
    color: 'white',
    marginTop:24,
    width:192,
    height:48,
    border:"white",
    display: 'flex', // Use flexbox
    justifyContent: 'center', // Center content horizontally in the flex container
    alignItems: 'center', // Center content vertically in the flex container
  }}>
    {`Input Text`}
  </div>

  <div style={{
    fontSize: 24,
    color: 'white',
    marginTop:24,
    width:192,
    height:48,
    border:"white",
    display: 'flex', // Use flexbox
    justifyContent: 'center', // Center content horizontally in the flex container
    alignItems: 'center', // Center content vertically in the flex container
  }}>
    {`Submit`}
  </div>
  </>)
 : (
<div style={{
  display: 'flex', // Use flexbox
  flexDirection: 'row', // Align children left to right
  justifyContent: 'center', // Center the items horizontally in the container
  alignItems: 'center', // Center the items vertically in the container
  marginTop: 16
}}>
 <div style={{
  fontSize: 24,
  color: 'white',
  margin: '0 8px',
  width:96,
  height:48,
  border:"white",
  display: 'flex', // Use flexbox
  justifyContent: 'center', // Center content horizontally in the flex container
  alignItems: 'center', // Center content vertically in the flex container
}}>
  {"1"}
</div>
<div style={{
  fontSize: 24,
  color: 'white',
  margin: '0 8px',
  width:96,
  height:48,
  border:"white",
  display: 'flex', // Use flexbox
  justifyContent: 'center', // Center content horizontally in the flex container
  alignItems: 'center', // Center content vertically in the flex container
}}>
  {"2"}
</div>
<div style={{
  fontSize: 24,
  color: 'white',
  margin: '0 8px',
  width:96,
  height:48,
  border:"white",
  display: 'flex', // Use flexbox
  justifyContent: 'center', // Center content horizontally in the flex container
  alignItems: 'center', // Center content vertically in the flex container
}}>
  {"etc..."}
</div>
</div>)
}


</div>)