import { success, notFound } from '../../services/response/'
import { Alquiler } from '.'
import { Herramienta } from '../herramienta/.'
import mongoose from 'mongoose';
import { sendNotification } from '../../services/fcm/'

export const create = ({ bodymen: { body } , params}, res, next) =>{
  Alquiler.create(body)
    .then((alquiler) => alquiler.view(true))
    .then(success(res, 201))
    .then((alquiler)=>{
      Herramienta.findById(body.herramienta).populate("usuario")
      .then( (herramienta) => {
        if(herramienta.usuario.fcmToken){

          sendNotification({
            to:herramienta.usuario.fcmToken,
            notification : {
              body : "Alquien quiere solitar tus herramientas: "+ herramienta.nombre,
              title: "Nueva solicitud de Alquiler"
            },
            show_notification:"true"
          });
        }
      })
    })
    .catch(next)
}


export const index = ({ querymen: { query, select, cursor }, params }, res, next) =>{
  evaluateQueryParamAlquiler(query, res.req.query);
  console.log("query",query);
  Alquiler.count(query)
      .then(
        count => Alquiler.find(query, select, cursor)
          .populate("cliente").populate("herramienta").populate("proveedor")
          .then((alquileres) => (alquileres.map((alquiler) => alquiler.view())))

      )
      
      .then(success(res))
      .catch(next)
}
  


export const show = ({ params }, res, next) =>{
  Alquiler.findById(params.id).populate("cliente").populate("heramienta").populate("proveedor")
    .then(notFound(res))
    .then((alquiler) => alquiler ? alquiler.view() : null)
    .then(success(res))
    .catch(next)
}
  

export const update = ({ bodymen: { body }, params }, res, next) =>{
  body.usuario= mongoose.Types.ObjectId(params.idUsuario);    
  Alquiler.findOneAndUpdate({"_id":params.id},{$set: bodyToUpdateDomicilio(body) })
    .then(notFound(res))
    .then((alquiler) => alquiler ? Alquiler.findById(params.id) : null)
    .then((alquiler) => alquiler ? alquiler.view(true) : null)
    .then(success(res))
    .catch(next);
}
  

export const destroy = ({ params }, res, next) =>
Alquiler.findById(params.id)
    .then(notFound(res))
    .then((alquiler) => alquiler ? alquiler.remove() : null)
    .then(success(res, 204))
    .catch(next)


var evaluateQueryParamAlquiler = function(query, queryParams){
  Object.keys(queryParams).forEach((key)=>{
      if( key == "cliente"){
        query.cliente = queryParams[key];
      }
      if( key == "herramienta"){
        query.herramienta = queryParams[key];
      }
      if( key == "proveedor"){
        query.proveedor = queryParams[key];
      }
      if( key == "estado"){
        query.estado = queryParams[key];
      }
      if( key == "pendiente"){
        query.estado = 1;
      }
      if( key == "enCurso"){
        query.estado = 2;
      }
      if( key == "finalizado"){
        query.estado = { $in: [3,4,5,6 ] }
      }
    }
  );
}

var bodyToUpdateDomicilio= function(body){
  var bodyUpdate={};
  if(body.monto != null){bodyUpdate.monto = body.monto};
  if(body.dias != null){bodyUpdate.dias = body.dias};
  if(body.estado != null){bodyUpdate.estado = body.estado};
  if(body.cantidad != null){bodyUpdate.cantidad = body.cantidad};
  return bodyUpdate;
}