import { success, notFound } from '../../services/response/'
import { Usuario } from '.'

export const create = ({ bodymen: { body } }, res, next) =>{

  Usuario.findOne({"email":body.email})
      .then(usuario => usuario ? usuario.view() : Usuario.create(body).then((usuario) => usuario.view(true)) )
      .then(success(res))
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
}

export const show = ({ params }, res, next) =>
  Usuario.findById(params.id)
    .then(notFound(res))
    .then((usuario) => usuario ? usuario.view() : null)
    .then(success(res))
    .catch(next);

export const update = ({ bodymen: { body }, params }, res, next) =>

  Usuario.findOneAndUpdate({"_id":params.id},{$set: bodyToUpdateUsuario(body) })
    .then(notFound(res))
    .then((usuario) => usuario ? Usuario.findById(usuario._id) : null)
    .then((usuario) => usuario ? usuario.view(true) : null)
    .then(success(res))
    .catch(next);

export const destroy = ({ params }, res, next) =>
  Usuario.findById(params.id)
    .then(notFound(res))
    .then((usuario) => usuario ? usuario.remove() : null)
    .then(success(res, 204))
    .catch(next);

export const createReputacion = ({ bodymen: { body }, params }, res, next) =>{
  Usuario.findOneAndUpdate({"_id":params.idUsuario},{$push: { reputacionAlquiler: body.reputacionAlquiler, reputacionVenta: body.reputacionVenta} })
    .then(notFound(res))
    .then((usuario) => usuario ? Usuario.findById(usuario._id) : null)
    .then((usuario) => usuario ? usuario.view(true) : null)
    .then(success(res))
    .catch(next)
}


var bodyToUpdateUsuario= function(body){
  var bodyUpdate={};
  
  if(body.accessToken != null){bodyUpdate.accessToken = body.accessToken};
  if(body.nombre != null){bodyUpdate.nombre = body.nombre};
  if(body.apellido != null){bodyUpdate.apellido = body.apellido};
  if(body.dni != null){bodyUpdate.accessToken = body.dni};
  if(body.telefonos != null){bodyUpdate.telefonos = body.telefonos};

  return bodyUpdate;
}