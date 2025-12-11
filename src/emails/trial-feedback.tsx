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

interface TrialFeedbackEmailProps {
  userName: string | null;
}

export const TrialFeedbackEmail = ({ userName }: TrialFeedbackEmailProps) => {
  const previewText = `Quick question about your Reportr trial`;

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
          <Heading style={h1}>Quick question? 🤔</Heading>
          
          <Text style={text}>
            Hi {userName || 'there'},
          </Text>
          
          <Text style={text}>
            Hope you are doing well! Your Reportr trial ended a couple days ago, 
            and I wanted to ask a quick question.
          </Text>
          
          <Text style={text}>
            <strong>What held you back from upgrading?</strong>
          </Text>
          
          <Text style={text}>
            I am genuinely curious (not trying to sell you anything). Was it:
          </Text>
          
          <Text style={listItem}>
            • Pricing concerns?
          </Text>
          <Text style={listItem}>
            • Missing features you needed?
          </Text>
          <Text style={listItem}>
            • Too complex to set up?
          </Text>
          <Text style={listItem}>
            • Just not the right time?
          </Text>
          <Text style={listItem}>
            • Something else entirely?
          </Text>
          
          <Text style={text}>
            Your honest feedback helps me build something better. Even if it was 
            just bad timing or you went with a different solution - no worries at all.
          </Text>
          
          <Text style={text}>
            <strong>Just hit reply and let me know.</strong> Takes 30 seconds and 
            really helps me understand what agencies actually need.
          </Text>
          
          <Text style={text}>
            Thanks for giving Reportr a shot!
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

export default TrialFeedbackEmail;

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