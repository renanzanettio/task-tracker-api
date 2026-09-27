import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Task extends Model {
  declare id: number;
  declare nome: string;
  declare descricao: string | null;
  declare estimativa_tempo: number;
  declare deadline: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estimativa_tempo: {
      // Estimativa de tempo para conclusao da tarefa, em horas (nao precisa ser tãopreciso)
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deadline: {
      // Data limite para conclusao da tarefa
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
  },
);
