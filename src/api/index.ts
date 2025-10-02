import apiIdeas from '@api/ideas';
import apiVoting from '@api/voting';

export default function useApi(app: any, db: any) {
  apiIdeas(app, db);
  apiVoting(app, db);
};
