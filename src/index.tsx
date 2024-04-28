import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { getFrogApp } from './utils/app'

import {app as AdminRoute} from './routes/admin';
import {app as VoteRoute} from './routes/vote';
import {app as ViewRoute} from './routes/view';
import {app as MeowRoute} from './routes/meow';
import IndexController from './controllers/index';
import { Context } from 'hono';

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const app = getFrogApp();

app.use('/*', serveStatic({ root: './public' }))

// app.frame("/frame", (c)=>IndexController(c,"/vote/10"))
// app.frame("/frame", (c)=>IndexController(c,"/view/7"))
app.frame("/frame", (c)=>IndexController(c,"/admin"))

app.route("/admin", AdminRoute);
app.route("/vote", VoteRoute);
app.route("/view", ViewRoute);
app.route("/meow", MeowRoute);

app.hono.get('/', async(c:Context)=>{
  const filePath = path.join(__dirname,"..", 'public', 'home.html');

  try {
    let data = (await fs.readFile(filePath, 'utf8'));
    const links = [
      `https://warpcast.com/~/compose?text=solve+to+earn+$toshi+or+$frame&embeds[]=https://coral-app-9pbpd.ondigitalocean.app/frame`,
      `https://warpcast.com/~/compose?text=Please+take+a+moment+to+vote&embeds[]=${process.env.FC_DOMAIN}/frame`,
      `https://warpcast.com/~/add-cast-action?url=https://tip-toshi.replit.app/tip`,
      `https://warpcast.com/~/compose?text=Toshi+Tip+Account+Interface&embeds[]=https://tip-toshi.replit.app`,
      `https://warpcast.com/~/add-cast-action?url=https://tip-toshi.replit.app/tip2`,
    ];  

    for(let i=0;i<links.length;i++){
      data = data.replace(`{{link-${i+1}}}`,links[i]);
    }

    c.header('Content-Type', 'text/html');
    return c.body(data);
  } catch (err) {
    console.error('Failed to read file :', err);
    return c.text('Internal Server Error', 500);
  }
});

app.hono.get('/tool/:id',async (c: Context)=>{
    const filePath = path.join(__dirname,"..", 'public', 'copy.html');

    try {
      const id = c.req.param('id');
      const link = `${process.env.FC_DOMAIN}/vote/${id}`;
      const data = (await fs.readFile(filePath, 'utf8')).replaceAll("{{data}}",link);
      c.header('Content-Type', 'text/html');
      return c.body(data);
    } catch (err) {
      console.error('Failed to read file :', err);
      return c.text('Internal Server Error', 500);
    }
});

const port: number | undefined = process.env.PORT ? +process.env.PORT : undefined;

// if(!isLive()){
//   devtools(app, { serveStatic })
// }

serve({
  fetch: app.fetch,
  port,
})

console.log(`Server is running on port ${port}`)