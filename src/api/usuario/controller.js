import { success, notFound } from '../../services/response/'
import { Usuario } from '.'

export const create = ({ bodymen: { body } }, res, next) =>{
  Usuario.create(body)
    .then((usuario) => usuario.view(true))
    .then(success(res, 201))
    .catch(next)
}
  


export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
  Usuario.count(query)
      .then(count => Usuario.find(query, select, cursor)
        .then((usuarios) => ({
          count,
          rows: usuarios.map((usuario) => usuario.view())
        }))
      )
      .then(success(res))
      .catch(next)

      console.log("query ", query);
}
  


export const show = ({ params }, res, next) =>
  Usuario.findById(params.id)
    .then(notFound(res))
    .then((usuario) => usuario ? usuario.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Usuario.findById(params.id)
    .then(notFound(res))
    .then((usuario) => usuario ? Object.assign(usuario, body).save() : null)
    .then((usuario) => usuario ? usuario.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Usuario.findById(params.id)
    .then(notFound(res))
    .then((usuario) => usuario ? usuario.remove() : null)
    .then(success(res, 204))
    .catch(next)
