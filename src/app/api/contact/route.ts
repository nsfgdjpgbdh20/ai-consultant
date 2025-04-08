import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'info@example.com',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

const createAutoReplyTemplate = (name: string) => {
  return `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #4a6cf7;">AIコンサルタント</h2>
    <p>${name} 様</p>
    <p>お問い合わせいただき、誠にありがとうございます。</p>
    <p>このメールは、お問い合わせを受け付けたことを確認するための自動返信メールです。</p>
    <p>内容を確認次第、担当者より順次ご連絡させていただきます。</p>
    <p>なお、お問い合わせの内容によっては、回答までにお時間をいただく場合がございますので、あらかじめご了承ください。</p>
    <hr style="border: 1px solid #eaeaea; margin: 20px 0;" />
    <p style="color: #666; font-size: 14px;">
      ※このメールは自動送信されています。このメールに返信いただいても回答できない場合がございます。
    </p>
    <p style="color: #666; font-size: 14px;">
      AIコンサルタント<br />
      メール: info@example.com<br />
      TEL: 03-XXXX-XXXX
    </p>
  </div>
  `;
};

const createAdminTemplate = (formData: any) => {
  return `
  <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #4a6cf7;">AIコンサルタント - お問い合わせがありました</h2>
    <div style="border: 1px solid #eaeaea; padding: 20px; border-radius: 5px;">
      <p><strong>名前:</strong> ${formData.name}</p>
      <p><strong>メールアドレス:</strong> ${formData.email}</p>
      <p><strong>電話番号:</strong> ${formData.phone || '未入力'}</p>
      <p><strong>ご希望のサービス:</strong> ${formData.service}</p>
      <p><strong>お問い合わせ内容:</strong></p>
      <p style="background-color: #f9f9f9; padding: 10px; border-radius: 5px;">${formData.message.replace(/\n/g, '<br />')}</p>
    </div>
  </div>
  `;
};

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, phone, service, message } = formData;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { success: false, message: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'info@example.com',
      to: process.env.EMAIL_TO || 'info@example.com', // 受信用メールアドレス
      subject: 'AIコンサルタント - 新しいお問い合わせ',
      html: createAdminTemplate(formData),
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'info@example.com',
      to: email, // ユーザーのメールアドレス
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
