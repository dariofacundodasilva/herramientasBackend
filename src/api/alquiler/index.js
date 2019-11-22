import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Alquiler, { schema } from './model'

const router = new Router()
const { usuario, herramienta, monto, dias, estado } = schema.tree

router.post('/alquileres', body({ usuario, herramienta, monto, dias, estado}), create)

router.get('/alquileres/', query(), index)

router.get('/alquileres/:id', show)

router.put('/alquileres/:id', body({ usuario, herramienta, monto, dias, estado }), update)

router.delete('/alquileres/:id', destroy)



export default router
