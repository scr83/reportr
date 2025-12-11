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

interface WelcomeEmailProps {
  userName: string | null;
}

export const WelcomeEmail = ({ userName }: WelcomeEmailProps) => {
  const previewText = `Welcome to Reportr - Let's get your first SEO report ready!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome to Reportr! 🎉</Heading>
          
          <Text style={text}>
            Hi {userName || 'there'},
          </Text>
          
          <Text style={text}>
            Thanks for signing up! You are now ready to generate professional, 
            white-label SEO reports in minutes instead of hours.
          </Text>
          
          <Section style={buttonContainer}>
            <Link style={button} href="https://reportr.agency/dashboard">
              Go to Dashboard →
            </Link>
          </Section>
          
          <Text style={text}>
            <strong>Here is how to get started:</strong>
          </Text>
          
          <Text style={listItem}>
            1. <strong>Add your first client</strong> - Click the Add Client button and enter their website
          </Text>
          <Text style={listItem}>
            2. <strong>Connect Google</strong> - Link Search Console & Analytics with one click
          </Text>
          <Text style={listItem}>
            3. <strong>Generate a report</strong> - Hit the Generate button and watch the magic happen
          </Text>
          
          <Text style={text}>
            Your first report takes about 2 minutes. After that? 30 seconds each.
          </Text>
          
          <Text style={text}>
            Questions? Just reply to this email - I read every message.
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

export default WelcomeEmail;

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