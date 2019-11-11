import { success, notFound } from '../../services/response/'
import { Reputacion } from '.'
import mongoose from 'mongoose';

export const create = ({ bodymen: { body } , params}, res, next) =>{
  body.usuario = mongoose.Types.ObjectId(params.idUsuario);
  Domicilio.create(body)
    .then((domicilio) => domicilio.view(true))
    .then(success(res, 201))
    .catch(next)
}


export const index = ({ querymen: { query, select, cursor, }, params }, res, next) =>{
  query.usuario= mongoose.Types.ObjectId(params.idUsuario);
  console.log("params",params);
  console.log("pepe",res.req.query);
  evaluateQueryParam(query, res.req.query);
  console.log("query",query);
  var pagina = cursor.skip + 1;
  Domicilio.count(query)
      .then(count => Domicilio.find(query, select, cursor)
        .then((domicilios) => ({
          total:count,
          page:{
            pageNumber:pagina, 
            pageSize: cursor.limit
          },
          rows: domicilios.map((domicilio) => domicilio.view())
        }))
      )
      .then(success(res))
      .catch(next)
}
  


export const show = ({ params }, res, next) =>{
  Domicilio.findById(params.id).populate("usuario", "email")
    .then(notFound(res))
    .then((domicilio) => domicilio ? domicilio.view() : null)
    .then(success(res))
    .catch(next)
}
  

export const update = ({ bodymen: { body }, params }, res, next) =>
  Domicilio.findById(params.id)
    .then(notFound(res))
    .then((domicilio) => domicilio ? Object.assign(domicilio, body).save() : null)
    .then((domicilio) => domicilio ? domicilio.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Domicilio.findById(params.id)
    .then(notFound(res))
    .then((domicilio) => domicilio ? domicilio.remove() : null)
    .then(success(res, 204))
    .catch(next)


var evaluateQueryParam = function(query, queryParams){
  Object.keys(queryParams).forEach((key)=>{
    if( key == "calleLike"){
      query.calle = { $regex : new RegExp(queryParams[key], "i") }
    }
  }
);
  
}
