import conf from '../../src/core/config'
import { Seeder } from 'mongo-seeding';

const path = require('path');

const config = {
  database: conf.get('IS_TEST') ? conf.get('MONGODB_TEST_URI') : conf.get('MONGODB_URI'),
  inputPath: path.resolve(__dirname, './tools/seeder/data'),
  dropDatabase: true
}
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve('./tools/seeder/data'));

const main = async () => {
  try {
    await seeder.import(collections)
    console.log('Seed complete!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(0)
  }
}

main();