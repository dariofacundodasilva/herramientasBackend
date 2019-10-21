import mongoose, { Schema } from 'mongoose'

const usuarioSchema = new Schema({
  email: { type: String , required : true},
  accessToken: { type: String },
  nombre: { type: String },
  apellido: { type: String }

}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

usuarioSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      accessToken: this.accessToken,
      nombre: this.nombre,
      apellido: this.apellido,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Usuario', usuarioSchema)

export const schema = model.schema
export default model
