import { success, notFound } from '../../services/response/'
import { Herramienta } from '.'

export const create = ({ bodymen: { body } }, res, next) =>{
  Herramienta.create(body)
    .then((herramienta) => herramienta.view(true))
    .then(success(res, 201))
    .catch(next)
}
  


export const index = ({ querymen: { query, select, cursor, } }, res, next) =>{
  console.log("query ", query);
  console.log("select ", select);
  console.log("cursor ", cursor);
  var pagina = cursor.skip + 1;
  Herramienta.count(query)
      .then(count => Herramienta.find(query, select, cursor).populate("usuario")
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
  Herramienta.findById(params.id)
    .then(notFound(res))
    .then((herramienta) => herramienta ? Object.assign(herramienta, body).save() : null)
    .then((herramienta) => herramienta ? herramienta.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Herramienta.findById(params.id)
    .then(notFound(res))
    .then((herramienta) => herramienta ? herramienta.softdelete() : null)
    .then(success(res, 204))
    .catch(next)
