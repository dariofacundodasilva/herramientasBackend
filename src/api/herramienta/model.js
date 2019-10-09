import mongoose, { Schema } from 'mongoose'
//import Usuario from '../usuario/model'

const herramientaSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  nombre: { type: String , required: true},
  descripcion: {type: String, required: true},
  precio: {type: Number, required: true},
  disponible: {type:  Boolean, default: false},
  imagenes:[{type:String}]
}, {
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
