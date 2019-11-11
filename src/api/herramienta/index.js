import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Herramienta, { schema } from './model'

const router = new Router()
const { usuario, nombre, descripcion, precio, disponible, imagenes , tipoHerramienta, reputacion} = schema.tree

router.post('/herramientas/', body({ usuario, nombre, descripcion, precio, disponible, imagenes , tipoHerramienta, reputacion}), create)

router.get('/herramientas/', query(), index)

router.get('/herramientas/:id', show)

router.put('/herramientas/:id', body({  nombre, descripcion, precio, disponible, imagenes, tipoHerramienta , reputacion}), update)

router.delete('/herramientas/:id', destroy)

export default router
