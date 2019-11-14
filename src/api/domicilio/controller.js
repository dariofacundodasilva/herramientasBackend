import { success, notFound } from '../../services/response/'
import { Domicilio } from '.'
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
  evaluateQueryParamDomicilio(query, res.req.query);
  console.log("query",query);
  var pagina = cursor.skip + 1;
  Domicilio.count(query)
      .then(count => Domicilio.find(query, select, cursor)
        .then((domicilios) => (domicilios.map((domicilio) => domicilio.view())))
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
  

export const update = ({ bodymen: { body }, params }, res, next) =>{
  body.usuario= mongoose.Types.ObjectId(params.idUsuario);    
  Domicilio.findOneAndUpdate({"_id":params.id},{$set: bodyToUpdateDomicilio(body) })
    .then(notFound(res))
    .then((domicilio) => domicilio ? Domicilio.findById(params.id) : null)
    .then((domicilio) => domicilio ? domicilio.view(true) : null)
    .then(success(res))
    .catch(next);
}
  

export const destroy = ({ params }, res, next) =>
  Domicilio.findById(params.id)
    .then(notFound(res))
    .then((domicilio) => domicilio ? domicilio.remove() : null)
    .then(success(res, 204))
    .catch(next)


var evaluateQueryParamDomicilio = function(query, queryParams){
  Object.keys(queryParams).forEach((key)=>{
    if( key == "calleLike"){
      query.calle = { $regex : new RegExp(queryParams[key], "i") }
    }
  }
);


var bodyToUpdateDomicilio= function(body){
  var bodyUpdate={};
  if(body.calle != null){bodyUpdate.calle = body.calle};
  if(body.nro != null){bodyUpdate.nro = body.nro};
  if(body.latitud != null){bodyUpdate.latitud = body.latitud};
  if(body.longitud != null){bodyUpdate.longitud = body.longitud};
  if(body.zona != null){bodyUpdate.zona = body.zona};
  if(body.codPostal != null){bodyUpdate.codPostal = body.codPostal};
  return bodyUpdate;
}
  
}
