import mongoose, { Schema } from 'mongoose'

const reputacionSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  comentario: { type: String , required: true},
  puntaje: {type: Number, min: 0, max: 5}
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

reputacionSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      usuario: this.usuario,
      comentario: this.comentario,
      puntaje: this.puntaje,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Reputacion', reputacionSchema)

export const schema = model.schema
export default model
