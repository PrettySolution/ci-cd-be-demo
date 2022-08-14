import express, {Express, Request, Response} from 'express';
import {networkInterfaces} from "os";
import {INTEGER, Sequelize} from "sequelize";
import cors from 'cors'

const app: Express = express();
const port = 3000;

app.use(cors())

const sequelize = new Sequelize(`postgres://postgres:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:5432/postgres`)
const Playlist = sequelize.define('table_name', {
  id: {
    field: 'column_1',
    type: INTEGER,
    primaryKey: true,

  }
}, {
  timestamps: false
})

interface credential {
  username: string,
  password: string
}


const credential = JSON.parse(process.env.PG_CREDENTIALS || '{}') as credential

app.get('/', (req: Request, res: Response) => {
  Playlist.findAll().then((playlists)=>{
      res.json(playlists)
  })
})

app.get('/api/', (req: Request, res: Response) => {
  res.send(`curl 'http://localhost:80/fibonacci?n=43', ${credential.username}, ${credential.password}, ${process.env.PG_HOST}, ${process.env.PG_CREDENTIALS}`);
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