import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Domicilio, { schema } from './model'

const router = new Router()
const { usuario, calle, nro, latitud, longitud } = schema.tree

router.post('/', body({ usuario, calle, nro, latitud, longitud }), create)

router.get('/', query(), index)

router.get('/:id', show)

router.put('/:id', body({ usuario, calle, nro, latitud, longitud }), update)

router.delete('/:id', destroy)

export default router
