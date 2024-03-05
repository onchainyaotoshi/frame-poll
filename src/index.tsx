import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import Style1 from './components/style-1'
import {app as Poll} from './routes/poll'

export const app = new Frog({
  // Supply a Hub API URL to enable frame verification.
  // hubApiUrl: 'https://api.hub.wevm.dev',
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  return c.res({
    action: '/poll',
    image: Style1(`Create Your Own Poll`,c),
    intents: [
      <Button value="login">Let's go</Button>,
    ],
  })
})

app.route("/poll", Poll);

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})
