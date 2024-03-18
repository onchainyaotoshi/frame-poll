import { FrameContext } from "frog";

export default (c: FrameContext, opts: Record<string, any>): JSX.Element => (<div
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
    width: '100%',
  }}
>
{/* instructions */}
<div style={{
    color: 'white',
    fontSize: 36,
    position: 'absolute',
    bottom: 16, left: 16
  }}>{`${process.env.FC_DOMAIN}/vote/[id]`}</div>

  {
    opts.data && opts.data.length ?
      <div style={{
        display: 'flex',
        flexDirection: 'column', // Align items left to right
        flexWrap: 'nowrap', // Wrap to next line if out of space
        alignItems: 'center', // Align items vertically in the center
        justifyContent: 'flex-start', // Align items to the start of the container
        padding:'36px'
      }}>
        {
          opts.data.map((item: any, index: number) => (
            <div key={index} style={{
              margin: '4px 0',
              color: 'white',
              fontSize: '48px',
              fontStyle: 'normal',
              whiteSpace: 'pre-wrap',
              display:"flex"
            }}>
              {`id: ${item["poll_id"]}, exp: ${item["exp"]}, q: ${item["question"]}`} {/* Index starts from 1 */}
            </div>
          ))
        }
      </div>
      :
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
        {`No polls found. To start creating your own poll, fill in the textbox with your question and click the 'Create' button.`}
      </div>
  }
</div>)