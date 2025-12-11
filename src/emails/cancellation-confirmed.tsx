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

interface CancellationConfirmedEmailProps {
  userName: string | null;
  accessUntil: string;
}

export const CancellationConfirmedEmail = ({ userName, accessUntil }: CancellationConfirmedEmailProps) => {
  const previewText = `Your Reportr subscription has been cancelled`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Subscription Cancelled</Heading>
          
          <Text style={text}>
            Hi {userName || 'there'},
          </Text>
          
          <Text style={text}>
            Your subscription has been cancelled as requested. You will still have 
            access to your paid features until <strong>{accessUntil}</strong>.
          </Text>
          
          <Section style={highlightBox}>
            <Text style={highlightText}>
              After {accessUntil}, your account will switch to the Free plan with 
              limited clients and reports.
            </Text>
          </Section>
          
          <Text style={text}>
            Changed your mind? You can resubscribe anytime from your dashboard.
          </Text>
          
          <Section style={buttonContainer}>
            <Link style={button} href="https://reportr.agency/settings/subscription">
              Manage Subscription →
            </Link>
          </Section>
          
          <Text style={text}>
            <strong>Quick question:</strong> What made you cancel? I would genuinely love 
            to know so I can improve Reportr. Just reply to this email.
          </Text>
          
          <Text style={text}>
            Thanks for giving Reportr a try. I hope we can win you back someday.
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

export default CancellationConfirmedEmail;

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
  backgroundColor: '#fef3c7',
  border: '1px solid #fcd34d',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const highlightText = {
  color: '#92400e',
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