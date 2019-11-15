import mongoose, { Schema } from 'mongoose'

const usuarioSchema = new Schema({
  email: { type: String , required : true},
  accessToken: { type: String },
  nombre: { type: String },
  apellido: { type: String },
  documento:{
    tipo: {type: Number},
    numero:{type:String}
  },
  telefonos:[{
    tipo: {type: Number},
    numero:{type:Number}
  }],
  reputacionProveedor: [{
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
    comentario: { type: String },
    puntaje: {type: Number, min: 0, max: 5}
   }],
  reputacionUsuario: [{ 
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

//usuarioSchema.index({documento: 1}, {unique: true});

usuarioSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      accessToken: this.accessToken,
      nombre: this.nombre,
      apellido: this.apellido,
      documento: this.documento,
      telefonos: this.telefonos,
      reputacionProveedor: this.reputacionProveedor,
      promedioProveedor:calcularPromedioReputacion(this.reputacionProveedor),
      reputacionUsuario: this.reputacionUsuario,
      promedioUsuario:calcularPromedioReputacion(this.reputacionUsuario),
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
