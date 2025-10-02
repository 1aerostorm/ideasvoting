import { getIP, limitOffset } from '@utils/misc';
import ideaView from '@views/Idea.view';

export default function apiIdeas(app: any, db: any) {
  app.get('/api/ideas', async (req: any, res: any) => {
    const { limit, offset } = limitOffset(req.query.limit, req.query.offset);

    const ip = getIP(req);
    const ipData = await db.getIpData(ip);

    const objs = await db.getIdeas(limit, offset, ipData);

    const ideas: any[] = objs.map((obj: any) => {
      return ideaView(obj);
    });

    res.send({
      status: 'ok',
      ideas,
    });
  });
}