import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import {app as PollHandler} from './routes/poll'
import HomeController from './controllers/atomic/home'
import IndexController from './controllers/index-controller'
import { getFrogApp } from './utils/app'
import ngrok from '@ngrok/ngrok';
import {isLive} from './utils/dev-tools'

const app = getFrogApp();

app.use('/*', serveStatic({ root: './public' }))
// (c)=>HomeController(c,'/poll/0')
app.frame('/', IndexController);

app.route("/poll", PollHandler);

const port: number | undefined = process.env.PORT ? +process.env.PORT : undefined;
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

// if(!isLive()){
//   const listener = await ngrok.connect({
//     proto: 'http',
//     addr: port,
//     authtoken_from_env: true,
//     domain: process.env.FC_DOMAIN ? process.env.FC_DOMAIN.replace("https://", "") : ''
//   });
  
//   console.log(`${listener.url()}`);
// }