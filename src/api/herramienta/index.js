import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy, createReputacion } from './controller'
import { schema } from './model'
export Herramienta, { schema } from './model'

const router = new Router()
const { usuario, domicilio, nombre, descripcion, precio, disponible, imagenes , tipoHerramienta, reputacion, cantidad} = schema.tree

router.post('/herramientas/', body({ usuario, domicilio, nombre, descripcion, precio, disponible, imagenes , tipoHerramienta, reputacion, cantidad}), create)

router.post('/herramientas/:id/reputacion', body({ reputacion }), createReputacion)

router.get('/herramientas/', query(), index)

router.get('/herramientas/:id', show)

router.put('/herramientas/:id', body({  nombre,domicilio, descripcion, precio, disponible, imagenes, tipoHerramienta , reputacion, cantidad}), update)

router.delete('/herramientas/:id', destroy)

export default router
