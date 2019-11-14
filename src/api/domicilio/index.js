import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Domicilio, { schema } from './model'

const router = new Router()
const { calle, nro, latitud, longitud, zona , codPostal} = schema.tree

router.post('/usuarios/:idUsuario/domicilios', body({ calle, nro, latitud, longitud, zona , codPostal}), create)


router.get('/usuarios/:idUsuario/domicilios/', query(), index)


router.get('/usuarios/:idUsuario/domicilios/:id', show)

router.put('/usuarios/:idUsuario/domicilios/:id', body({ calle, nro, latitud, longitud, zona, codPostal }), update)

router.delete('/usuarios/:idUsuario/domicilios/:id', destroy)



export default router
