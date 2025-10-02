import { Sequelize, DataTypes } from 'sequelize';

export const defineIdeaVote = (seq: Sequelize) => {
  return seq.define(
    'IdeaVote',
    {
      id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, },
      idea_id: { type: DataTypes.INTEGER, },
      ip_id: { type: DataTypes.INTEGER, },
    },
    {
      indexes: [{
        fields: ['idea_id'],
      }, {
        fields: ['ip_id'],
      }, {
        unique: true,
        fields: ['ip_id', 'idea_id']
      }],
    }
  );
};
