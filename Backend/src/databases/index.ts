  import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';
import InventaryModel from '@/models/inventary.model';
import BookingModel from '@/models/booking.model';
import TypeElementModel from '@/models/typeElement.model';
import StatusesModel from '@/models/status.model';
import DependenciesModel from '@/models/dependencies.model';
import TypeBooking from '@/models/typeBooking.model';
import TypeService from '@/models/typeService.model';
import BillingModel from '@/models/billing.model';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // En caso de que el certificado SSL no sea válido
    }
  },
  synchronize: true,
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

const DB = {
  Users: UserModel(sequelize),
  Inventary: InventaryModel(sequelize),
  TypeElement: TypeElementModel(sequelize),
  Statuses: StatusesModel(sequelize),
  Dependencies: DependenciesModel(sequelize),
  Booking: BookingModel(sequelize),
  TypeBooking: TypeBooking(sequelize),
  TypeService: TypeService(sequelize),
  Billing: BillingModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};

DB.Inventary.hasOne(DB.TypeElement, { foreignKey: 'idtypeElement', sourceKey: 'typeElement' });
DB.Inventary.hasOne(DB.Statuses, { foreignKey: 'idstatus', sourceKey: 'stateElement' });
DB.Inventary.hasOne(DB.Dependencies, { foreignKey: 'iddependency', sourceKey: 'dependencyElement' });
DB.Booking.hasOne(DB.TypeBooking, { foreignKey: 'idbooking', sourceKey: 'typeBooking' });
DB.Booking.hasOne(DB.TypeService, { foreignKey: 'idservice', sourceKey: 'typeService' });
DB.Booking.hasOne(DB.Statuses, { foreignKey: 'idstatus', sourceKey: 'stateBooking' });
DB.Billing.hasOne(DB.Statuses, { foreignKey: 'idstatus', sourceKey: 'stateBilling' });

export default DB;


