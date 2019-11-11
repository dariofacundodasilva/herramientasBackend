import mongoose, { Schema } from 'mongoose'

const tipoHerramientaSchema = new Schema({
  nombre: { type: String , required: true},
  descripcion: {type: String, required: true}
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

tipoHerramientaSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('TipoHerramienta', tipoHerramientaSchema)

export const schema = model.schema
export default model
