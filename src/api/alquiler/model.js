import mongoose, { Schema } from 'mongoose'

const alquilerSchema = new Schema({
  cliente: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  herramienta: { type: Schema.Types.ObjectId, ref: 'Herramienta' , required: true},
  proveedor: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  monto: {type: Number},
  dias: {type:  Number},
  cantidad:{type:Number},
  estado:{type:  Number}
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

alquilerSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      cliente: this.cliente,
      herramienta: this.herramienta,
      proveedor: this.proveedor,
      monto: this.monto,
      cantidad:this.cantidad,
      dias: this.dias,
      estado:this.estado,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}


const model = mongoose.model('Alquiler', alquilerSchema)

export const schema = model.schema
export default model
