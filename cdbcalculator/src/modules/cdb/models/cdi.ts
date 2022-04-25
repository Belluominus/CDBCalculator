import mongoose from 'mongoose';

interface ICDIAttrs {
  sSecurityName: string;
  dtDate: string;
  dLastTradePrice: string;
}
interface ICDIModel extends mongoose.Model<ICDIDoc> {
  build(attrs: ICDIAttrs): ICDIDoc;
}
interface ICDIDoc extends mongoose.Document {
  sSecurityName: string;
  dtDate: string;
  dLastTradePrice: string;
}

const cdiSchema = new mongoose.Schema({
  sSecurityName: {
    type: String,
    required: true,
  },
  dtDate: {
    type: String,
    required: true,
  },
  dLastTradePrice: {
    type: String,
    required: true,
  },
});
cdiSchema.statics.build = (attrs: ICDIAttrs) => {
  return new CDI(attrs);
};

const CDI = mongoose.model<ICDIDoc, ICDIModel>('cdi', cdiSchema);

export { CDI };
