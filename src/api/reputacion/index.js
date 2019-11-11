import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Reputacion, { schema } from './model'

const router = new Router()
const { calle, nro, latitud, longitud, zona } = schema.tree
/*
router.post('/usuarios/:idUsuario/reputaciones', body({ usuario, comentario, puntaje}), create)

router.get('/usuarios/:idUsuario/reputaciones/', query(), index)

router.get('/usuarios/:idUsuario/reputaciones/:id', show)

router.put('/usuarios/:idUsuario/reputaciones/:id', body({ usuario, comentario, puntaje}), update)

router.delete('/usuarios/:idUsuario/reputaciones/:id', destroy)
*/


export default router
