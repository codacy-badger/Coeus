import conf from '../../src/core/config'
import { Seeder } from 'mongo-seeding';

const path = require('path');

const config = {
  database: 'mongodb://localhost:27017/coeusTest',
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