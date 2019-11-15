import { success, notFound } from '../../services/response/'
import { Herramienta } from '.'

export const create = ({ bodymen: { body } }, res, next) =>{
  Herramienta.create(body)
    .then((herramienta) => herramienta.view(true))
    .then(success(res, 201))
    .catch(next)
}
  


export const index = ({ querymen: { query, select, cursor, } }, res, next) =>{
  evaluateQueryParamHerramienta(query, res.req.query);
  var pagina = cursor.skip + 1;
  Herramienta.count(query)
      .then(count => Herramienta.find(query, select, cursor).populate("usuario").populate("tipoHerramienta")
        .then((herramientas) => ({
          total:count,
          page:{
            pageNumber:pagina, 
            pageSize: cursor.limit
          },
          rows: herramientas.map((herramienta) => herramienta.view())
        }))
      )
      .then(success(res))
      .catch(next)
}
  


export const show = ({ params }, res, next) =>
  Herramienta.findById(params.id)
    .then(notFound(res))
    .then((herramienta) => herramienta ? herramienta.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Herramienta.findOneAndUpdate({"_id":params.id},{$set: bodyToUpdateHerramienta(body) })
    .then(notFound(res))
    .then((herramienta) => herramienta ? Herramienta.findById(herramienta._id) : null)
    .then((herramienta) => herramienta ? herramienta.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Herramienta.findById(params.id)
    .then(notFound(res))
    .then((herramienta) => herramienta ? herramienta.remove() : null)
    .then(success(res, 204))
    .catch(next)



  var evaluateQueryParamHerramienta = function(query, queryParams){
    Object.keys(queryParams).forEach((key)=>{
      if( key == "nombreLike"){
        query.nombre = { $regex : new RegExp(queryParams[key], "i") }
      }

      if( key == "usuario"){
        query.usuario = queryParams[key];
      }
    }
  )}

  var bodyToUpdateHerramienta= function(body){
    var bodyUpdate={};
    
    if(body.nombre != null){bodyUpdate.nombre = body.nombre};
    if(body.domicilio != null){bodyUpdate.domicilio = body.domicilio};
    if(body.descripcion != null){bodyUpdate.descripcion = body.descripcion};
    if(body.precio != null){bodyUpdate.precio = body.precio};
    if(body.disponible != null){bodyUpdate.disponible = body.disponible};
    if(body.imagenes != null){bodyUpdate.imagenes = body.imagenes};
    if(body.tipoHerramienta != null){bodyUpdate.tipoHerramienta = body.tipoHerramienta};
    if(body.cantidad != null){bodyUpdate.cantidad = body.cantidad};
  
    return bodyUpdate;
  }