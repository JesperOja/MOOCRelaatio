import { Sequelize } from 'sequelize';
import { Umzug, SequelizeStorage } from 'umzug';
import { DATABASE_URL } from './config.js';

//const sequelize = new Sequelize("postgres://stgpjovn:9QlxfU7NZKp_rDoQdjYcEaNG20RyfTRv@mouse.db.elephantsql.com/stgpjovn");
const sequelize = new Sequelize(DATABASE_URL);

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'migrations/*.js'
    },
    storage: new SequelizeStorage({sequelize, tableName: 'migrations'}),
    context: sequelize.getQueryInterface(),
    logger: console
  })
  const migrations = await migrator.up();

  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name)
  });
}


const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations();
    console.log('database connected')
  } catch (err) {
    console.log('connecting database failed', err)
    return process.exit(1)
  }

  return null
}

export{ connectToDatabase, sequelize }