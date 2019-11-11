import mongoose, { Schema } from 'mongoose'

const herramientaSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  nombre: { type: String , required: true},
  descripcion: {type: String, required: true},
  precio: {type: Number, required: true},
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
      tipoHerramienta:this.tipoHerramienta,
      reputacion: this.reputacion,
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


const model = mongoose.model('Herramienta', herramientaSchema)

export const schema = model.schema
export default model
