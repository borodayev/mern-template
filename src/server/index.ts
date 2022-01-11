import express, { Application } from 'express';
import path from 'path';
import morgan from 'morgan';
import connectionDriver from './db';
import setupRoutes from './routes';
import logger from './config/logger';

const app: Application = express();

connectionDriver
  .connect()
  .then(() => {
    logger.info(`Connected to ${process.env.DB_TYPE} database.`);
    app.emit('ready');
  })
  .catch((e) => {
    logger.error(e);
  });

app.on('ready', () => {
  app.use(
    morgan('tiny', {
      stream: {
        write(message: string) {
          logger.info(message);
        }
      }
    })
  );

  app.use(express.json());
  app.use(express.static(path.resolve(__dirname, 'public')));

  setupRoutes(app);

  app.listen(process.env.PORT, () =>
    logger.info(`App is running on ${process.env.PORT}.`)
  );
});

process.on('beforeExit', () => {
  connectionDriver.disconnect();
});
