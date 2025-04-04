import emailjs from 'emailjs-com';

interface ContactData {
  name: string;
  email: string;
  message: string;
  [key: string]: string;
}

interface EmailResponse {
  status: number;
  message: string;
}

export async function sendContactEmail(data: ContactData): Promise<EmailResponse> {
  // Initialize EmailJS with your user ID
  emailjs.init("YOUR_USER_ID");
  
  try {
    const response = await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      data
    );
    
    return {
      status: response.status,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      status: 400,
      message: 'Failed to send email'
    };
  }
}