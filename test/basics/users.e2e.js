// Import the dependencies for testing
import chai, { expect } from 'chai'
import faker from 'faker'
import chaiHttp from 'chai-http'
import { Application, stop } from '../../src/server'
import User from '../../src/app/models/user'

const request = require("supertest")(Application);
// Configure chai
chai.use(chaiHttp)
chai.should()

const createdUsers = []

const userCredentials = {
  email: 'admin@admin.com',
  password: '12345'
}

const newUser = {
	name: faker.name.firstName(),
  email: faker.internet.email(),
  password: '12345',
	role: 'admin',
	phone: faker.phone.phoneNumber(),
	city:faker.address.city(),
	country: faker.address.country(),
}


describe('User tests', () => {
  describe('User List Check', () => {
    it('must give users list', done => {
      chai
        .request(Application)
        .post('/__/login')
        .send(userCredentials)
        .then(res => {
          res.should.have.status(200)
          request.get('/__/users')
            .set('Authorization', `Bearer ${res.body.token}`)
						.end((error, response) => {
							response.should.have.status(200)
							response.body.success.should.equal(true)
							done()
						})
        })
    })
  })
	
	describe('Add new user', () => {
		it('must give back the new users credentials', done => {
			chai
				.request(Application)
				.post('/__/login')
				.send(userCredentials)
				.then(res => {
					res.should.have.status(200)
					request.post('/__/users')
						.set('Authorization', `Bearer ${res.body.token}`)
						.send(newUser)
						.end((error, response) => {
							createdUsers.push(response.body.data.id)
							response.should.have.status(201)
							response.body.success.should.equal(true)
							done()
						})
				})
		})
	})
	// eslint-disable-next-line
	after(() => {
	// We have to clean our mess.
	createdUsers.forEach(id => {
		User.findByIdAndRemove(id, err => {
			if (err) {
				console.log(err)
			}
		})
	})
})
})
