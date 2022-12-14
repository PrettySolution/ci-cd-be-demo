import express, {Express, Request, Response} from 'express';
import {networkInterfaces} from "os";

const app: Express = express();
const port = 3000;

app.get('/api/', (req: Request, res: Response) => {
  res.send(`curl 'http://localhost:80/fibonacci?n=43', ${process.env.PG_USERNAME}, ${process.env.PG_PASSWORD}, ${process.env.PG_HOST}`);
});

app.get('/api/ip', (req, res) => {
  const myIp = networkInterfaces()
  res.send(myIp)
})

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).send('healthy');
});

app.get('/api/fibonacci', (req: Request, res: Response) => {
  console.log(req.query.n)
  const f = fibonacci(req.query.n)
  console.log(f)
  res.send(`fibonacci = ${f}`);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

function fibonacci(num: any): any {
  if (num <= 1) return num;
  return fibonacci(num - 1) + fibonacci(num - 2);
}