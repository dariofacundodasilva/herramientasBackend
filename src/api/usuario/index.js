import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy , createReputacion} from './controller'
import { schema } from './model'
export Usuario, { schema } from './model'

const router = new Router()
const { email, accessToken, nombre, apellido, dni , telefonos, reputacionVenta, reputacionAlquiler} = schema.tree


router.post('/usuarios/', body({ email, accessToken, nombre, apellido, dni, telefonos, reputacionVenta, reputacionAlquiler }), create)

router.post('/usuarios/:idUsuario/reputacion', body({ reputacionVenta, reputacionAlquiler }), createReputacion)


router.get('/usuarios/', query(), index)


router.get('/usuarios/:id', show)


router.put('/usuarios/:id',body({ email, accessToken, nombre, apellido, dni, telefonos, reputacionVenta, reputacionAlquiler }), update)


router.delete('/usuarios/:id', destroy)


export default router
