/* eslint-disable no-unused-vars */
import path from 'path'
import merge from 'lodash/merge'

/* istanbul ignore next */
const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable')
  }
  return process.env[name]
}

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'production') {
  const dotenv = require('dotenv-safe')
  dotenv.load({
    path: path.join(__dirname, '../.env'),
    sample: path.join(__dirname, '../.env.example')
  })
}

const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    fileHost: process.env.FILE_HOST || "http://www.mercadolibre.com.ar/sell/picture/upload?siteId=MLA",
    apiRoot: process.env.API_ROOT || '',
    masterKey: requireProcessEnv('MASTER_KEY'),
    fcmAuthorization: process.env.FCM_AUTHORIZATION || "key=AAAAlxTWuGY:APA91bF-S-JMqFIBTJ-lWCqAeItUN9K2MocS-jGN52RWZUNe2LPtB7Jx-xCscm9_QA0XnQLvOPN_gYGq2jTuEg6lkwOtjllYIklrWJQ0ROYriXGgoyENDDip9klyJP7zAHmhyj_8rCh6",
    mongo: {
      options: {
        db: {
          safe: true
        }
      }
    }
  },
  test: { },
  development: {
    mongo: {
      uri: 'mongodb://desa:123456789desa@ds139619.mlab.com:39619/mis-herramientas',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/herramientas-backend'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
export default module.exports
