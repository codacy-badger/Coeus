import conf from '../../core/config';

const crypto = require('crypto');

const algorithm = 'aes-256-cbc' 
const secret = conf.get('JWT_SECRET') // Must be 256 bits (32 characters)
const iv = crypto.randomBytes(16); // Initialization vector.

module.exports = {
  /**
   * Checks is password matches
   * @param {string} password - password
   * @param {Object} user - user object
   * @returns {boolean}
   */
  async checkPassword(password, user) {
    return new Promise((resolve, reject) => {
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          reject(this.buildErrObject(422, err.message))
        }
        if (!isMatch) {
          resolve(false)
        }
        resolve(true)
      })
    })
  },

  /**
   * Encrypts text
   * @param {string} text - text to encrypt
   */
  encrypt(text) {
    const cipher = crypto.createCipheriv(algorithm, secret, iv )
    let crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex')
    return crypted
  },

  /**
   * Decrypts text
   * @param {string} text - text to decrypt
   */
  decrypt(text) {
    const decipher = crypto.createDecipheriv(algorithm, secret, iv)
    try {
      let dec = decipher.update(text, 'hex', 'utf8')
      dec += decipher.final('utf8')
      return dec
    } catch (err) {
      return err
    }
  }
}
