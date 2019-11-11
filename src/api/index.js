import { Router } from 'express'
import usuario from './usuario'
import herramienta from './herramienta'
import domicilio from './domicilio'
import tipoHerramienta from './tipoHerramienta'


const router = new Router()

router.use('/', usuario)
router.use('/', domicilio)
router.use('/', tipoHerramienta)
router.use('/', herramienta)


export default router
