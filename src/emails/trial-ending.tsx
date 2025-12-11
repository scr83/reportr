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

interface TrialEndingEmailProps {
  userName: string | null;
  trialEndsAt: string;
}

export const TrialEndingEmail = ({ userName, trialEndsAt }: TrialEndingEmailProps) => {
  const previewText = `Your Reportr trial ends in 3 days`;

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
          <Heading style={h1}>Quick heads-up! ⏰</Heading>
          
          <Text style={text}>
            Hi {userName || 'there'},
          </Text>
          
          <Text style={text}>
            Just a friendly reminder that your Reportr trial ends on <strong>{trialEndsAt}</strong> 
            (that is 3 days from now).
          </Text>
          
          <Text style={text}>
            I hope you have had a chance to explore what Reportr can do for your agency:
          </Text>
          
          <Text style={listItem}>
            • <strong>White-label SEO reports</strong> with your branding
          </Text>
          <Text style={listItem}>
            • <strong>Automated data collection</strong> from Search Console, Analytics & PageSpeed
          </Text>
          <Text style={listItem}>
            • <strong>AI-powered insights</strong> that actually make sense
          </Text>
          <Text style={listItem}>
            • <strong>2-minute generation</strong> instead of 8+ hours manually
          </Text>
          
          <Section style={highlightBox}>
            <Text style={highlightText}>
              <strong>Keep saving 8+ hours per client</strong><br />
              Plans start at just $29/month
            </Text>
          </Section>
          
          <Section style={buttonContainer}>
            <Link style={button} href="https://reportr.agency/pricing">
              View Pricing Plans →
            </Link>
          </Section>
          
          <Text style={text}>
            No pressure at all - you can always upgrade later. But if Reportr has been 
            helpful, I would love to keep you onboard!
          </Text>
          
          <Text style={text}>
            Questions about plans or features? Just reply to this email.
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

export default TrialEndingEmail;

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