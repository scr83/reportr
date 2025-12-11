import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OnboardingHelpEmailProps {
  userName: string | null;
}

export const OnboardingHelpEmail = ({ userName }: OnboardingHelpEmailProps) => {
  const previewText = `Need help getting started?`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        {/* Branded Header */}
        <Container style={header}>
          <Text style={headerText}>Reportr</Text>
        </Container>
        
        {/* Content Container */}
        <Container style={container}>
          <Heading style={h1}>Need a hand? 🤝</Heading>
          
          <Text style={text}>
            Hi {userName || 'there'},
          </Text>
          
          <Text style={text}>
            I know you are probably busy (we all are!), so I wanted to reach out 
            personally. Have you run into any roadblocks getting started with Reportr?
          </Text>
          
          <Text style={text}>
            <strong>Here are the most common questions I get:</strong>
          </Text>
          
          <Text style={listItem}>
            • <strong>Not sure how to connect Google accounts?</strong> I can walk you through it - takes 2 minutes
          </Text>
          <Text style={listItem}>
            • <strong>Waiting for client to give you access?</strong> I have a template email that usually works
          </Text>
          <Text style={listItem}>
            • <strong>Questions about white-label branding?</strong> Happy to show you how it works
          </Text>
          <Text style={listItem}>
            • <strong>Want to see a sample report first?</strong> I can send you our demo report
          </Text>
          
          <Text style={text}>
            Seriously - just reply to this email with any question. I read every 
            single message and usually respond within a few hours.
          </Text>
          
          <Text style={text}>
            No pressure at all if you are not ready yet. The free plan will always 
            be here when you need it.
          </Text>
          
          <Text style={text}>
            <strong>Reply to this email</strong> and I will personally help you get up and running.
          </Text>
          
          <Text style={signature}>
            Sebastian<br />
            Founder, Reportr<br />
            sebastian@reportr.agency
          </Text>
          
        </Container>
        
        {/* Branded Footer */}
        <Container style={footerContainer}>
          <Text style={footerBrand}>Reportr</Text>
          <Text style={footerTagline}>White-label SEO reports in minutes, not hours</Text>
          <Link href="https://reportr.agency" style={footerLink}>reportr.agency</Link>
          <Text style={footerNote}>You are receiving this because you signed up for Reportr.</Text>
          <Text style={footerCopyright}>© 2025 Reportr. All rights reserved.</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OnboardingHelpEmail;

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
  margin: '0 0 12px',
  paddingLeft: '8px',
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

const header = {
  background: 'linear-gradient(135deg, #7e23ce 0%, #9333ea 100%)',
  padding: '20px 0',
  margin: '0',
  maxWidth: '100%',
};

const headerText = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0',
};

const footerContainer = {
  backgroundColor: '#f9fafb',
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
  textAlign: 'center' as const,
};

const footerBrand = {
  color: '#1a1a1a',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 8px',
};

const footerTagline = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0 0 16px',
};

const footerNote = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '16px 0 8px',
};

const footerCopyright = {
  color: '#9ca3af',
  fontSize: '12px',
  margin: '0',
};