import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getEmailConfig } from '@/utils/environment';

const emailConfig = getEmailConfig();

const transporter = nodemailer.createTransport({
  host: emailConfig.host || 'smtp.gmail.com',
  port: emailConfig.port,
  secure: emailConfig.secure,
  auth: {
    user: emailConfig.user || 'info@example.com',
    pass: emailConfig.password || '',
  },
});

const createAutoReplyTemplate = (name: string) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIコンサルタント - お問い合わせありがとうございます</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #4a6cf7, #6a3093); padding: 2px; border-radius: 8px;">
      <div style="background-color: white; border-radius: 6px; padding: 30px;">
        <h2 style="color: #4a6cf7; margin-top: 0;">AIコンサルタント</h2>
        <p style="font-size: 16px;"><strong>${name} 様</strong></p>
        <p>お問い合わせいただき、誠にありがとうございます。</p>
        <p>このメールは、お問い合わせを受け付けたことを確認するための自動返信メールです。</p>
        <p>内容を確認次第、担当者より順次ご連絡させていただきます。</p>
        <p>なお、お問い合わせの内容によっては、回答までにお時間をいただく場合がございますので、あらかじめご了承ください。</p>
        <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="color: #666; font-size: 14px;">
          ※このメールは自動送信されています。このメールに返信いただいても回答できない場合がございます。
        </p>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 14px; color: #666;">
          <p style="margin: 5px 0;">
            <strong>AIコンサルタント</strong><br />
            メール: info@example.com<br />
            TEL: 03-XXXX-XXXX
          </p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const createAdminTemplate = (formData: FormData) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AIコンサルタント - 新しいお問い合わせ</title>
  </head>
  <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #4a6cf7, #6a3093); padding: 2px; border-radius: 8px;">
      <div style="background-color: white; border-radius: 6px; padding: 30px;">
        <h2 style="color: #4a6cf7; margin-top: 0;">AIコンサルタント - お問い合わせがありました</h2>
        <div style="border: 1px solid #eaeaea; padding: 20px; border-radius: 5px; margin-top: 20px;">
          <p style="margin: 10px 0;"><strong>名前:</strong> ${formData.name}</p>
          <p style="margin: 10px 0;"><strong>メールアドレス:</strong> ${formData.email}</p>
          <p style="margin: 10px 0;"><strong>電話番号:</strong> ${formData.phone || '未入力'}</p>
          <p style="margin: 10px 0;"><strong>ご希望のサービス:</strong> ${formData.service}</p>
          <p style="margin: 10px 0;"><strong>お問い合わせ内容:</strong></p>
          <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${formData.message.replace(/\n/g, '<br />')}</p>
        </div>
      </div>
    </div>
  </body>
  </html>
  `;
};

export async function POST(request: Request) {
  try {
    const formData = await request.json() as FormData;
    const { name, email, phone, service, message } = formData;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, message: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    if (!emailConfig.user || !emailConfig.password) {
      console.error('Email configuration is incomplete. Cannot send emails.');
      return NextResponse.json(
        { 
          success: false, 
          message: 'メール送信の設定が不完全です。管理者にお問い合わせください。' 
        },
        { status: 500 }
      );
    }

    await transporter.sendMail({
      from: emailConfig.from || 'info@example.com',
      to: emailConfig.to || 'info@example.com',
      subject: 'AIコンサルタント - 新しいお問い合わせ',
      html: createAdminTemplate(formData),
    });

    await transporter.sendMail({
      from: emailConfig.from || 'info@example.com',
      to: email,
      subject: 'AIコンサルタント - お問い合わせありがとうございます',
      html: createAutoReplyTemplate(name),
    });

    return NextResponse.json(
      { success: true, message: 'お問い合わせを受け付けました' },
      { status: 200 }
    );
  } catch (error) {
    console.error('メール送信エラー:', error);
    return NextResponse.json(
      { success: false, message: 'エラーが発生しました。時間をおいて再度お試しください。' },
      { status: 500 }
    );
  }
}
