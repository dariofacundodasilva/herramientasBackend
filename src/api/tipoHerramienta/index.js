import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export TipoHerramienta, { schema } from './model'

const router = new Router()
const { nombre, descripcion} = schema.tree

router.post('/herramientas/tipos', body({ nombre, descripcion }), create)

router.get('/herramientas/tipos', query(), index)

router.get('/herramientas/tipos/:id', show)

router.put('/herramientas/tipos/:id', body({  nombre, descripcion}), update)

router.delete('/herramientas/tipos/:id', destroy)

export default router
