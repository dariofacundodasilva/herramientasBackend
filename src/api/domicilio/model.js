import mongoose, { Schema } from 'mongoose'

const domicilioSchema = new Schema({
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  calle: { type: String , required: true},
  nro: {type: String, required: true},
  latitud: {type: Number},
  longitud: {type:  Number},
  codPostal: {type: Number},
  zona:{
    id:{type: Number},
    nombre:{ type:String}
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

domicilioSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      usuario: this.usuario,
      calle: this.calle,
      nro: this.nro,
      latitud: this.latitud,
      longitud:this.longitud,
      zona:this.zona,
      codPostal: this.codPostal,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}


const model = mongoose.model('Domicilio', domicilioSchema)

export const schema = model.schema
export default model
