
import { error } from "console";
import { Resend  } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)
export async function handler(req:Request) {
if(req.method !== "POST"){
    return new Response(
          JSON.stringify({ error: "Method not allowed" }),
      {
        status: 405,
      }
    )

} 
try{
    const {email,message} = await req.json();
  if(!email||!message){
    return Response.json(
      { error:"email and message are required"},
      {status:400}
    )
  }
}   
}