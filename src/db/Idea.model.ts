import { Sequelize, DataTypes } from 'sequelize';

export const defineIdea = (seq: Sequelize) => {
  return seq.define(
    'Idea',
    {
      id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, },
      header: { type: DataTypes.STRING, },
      desc: { type: DataTypes.TEXT, },
      votes: { type: DataTypes.INTEGER, defaultValue: 0, },
    },
    {
      indexes: [{
        fields: ['votes'],
      }],
    }
  );
};
