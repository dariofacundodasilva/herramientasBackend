import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy , createReputacion} from './controller'
import { schema } from './model'
export Usuario, { schema } from './model'

const router = new Router()
const { email, accessToken,fcmToken, nombre, apellido, documento , telefonos, reputacionProveedor, reputacionUsuario} = schema.tree


router.post('/usuarios/', body({ email, accessToken, fcmToken, nombre, apellido, documento, telefonos, reputacionProveedor, reputacionUsuario }), create)

router.post('/usuarios/:idUsuario/reputacion', body({ reputacionProveedor, reputacionUsuario }), createReputacion)


router.get('/usuarios/', query(), index)


router.get('/usuarios/:id', show)


router.put('/usuarios/:id',body({ email, accessToken, fcmToken, nombre, apellido, documento, telefonos, reputacionProveedor, reputacionUsuario }), update)


router.delete('/usuarios/:id', destroy)


export default router
