import mongoose, { Schema } from 'mongoose'

const herramientaSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  domicilio: { 
    calle: {type: String},
    nro:   {type: String},
    zona:  {type: String},
    codPostal: {type: String}
  },
  nombre: { type: String , required: true},
  descripcion: {type: String, required: true},
  precio: {type: Number, required: true},
  cantidad:{type: Number, required: true},
  disponible: {type: Number},
  imagenes:[{type:String}],
  tipoHerramienta: { type: Schema.Types.ObjectId, ref: 'TipoHerramienta' },
  reputacion: [{
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
    comentario: { type: String },
    puntaje: {type: Number, min: 0, max: 5}
   }]
  }, 
  {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

herramientaSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      usuario: this.usuario,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      imagenes:this.imagenes,
      cantidad: this.cantidad,
      tipoHerramienta:this.tipoHerramienta,
      reputacion: this.reputacion,
      promedio:calcularPromedio(this.reputacion),
      domicilio:this.domicilio,
      disponible: this.disponible,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

var calcularPromedio= function(reputacion){
  var promedio= 0;
  if(reputacion && reputacion.length > 0){
    reputacion.map((rep)=>{
      promedio = promedio + rep.puntaje;
    });
    promedio = promedio / reputacion.length;
  }
  
  return promedio;
}


const model = mongoose.model('Herramienta', herramientaSchema)

export const schema = model.schema
export default model
