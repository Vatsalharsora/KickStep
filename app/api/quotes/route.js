import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, product, quantity, message } = body

    // Create transporter for sending emails
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: 'admin@kickstep.com',
      subject: 'New Quote Request - KICKSTEP',
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Product:</strong> ${product}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    }

    // Email to customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Quote Request Received - KICKSTEP',
      html: `
        <h2>Thank you for your quote request!</h2>
        <p>Dear ${name},</p>
        <p>We have received your quote request for ${quantity} units of ${product}.</p>
        <p>Our team will review your requirements and get back to you within 24 hours with a detailed quote.</p>
        <p>Best regards,<br>KICKSTEP Team</p>
      `
    }

    // Send emails
    await transporter.sendMail(adminMailOptions)
    await transporter.sendMail(customerMailOptions)

    return NextResponse.json({ success: true, message: 'Quote request sent successfully' })
  } catch (error) {
    console.error('Error sending quote request:', error)
    return NextResponse.json({ success: false, message: 'Failed to send quote request' }, { status: 500 })
  }
}