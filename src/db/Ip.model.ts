import { Sequelize, DataTypes } from 'sequelize';

export const defineIp = (seq: Sequelize) => {
  return seq.define(
    'Ip',
    {
      id: { type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true, },
      ip: { type: DataTypes.STRING, },
      voted: { type: DataTypes.INTEGER, defaultValue: 0 },

      // согласно ТЗ - тут просто тупо число голосов
      // проголосовал 10 раз - и больше не сможешь голосовать никогда :)
      //
      // ну ладно, можно было бы регулярно обнулять voted всем Ip,
      // у которых updatedAt старше такого-то времени
      //
      // или все-таки сделать поле voted_last с текущей датой-временем,
      // и после прошествия скажем суток с последнего голоса делаем voted = 0
      // в данном варианте - не регулярно, а при попытке голосовать 
      // (или получении любых view, где видно сколько тебе осталось голосов)
    },
    {
      indexes: [{
        unique: true,
        fields: ['ip'],
      }],
    }
  );
};
