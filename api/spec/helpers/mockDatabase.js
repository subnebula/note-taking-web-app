// Turn off Bluebird's forgotten return warnings as Jasmine causes them to spam
// the output while running tests
process.env.BLUEBIRD_W_FORGOTTEN_RETURN = 0;

const Promise = require('bluebird');

const SequelizeMocking = require('sequelize-mocking').SequelizeMocking;

const mockDatabase = {};

mockDatabase.mock = (originalDb, fixturePaths) => {
  if(typeof fixturePaths === 'string' || fixturePaths instanceof String) {
    fixturePaths = [fixturePaths];
  }

  return SequelizeMocking.create(originalDb, { logging: false })
    .then(mocked => Promise.mapSeries(fixturePaths, fixturePath =>
      SequelizeMocking.loadFixtureFile(mocked, fixturePath, { logging: false }))
      .then(() => mocked))
    .then(mocked => { mockDatabase.db = mocked; });
};

mockDatabase.unmock = () =>
  mockDatabase.db.getQueryInterface()
    .dropAllTables({ logging: false })
    .then(() => {
      SequelizeMocking.unhookNewModel(mockDatabase.db);

      if(mockDatabase.db.__originalSequelize) {
        SequelizeMocking.modifyModelReferences(
          mockDatabase.db, mockDatabase.db.__originalSequelize);
        delete mockDatabase.db.__originalSequelize;
      }
    })
;

mockDatabase.useWithJasmine = (originalDb, fixturePath) => {
  beforeEach(done => {
    mockDatabase.mock(originalDb, fixturePath).catch(console.error).then(done);
  });

  afterEach(done => {
    mockDatabase.unmock().catch(console.error).then(done);
  });
};

module.exports = mockDatabase;
