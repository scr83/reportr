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

interface OnboardingShowValueEmailProps {
  userName: string | null;
}

export const OnboardingShowValueEmail = ({ userName }: OnboardingShowValueEmailProps) => {
  const previewText = `Save 8+ hours on your next client report`;

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
          <Heading style={h1}>Remember spending 8 hours on reports? 😴</Heading>
          
          <Text style={text}>
            Hi {userName || 'there'},
          </Text>
          
          <Text style={text}>
            Before I built Reportr, client reporting was my least favorite task. 
            Hours spent copying data from Search Console, then Analytics, 
            then PageSpeed Insights... just to make a basic report.
          </Text>
          
          <Text style={text}>
            Sound familiar?
          </Text>
          
          <Section style={highlightBox}>
            <Text style={highlightText}>
              <strong>The transformation:</strong><br />
              ❌ 8+ hours manually gathering data<br />
              ✅ 2 minutes with Reportr automation
            </Text>
          </Section>
          
          <Text style={text}>
            <strong>Every Reportr report includes:</strong>
          </Text>
          
          <Text style={listItem}>
            • <strong>Search Console data</strong> - Top keywords, pages, CTR, positions
          </Text>
          <Text style={listItem}>
            • <strong>Google Analytics 4</strong> - Traffic, bounce rates, top landing pages
          </Text>
          <Text style={listItem}>
            • <strong>PageSpeed insights</strong> - Core Web Vitals and improvement recommendations
          </Text>
          <Text style={listItem}>
            • <strong>AI-powered insights</strong> - Actionable recommendations written in plain English
          </Text>
          
          <Section style={buttonContainer}>
            <Link style={button} href="https://reportr.agency/dashboard">
              Generate Your First Report →
            </Link>
          </Section>
          
          <Text style={text}>
            I built this because I was tired of manual reporting. Now my agency 
            saves 20+ hours per month, and our clients love the professional reports.
          </Text>
          
          <Text style={signature}>
            Sebastian<br />
            Founder, Reportr
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

export default OnboardingShowValueEmail;

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

const highlightBox = {
  backgroundColor: '#f0f9ff',
  border: '1px solid #0ea5e9',
  borderRadius: '8px',
  padding: '16px',
  margin: '24px 0',
};

const highlightText = {
  color: '#0c4a6e',
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