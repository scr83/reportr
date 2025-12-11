import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface UpgradeSuccessEmailProps {
  userName: string | null;
  planName: string;
}

export const UpgradeSuccessEmail = ({ userName, planName }: UpgradeSuccessEmailProps) => {
  const previewText = `You're now on ${planName} - Thanks for upgrading!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>You are on {planName}! 🚀</Heading>
          
          <Text style={text}>
            Hi {userName || 'there'},
          </Text>
          
          <Text style={text}>
            Your upgrade to <strong>{planName}</strong> is confirmed. Thank you for 
            your support - it means the world to me as a solo founder.
          </Text>
          
          <Section style={highlightBox}>
            <Text style={highlightText}>
              <strong>What is unlocked:</strong><br />
              ✓ More clients & reports<br />
              ✓ Priority support<br />
              ✓ White-label branding (if included in your plan)
            </Text>
          </Section>
          
          <Section style={buttonContainer}>
            <Link style={button} href="https://reportr.agency/dashboard">
              Go to Dashboard →
            </Link>
          </Section>
          
          <Text style={text}>
            Your subscription will renew automatically. You can manage your 
            billing anytime from Settings → Subscription.
          </Text>
          
          <Text style={text}>
            Got questions or feedback? Reply to this email anytime.
          </Text>
          
          <Text style={signature}>
            Sebastian<br />
            Founder, Reportr
          </Text>
          
          <Text style={footer}>
            <Link href="https://reportr.agency" style={footerLink}>Reportr</Link>
            {' '}•{' '}
            White-label SEO reports for agencies
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default UpgradeSuccessEmail;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
};

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.3',
  margin: '0 0 20px',
};

const text = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

const highlightBox = {
  backgroundColor: '#f0fdf4',
  border: '1px solid #bbf7d0',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const highlightText = {
  color: '#166534',
  fontSize: '15px',
  lineHeight: '1.7',
  margin: '0',
};

const buttonContainer = {
  margin: '24px 0',
};

const button = {
  backgroundColor: '#7e23ce',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};

const signature = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '32px 0 16px',
};

const footer = {
  color: '#8c8c8c',
  fontSize: '14px',
  margin: '32px 0 0',
  textAlign: 'center' as const,
};

const footerLink = {
  color: '#7e23ce',
  textDecoration: 'none',
};