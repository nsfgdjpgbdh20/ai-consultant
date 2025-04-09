interface EmailConfig {
  host: string | undefined;
  port: number;
  secure: boolean;
  user: string | undefined;
  password: string | undefined;
  from: string | undefined;
  to: string | undefined;
}

export const getEmailConfig = (): EmailConfig => {
  const config = {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true',
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO
  };

  const requiredFields: (keyof EmailConfig)[] = ['host', 'user', 'password', 'from', 'to'];
  const missingFields = requiredFields.filter(field => !config[field]);
  
  if (missingFields.length > 0) {
    console.warn(`Missing email configuration: ${missingFields.join(', ')}. Email functionality may not work correctly.`);
  }

  return config;
};
