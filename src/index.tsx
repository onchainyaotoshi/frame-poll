import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { getFrogApp } from './utils/app'
import ngrok from '@ngrok/ngrok';
import {isLive} from './utils/dev-tools'

import {app as AdminRoute} from './routes/admin';
import IndexController from './controllers/index';
import { Context } from 'hono';

import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = getFrogApp();

app.use('/*', serveStatic({ root: './public' }))

app.frame("/", (c)=>IndexController(c,"/admin/0"))

app.route("/admin", AdminRoute);

app.hono.get('/tool/:id',async (c: Context)=>{
    const filePath = path.join(__dirname,"..", 'public', 'copy.html');

    try {
      const id = c.req.param('id');
      const data = (await fs.readFile(filePath, 'utf8')).replace("{{data}}",`${process.env.FC_DOMAIN}/vote/${id}`);
      c.header('Content-Type', 'text/html');
      return c.body(data);
    } catch (err) {
      console.error('Failed to read file:', err);
      return c.text('Internal Server Error', 500);
    }
});

const port: number | undefined = process.env.PORT ? +process.env.PORT : undefined;
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port,
})

if(!isLive() && process.env.FC_DEV_NGROK == '1'){
  const listener = await ngrok.connect({
    proto: 'http',
    addr: port,
    authtoken_from_env: true,
    domain: process.env.FC_DOMAIN ? process.env.FC_DOMAIN.replace("https://", "") : ''
  });
  
  console.log(`${listener.url()}`);
}