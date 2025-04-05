declare module 'emailjs-com' {
  interface EmailJSResponseStatus {
    status: number;
    text: string;
  }

  interface EmailJSParams {
    [key: string]: string | number | boolean;
  }

  export function init(userId: string): void;
  
  export function send(
    serviceId: string,
    templateId: string,
    templateParams: EmailJSParams,
    userId?: string
  ): Promise<EmailJSResponseStatus>;
}