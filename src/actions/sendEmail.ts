"use server"
import {Resend} from 'resend';

const sendEmail = async (formData:FormData) =>{
    const name = formData.get("name");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const {data,error} = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "carloshinzunzapata@gmail.com",
        subject: "hello world",
        html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
    })
    if(error){
        console.error(error)
        return {success:false}
    }
    console.log(data)
    return{success:true}
}
export default sendEmail