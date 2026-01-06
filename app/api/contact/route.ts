import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Create transporter with Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER || 'bynary.in@gmail.com',
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to BYNARY (Admin Notification)
    const adminMailOptions = {
      from: process.env.SMTP_USER || 'bynary.in@gmail.com',
      to: process.env.SMTP_TO || 'bynary.in@gmail.com',
      replyTo: email,
      subject: `🎯 New Lead: ${name} - BYNARY Contact Form`,
      html: `
        <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Contact Inquiry | BYNARY</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #1a1a1a;
    }
    .container {
      max-width: 640px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #000000;
      padding: 40px;
      text-align: center;
    }
    .logo img {
      max-width: 160px;
      margin-bottom: 10px;
    }
    .header-title {
      color: #ffffff;
      font-size: 14px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .content {
      padding: 40px;
    }
    .alert {
      background-color: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 16px;
      margin-bottom: 30px;
      font-size: 14px;
      font-weight: 600;
      color: #92400e;
    }
    .section-title {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .card {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .label {
      font-size: 11px;
      color: #6b7280;
      font-weight: 700;
      margin-bottom: 4px;
    }
    .value {
      font-size: 15px;
      color: #111827;
    }
    .message-box {
      border: 1px solid #000000;
      border-radius: 8px;
      padding: 20px;
      font-size: 14px;
      line-height: 1.7;
      color: #374151;
      background-color: #ffffff;
    }
    .footer {
      background-color: #111827;
      color: #9ca3af;
      text-align: center;
      padding: 30px;
      font-size: 12px;
      line-height: 1.6;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <img src="https://bynary.com/logo.png" alt="BYNARY Logo" />
      </div>
      <div class="header-title">New Contact Inquiry</div>
    </div>

    <!-- Content -->
    <div class="content">
      <div class="alert">
        A new contact form submission has been received and requires review.
      </div>

      <div class="section-title">Contact Details</div>

      <div class="card">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>

      <div class="card">
        <div class="label">Email Address</div>
        <div class="value">
          <a href="mailto:${email}" style="color:#000000;text-decoration:none;">
            ${email}
          </a>
        </div>
      </div>

      <div class="section-title" style="margin-top:30px;">Message</div>

      <div class="message-box">
        ${message.replace(/\n/g, '<br>')}
      </div>

      <p style="margin-top:20px;font-size:12px;color:#6b7280;">
        Received on ${new Date().toLocaleString('en-US')}
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      This is an automated notification from the BYNARY website contact form.<br />
      © ${new Date().getFullYear()} BYNARY. All rights reserved.
    </div>
  </div>
</body>
</html>

      `,
    };

    // Email to Client (Auto-reply)
    const clientMailOptions = {
      from: process.env.SMTP_USER || 'bynary.in@gmail.com',
      to: email,
      subject: 'We received your message - BYNARY',
      html: `
       <!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>We Have Received Your Inquiry | BYNARY</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      color: #1a1a1a;
    }
    .container {
      max-width: 640px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #000000;
      padding: 50px 40px;
      text-align: center;
    }
    .logo img {
      max-width: 160px;
      margin-bottom: 12px;
    }
    .header-title {
      color: #9ca3af;
      font-size: 13px;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    .content {
      padding: 40px;
      font-size: 15px;
      line-height: 1.8;
      color: #374151;
    }
    .highlight {
      background-color: #f9fafb;
      border-left: 4px solid #000000;
      padding: 20px;
      margin: 30px 0;
      border-radius: 6px;
    }
    .summary {
      margin-top: 25px;
      font-size: 14px;
    }
    .summary strong {
      display: inline-block;
      width: 80px;
      color: #111827;
    }
    .footer {
      background-color: #111827;
      color: #9ca3af;
      text-align: center;
      padding: 30px;
      font-size: 12px;
      line-height: 1.6;
    }
    .footer a {
      color: #9ca3af;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <img src="https://bynary.in/logo.png" alt="BYNARY Logo" />
      </div>
      <div class="header-title">Digital Solutions Agency</div>
    </div>

    <!-- Content -->
    <div class="content">
      <p>Dear ${name},</p>

      <p>
        Thank you for contacting BYNARY. We have successfully received your inquiry and appreciate your interest in our services.
      </p>

      <div class="highlight">
        Our team will carefully review your message and respond within <strong>24 business hours</strong>.
      </div>

      <p class="summary">
        <strong>Name:</strong> ${name}<br />
        <strong>Email:</strong> ${email}<br />
        <strong>Date:</strong> ${new Date().toLocaleDateString('en-US')}
      </p>

      <p>
        If you have any additional details to share, feel free to reply directly to this email.
      </p>

      <p>
        Kind regards,<br />
        <strong>BYNARY Team</strong>
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      © ${new Date().getFullYear()} BYNARY. All rights reserved.<br />
      <a href="https://bynary.com">www.bynary.com</a>
    </div>
  </div>
</body>
</html>

      `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    return NextResponse.json(
      { success: true, message: 'Messages sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}