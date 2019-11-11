import mongoose, { Schema } from 'mongoose'

const usuarioSchema = new Schema({
  email: { type: String , required : true},
  accessToken: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  dni:{
    tipo: {type: Number},
    numero:{type:Number}
  },
  telefonos:[{
    tipo: {type: Number},
    numero:{type:Number}
  }],
  reputacionVenta: [{
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
    comentario: { type: String },
    puntaje: {type: Number, min: 0, max: 5}
   }],
  reputacionAlquiler: [{ 
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
    comentario: { type: String },
    puntaje: {type: Number, min: 0, max: 5}
   }]
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
      dni: this.dni,
      telefonos: this.telefonos,
      reputacionVenta: this.reputacionVenta,
      promedioVenta:calcularPromedioReputacion(this.reputacionVenta),
      reputacionAlquiler: this.reputacionAlquiler,
      promedioAlquiler:calcularPromedioReputacion(this.reputacionAlquiler),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

var calcularPromedioReputacion= function(reputacion){
  var promedio= 0;
  if(reputacion && reputacion.length > 0){
    reputacion.map((rep)=>{
      promedio = promedio + rep.puntaje;
    });
    promedio = promedio / reputacion.length;
  }
  
  return promedio;
}

const model = mongoose.model('Usuario', usuarioSchema)

export const schema = model.schema
export default model
