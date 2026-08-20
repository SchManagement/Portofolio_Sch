export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Method not allowed"});
  const {invoiceId,customerName,phone,message,documentUrl}=req.body||{};
  if(!invoiceId||!customerName||!phone) return res.status(400).json({error:"Missing required invoice data"});

  const baseUrl=process.env.WHATSAPP_PROVIDER_BASE_URL;
  const apiKey=process.env.WHATSAPP_PROVIDER_API_KEY;
  const senderId=process.env.WHATSAPP_SENDER_ID;

  if(!baseUrl||!apiKey||!senderId){
    return res.status(503).json({error:"WhatsApp provider is not configured",code:"WHATSAPP_NOT_CONFIGURED"});
  }

  try{
    const controller=new AbortController();
    const timeout=setTimeout(()=>controller.abort(),10000);

    const providerResponse=await fetch(`${baseUrl}/messages`,{
      method:"POST",
      headers:{"Content-Type":"application/json","Authorization":`Bearer ${apiKey}`},
      body:JSON.stringify({
        senderId,
        to:phone,
        type:documentUrl?"document":"text",
        documentUrl,
        caption:message,
        text:message,
        metadata:{invoiceId}
      }),
      signal:controller.signal
    });

    clearTimeout(timeout);
    const data=await providerResponse.json().catch(()=>({}));

    if(!providerResponse.ok){
      return res.status(502).json({error:"Provider rejected request",providerStatus:providerResponse.status,details:data});
    }

    return res.status(200).json({ok:true,invoiceId,providerMessageId:data.id||data.messageId||null,status:"Terkirim"});
  }catch(error){
    const timeout=error?.name==="AbortError";
    return res.status(timeout?504:500).json({error:timeout?"Provider timeout":"Send failed",detail:String(error?.message||error)});
  }
}