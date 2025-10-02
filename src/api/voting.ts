import { Transaction, UniqueConstraintError } from 'sequelize';
import { getIP, HttpError } from '@utils/misc';

const MAX_VOTES = 10;

export default function apiVoting(app: any, db: any) {
  app.post('/api/ideas/:id/vote', async (req: any, res: any) => {
    const ip = getIP(req);

    const { id } = req.params;

    try {
      await db.seq.transaction(async (tx: Transaction) => {
        const idea = await db.getIdea(id, tx);
        if (!idea) throw new HttpError('Эта идея удалена или ее и не было.', 404);

        const ipData = await db.getOrCreateIpData(ip, tx);
        if (ipData?.voted >= MAX_VOTES) throw new HttpError('Вы исчерпали лимит голосов за идеи.', 409);

        try {
          await db.voteIdea(idea, ipData, tx);
        } catch (err: any) {
          if (err instanceof UniqueConstraintError) {
            throw new HttpError('Вы уже проголосовали за эту идею.', 409);
          }
          throw err;
        }
      });
    } catch (err: any) {
      console.error(err);
      res.status(err.status || 500).json({ error: err.message });
      return;
    }

    res.send({ status: 'ok' });
  });
}
