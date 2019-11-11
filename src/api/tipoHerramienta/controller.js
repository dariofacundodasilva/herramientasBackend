import { success, notFound } from '../../services/response/'
import { TipoHerramienta } from '.'

export const create = ({ bodymen: { body } }, res, next) =>{
  TipoHerramienta.create(body)
    .then((tipoHerramienta) => tipoHerramienta.view(true))
    .then(success(res, 201))
    .catch(next)
}
  


export const index = ({ querymen: { query, select, cursor, } }, res, next) =>{
  
  //evaluateQueryParam(query, res.req.query); //funcionalidad propia para definir reglas de busqueda mediante queryParams
  var pagina = cursor.skip + 1;
  TipoHerramienta.count(query)
      .then(count => TipoHerramienta.find(query, select, cursor)
        .then((tipoHerramientas) => ({
          total:count,
          page:{
            pageNumber:pagina, 
            pageSize: cursor.limit
          },
          rows: tipoHerramientas.map((tipoHerramienta) => tipoHerramienta.view())
        }))
      )
      .then(success(res))
      .catch(next)
}
  


export const show = ({ params }, res, next) =>
  TipoHerramienta.findById(params.id)
    .then(notFound(res))
    .then((tipoHerramienta) => tipoHerramienta ? tipoHerramienta.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  TipoHerramienta.findById(params.id)
    .then(notFound(res))
    .then((tipoHerramienta) => tipoHerramienta ? Object.assign(tipoHerramienta, body).save() : null)
    .then((tipoHerramienta) => tipoHerramienta ? tipoHerramienta.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  TipoHerramienta.findById(params.id)
    .then(notFound(res))
    .then((tipoHerramienta) => tipoHerramienta ? tipoHerramienta.softdelete() : null)
    .then(success(res, 204))
    .catch(next)



  var evaluateQueryParam = function(query, queryParams){
    Object.keys(queryParams).forEach((key)=>{
      if( key == "nombreLike"){
        query.nombre = { $regex : new RegExp(queryParams[key], "i") }
      }
    }
  )}