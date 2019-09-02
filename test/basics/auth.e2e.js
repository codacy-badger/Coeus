// Import the dependencies for testing
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { Application, stop } from '~/server'

// Configure chai
chai.use(chaiHttp)
chai.should()

const userCredentials = {
  email: 'admin@admin.com', 
  password: '12345'
}

const wrongUserCredentials = {
  email: 'sponge@bob.com', 
  password: 'garyTheSnail'
}


describe('Auth tests', () => {
  describe('Login Check', () => {
    it('must give a object with token', done => {
      chai
        .request(Application)
        .post('/__/auth/login')
        .send(userCredentials)
        .end((err, res) => {
          res.should.have.status(200)
          // console.log(res.body.data.token)
          // TODO: Must adding a validation for token. id:53
          // - <https://github.com/stevenselcuk/Coeus/issues/26>
          // Steven J. Selcuk
          // stevenjselcuk@gmail.com
          res.body.should.be.a('object')
          done()
        })
    })
  })
  
  describe('Denied Login Check', () => {
    it('must return an object which includes USER_DOES_NOT_EXIST msg', done => {
      chai
        .request(Application)
        .post('/__/auth/login')
        .send(wrongUserCredentials)
        .end((err, res) => {
          res.should.have.status(401)
          res.body.should.be.a('object')
          done()
        })
    })
  })
})
