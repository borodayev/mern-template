import { Request, Response, Application } from 'express';

const setupRoutes = (app: Application): void => {
  app.get('/', (_: Request, res: Response) => {
    res.sendFile('public/index.html', { root: __dirname });
  });
};

export default setupRoutes;
