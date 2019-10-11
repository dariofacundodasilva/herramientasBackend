import { success, notFound } from '../../services/response/'
import { Domicilio } from '.'

export const create = ({ bodymen: { body } }, res, next) =>{
  Herramienta.create(body)
    .then((domicilio) => domicilio.view(true))
    .then(success(res, 201))
    .catch(next)
}
  


export const index = ({ querymen: { query, select, cursor, } }, res, next) =>{
  console.log("query ", query);
  console.log("select ", select);
  console.log("cursor ", cursor);
  var pagina = cursor.skip + 1;
  Domicilio.count(query)
      .then(count => Domicilio.find(query, select, cursor).populate("usuario", "email")
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
  


export const show = ({ params }, res, next) =>
  Domicilio.findById(params.id)
    .then(notFound(res))
    .then((domicilio) => domicilio ? domicilio.view() : null)
    .then(success(res))
    .catch(next)

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
