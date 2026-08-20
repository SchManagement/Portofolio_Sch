export default async function handler(req,res){
  if(!["GET","POST"].includes(req.method)) return res.status(405).json({error:"Method not allowed"});
  const configured=Boolean(process.env.WHATSAPP_PROVIDER_BASE_URL&&process.env.WHATSAPP_PROVIDER_API_KEY&&process.env.WHATSAPP_SENDER_ID);
  if(!configured) return res.status(503).json({ok:false,status:"Tidak Terhubung",error:"WhatsApp environment variables are incomplete"});
  return res.status(200).json({ok:true,status:"Terhubung"});
}