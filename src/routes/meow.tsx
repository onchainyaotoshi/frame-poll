import { getFrogApp } from '../utils/app'
import { Button } from "frog"

export const app = getFrogApp();

app.frame('/', (c) => {
  return c.res({
      action: "/",
      image: `${process.env.FC_DOMAIN}/images/meow.png?ver=1`,
      intents: [
          <Button.Link href="https://snapshot.org/#/toshibase.eth/proposal/0x3f946edb78abacf98e42c394a10eb38d08cfed882346efe50802a41ef2d77a54">{`Vote`}</Button.Link>
      ]
  });
})