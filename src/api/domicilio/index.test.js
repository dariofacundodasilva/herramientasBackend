import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Usuario } from '.'

const app = () => express(apiRoot, routes)

let usuario

beforeEach(async () => {
  usuario = await Usuario.create({})
})

test('POST /usuarios 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ email: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.email).toEqual('test')
})

test('GET /usuarios 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /usuarios/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${usuario.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(usuario.id)
})

test('GET /usuarios/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /usuarios/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${usuario.id}`)
    .send({ email: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(usuario.id)
  expect(body.email).toEqual('test')
})

test('PUT /usuarios/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ email: 'test' })
  expect(status).toBe(404)
})

test('DELETE /usuarios/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${usuario.id}`)
  expect(status).toBe(204)
})

test('DELETE /usuarios/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
