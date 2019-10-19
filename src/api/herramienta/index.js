import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Herramienta, { schema } from './model'

const router = new Router()
const { usuario, nombre, descripcion, precio, disponible, imagenes } = schema.tree

router.post('/', body({ usuario, nombre, descripcion, precio, disponible, imagenes }), create)

router.get('/', query({
	nombreLike:{
		type:String, paths: ['nombre'], operator: '$regex'
	}
}), index)

router.get('/:id', show)

router.put('/:id', body({ usuario, nombre, descripcion, precio, disponible, imagenes }), update)

router.delete('/:id', destroy)

export default router
