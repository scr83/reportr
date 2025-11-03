import { EmailLayout } from './components/email-layout';
import { Text, Button } from '@react-email/components';

interface VerificationEmailProps {
  userName: string;
  verificationUrl: string;
}

export function VerificationEmail({ userName, verificationUrl }: VerificationEmailProps) {
  return (
    <EmailLayout preview="Verify your Reportr account">
      <Text style={styles.heading}>
        Welcome to Reportr, {userName}!
      </Text>
      
      <Text style={styles.paragraph}>
        Thanks for signing up! We&apos;re excited to help you automate your SEO reporting and save hours of manual work.
      </Text>
      
      <Text style={styles.paragraph}>
        To get started with your <strong>14-day free trial</strong>, please verify your email address:
      </Text>
      
      <Button
        href={verificationUrl}
        style={styles.button}
      >
        Verify Email Address
      </Button>
      
      <Text style={styles.paragraph}>
        Or copy and paste this link into your browser:
      </Text>
      
      <Text style={styles.link}>
        {verificationUrl}
      </Text>
      
      <Text style={styles.paragraph}>
        Once verified, you&apos;ll be able to:
      </Text>
      
      <ul style={styles.list}>
        <li>Connect up to 1 client</li>
        <li>Generate up to 5 professional reports</li>
        <li>Access all report types (Executive, Standard, Custom)</li>
        <li>Try out white-label branding</li>
      </ul>
      
      <Text style={styles.footerNote}>
        This verification link expires in 24 hours. If you didn&apos;t create a Reportr account, you can safely ignore this email.
      </Text>
    </EmailLayout>
  );
}

const styles = {
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '16px',
  },
  paragraph: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#525252',
    marginBottom: '16px',
  },
  button: {
    backgroundColor: '#7e23ce',
    borderRadius: '6px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'block',
    padding: '14px 24px',
    margin: '24px 0',
  },
  link: {
    fontSize: '14px',
    color: '#7e23ce',
    wordBreak: 'break-all' as const,
    marginBottom: '24px',
  },
  list: {
    fontSize: '16px',
    lineHeight: '24px',
    color: '#525252',
    marginBottom: '16px',
    paddingLeft: '20px',
  },
  footerNote: {
    fontSize: '14px',
    color: '#8898aa',
    marginTop: '32px',
    fontStyle: 'italic' as const,
  },
};