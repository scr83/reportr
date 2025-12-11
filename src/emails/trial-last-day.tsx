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

interface TrialLastDayEmailProps {
  userName: string | null;
  trialEndsAt: string;
}

export const TrialLastDayEmail = ({ userName, trialEndsAt }: TrialLastDayEmailProps) => {
  const previewText = `Last day of your Reportr trial`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Last day of your trial! 🏃‍♂️</Heading>
          
          <Text style={text}>
            Hi {userName || 'there'},
          </Text>
          
          <Text style={text}>
            Your Reportr trial ends today ({trialEndsAt}) and I wanted to check in 
            before it expires.
          </Text>
          
          <Text style={text}>
            <strong>Quick question:</strong> Have you generated a report yet?
          </Text>
          
          <Text style={text}>
            If not, I highly recommend trying it now - it takes just 2 minutes 
            and shows you exactly what Reportr can do for your agency.
          </Text>
          
          <Text style={text}>
            If you have already tried it, you know how much time it saves. 
            After your trial ends, you will lose access to:
          </Text>
          
          <Text style={listItem}>
            • <strong>Unlimited reports</strong> (back to 5 per month)
          </Text>
          <Text style={listItem}>
            • <strong>Multiple clients</strong> (back to 1 client max)
          </Text>
          <Text style={listItem}>
            • <strong>White-label branding</strong> (Reportr logo will show)
          </Text>
          <Text style={listItem}>
            • <strong>Priority support</strong> (back to community support)
          </Text>
          
          <Section style={urgencyBox}>
            <Text style={urgencyText}>
              <strong>Starter Plan: $29/month</strong><br />
              5 clients, unlimited reports, white-label branding
            </Text>
          </Section>
          
          <Section style={buttonContainer}>
            <Link style={button} href="https://reportr.agency/pricing">
              Upgrade Now →
            </Link>
          </Section>
          
          <Text style={text}>
            Or if you need more time to decide, no worries! You can upgrade 
            anytime from the free plan.
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

export default TrialLastDayEmail;

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

const listItem = {
  color: '#4a4a4a',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 8px',
  paddingLeft: '8px',
};

const urgencyBox = {
  backgroundColor: '#fee2e2',
  border: '1px solid #fca5a5',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const urgencyText = {
  color: '#991b1b',
  fontSize: '15px',
  lineHeight: '1.6',
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