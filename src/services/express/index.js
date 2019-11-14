import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env, fileHost } from '../../config'
import fileUpload from 'express-fileupload'

const http = require('http');
const https = require('https');
const request = require('request');
var rp = require('request-promise');

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
    app.use(fileUpload());
  }

  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
  app.use(bodyParser.json({limit: '50mb', extended: true}))
  app.use(apiRoot, routes)
  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  app.post('/upload/v2', function(req, res) {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    console.log("req.files",req.files);
    let sampleFile = req.files.file;
    console.log("sampleFile",sampleFile);

    var options = {
      method: 'POST',
      uri: fileHost,
      formData:{
        file: {
          value: sampleFile.data,
          options: {
              filename: sampleFile.name,
              contentType: sampleFile.mimetype
          }
        }
      },
      headers: {
          /* 'content-type': 'multipart/form-data' */ // Is set automatically
      }
    };

    rp(options)
    .then(function (body) {
      console.log("body",body);
      return res.status(200).send(body);
    })
    .catch(function (err) {
      console.log("err",err);
      return res.status(500).send(err);
    });

  });

  return app
}
