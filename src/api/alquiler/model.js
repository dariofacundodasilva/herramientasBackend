import mongoose, { Schema } from 'mongoose'

const alquilerSchema = new Schema({
  cliente: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  herramienta: { type: Schema.Types.ObjectId, ref: 'Herramienta' , required: true},
  proveedor: { type: Schema.Types.ObjectId, ref: 'Usuario' , required: true},
  monto: {type: Number},
  dias: {type:  Number},
  cantidad:{type:Number},
  estado:{type:  Number, default: 1 }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

alquilerSchema.methods = {
  view (full) {

    
    calcularPromedioReputacionHerramienta(this.herramienta);
    calcularPromedioReputacionCliente(this.cliente);
    const view = {
      id: this.id,
      cliente: this.cliente,
      promedioCliente:calcularPromedioReputacionCliente(this.cliente),
      herramienta: this.herramienta,
      promedioHerramienta:calcularPromedioReputacionHerramienta(this.herramienta),
      proveedor: this.proveedor,
      promedioProveedor:calcularPromedioReputacionProveedor(this.proveedor),
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

var calcularPromedioReputacionProveedor= function(proveedor){
  var promedio= 0;
  var reputacion = proveedor.reputacionProveedor;
  if(reputacion && reputacion.length > 0){
    reputacion.map((rep)=>{
      promedio = promedio + rep.puntaje;
    });
    promedio = promedio / reputacion.length;
  }
  
  return  promedio;
}

var calcularPromedioReputacionHerramienta= function(herramienta){
  var promedio= 0;
  var reputacion = herramienta.reputacion;
  if(reputacion && reputacion.length > 0){
    reputacion.map((rep)=>{
      promedio = promedio + rep.puntaje;
    });
    promedio = promedio / reputacion.length;
  }
  
  return  promedio;
}

var calcularPromedioReputacionCliente= function(cliente){
  var promedio= 0;
  var reputacion = cliente.reputacionUsuario;
  if(reputacion && reputacion.length > 0){
    reputacion.map((rep)=>{
      promedio = promedio + rep.puntaje;
    });
    promedio = promedio / reputacion.length;
  }
  
  return  promedio;
}



const model = mongoose.model('Alquiler', alquilerSchema)

export const schema = model.schema
export default model
