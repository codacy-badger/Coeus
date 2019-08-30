// Import the dependencies for testing
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Application, stop } from '../../src/server'

// Configure chai
chai.use(chaiHttp)
chai.should()

describe('Basic Tests', () => {
  // eslint-disable-next-line
  before(async () => {
  })
  describe('Does API works', () => {
    it('must give a health check object', done => {
      chai
        .request(Application)
        .get('/healthcheck')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          done()
        })
    })
  })
  // eslint-disable-next-line
  // after(async () => {
  //  stop()
  // })
})
