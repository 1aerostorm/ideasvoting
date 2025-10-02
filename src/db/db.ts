import { Sequelize } from 'sequelize';
import config from 'config';

import { defineIdea } from '@db/Idea.model';
import { defineIp } from '@db/Ip.model';
import { defineIdeaVote } from '@db/IdeaVote.model';

import initIdeas from '@db/init/initIdeas';

const db: string = config.get('db.db');
const host: string = config.get('db.host');
const port: number = config.get('db.port');
const user: string = config.get('db.user');
const pass: string = config.get('db.pass');

export default class Database {
  public seq: Sequelize;
  public Idea: any;
  public Ip: any;
  public IdeaVote: any;

  constructor(init = true) {
    this.seq = new Sequelize(
      db,
      user,
      pass,
      {
        logging: false,
        host,
        port,
        dialect: 'mysql'
      },
    );
  }

  async initialize() {
    try {
      await this.seq.authenticate();
    } catch (err) {
      console.error('---DB--- Unable to connect:', err);
      throw err;
    }

    console.log('---DB--- Connected to DB.');

    this.initModels();
    this.initRelations();

    // alter надо отключать в продакшне и использовать лишь когда надо выкатить обновления
    // при обновлении как-то сообщать процессу, что надо сделать alter (именно единожды),
    // например создав файл "alter", который после альтера удалится,
    // и перезапускать его
    await this.seq.sync({ alter: true });

    console.log('---DB--- Sync done. Filling');

    await initIdeas(this);

    console.log('---DB--- Fill done.');
  }

  initModels() {
    this.Idea = defineIdea(this.seq);
    this.Ip = defineIp(this.seq);
    this.IdeaVote = defineIdeaVote(this.seq);
  }

  initRelations() {
    this.Idea.hasMany(this.IdeaVote, { targetKey: 'id', foreignKey: 'idea_id' });
    this.IdeaVote.belongsTo(this.Idea, { targetKey: 'id', foreignKey: 'idea_id' });

    this.Ip.hasMany(this.IdeaVote, { targetKey: 'id', foreignKey: 'ip_id' });
    this.IdeaVote.belongsTo(this.Ip, { targetKey: 'id', foreignKey: 'ip_id' });
  }

  async getIdeas(limit = 20, offset = 0, ip: any | null = null) {
    let include = [];
    if (ip) {
      include.push({
        model: this.IdeaVote,
        attributes: ['id'],
        where: {
          ip_id: ip.id,
        },
        required: false,
      });
    }
    const ideas = await this.Idea.findAll({
      limit,
      offset,
      order: [
        ['votes', 'DESC'],
        ['id', 'DESC'],
      ],
      include
    });
    return ideas;
  }

  async getIpData(ipStr: string, tx: any = null) {
    const obj = await this.Ip.findOne({
      where: { ip: ipStr },
    }, { transaction: tx });
    return obj;
  }

  async getOrCreateIpData(ipStr: string, tx: any = null) {
    const [obj, created] = await this.Ip.findOrCreate({
      where: { ip: ipStr },
      transaction: tx,
    });
    return obj;
  }

  async getIdea(idea_id: number, tx: any = null) {
    const obj = await this.Idea.findOne({
      where: { id: idea_id },
    }, { transaction: tx });
    return obj;
  }

  async voteIdea(idea : any, ip: any, tx: any = null) {
    await this.IdeaVote.create({
      idea_id: idea.id,
      ip_id: ip.id,
    }, { transaction: tx });

    ip.voted++;
    await ip.save({ transaction: tx });

    idea.votes++;
    await idea.save({ transaction: tx });
  }
}
