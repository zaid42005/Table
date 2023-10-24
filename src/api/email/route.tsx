import { NextResponse } from "next/server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
    await resend.sendEmail({
        from: 'onboarding@resend.dev',
        to: 'zaid.42005@gmail.com',
        subject: 'u',
        react: 
    });
    return NextResponse.json({
        status: 'ok'
    });
    
}