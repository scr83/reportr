import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Img,
  Text,
  Link,
  Hr,
} from '@react-email/components';

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html>
      <Head />
      <Preview>{preview}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header with Reportr logo */}
          <Section style={styles.header}>
            <Img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjgwIiB2aWV3Qm94PSIwIDAgMjAwIDgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDwhLS0gUHVycGxlIGJhY2tncm91bmQgcm91bmRlZCByZWN0YW5nbGUgLS0+CiAgPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzdjM2FlZCIgeD0iMTAiIHk9IjIwIi8+CiAgCiAgPCEtLSBCYXJDaGFydDMgaWNvbiBzaW1wbGlmaWVkIC0gdGhyZWUgYXNjZW5kaW5nIGJhcnMgLS0+CiAgPHJlY3Qgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IndoaXRlIiB4PSIxNyIgeT0iMzQiLz4KICA8cmVjdCB3aWR0aD0iNiIgaGVpZ2h0PSIxOCIgZmlsbD0id2hpdGUiIHg9IjI2IiB5PSIyOCIvPgogIDxyZWN0IHdpZHRoPSI2IiBoZWlnaHQ9IjI0IiBmaWxsPSJ3aGl0ZSIgeD0iMzUiIHk9IjIyIi8+CiAgCiAgPCEtLSBSZXBvcnRyIHRleHQgLS0+CiAgPHRleHQgeD0iNjAiIHk9IjQ4IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMTExODI3Ij5SZXBvcnRyPC90ZXh0Pgo8L3N2Zz4="
              width="150"
              height="40"
              alt="Reportr"
              style={styles.logo}
            />
          </Section>

          {/* Email content */}
          <Section style={styles.content}>
            {children}
          </Section>

          {/* Footer */}
          <Hr style={styles.hr} />
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © 2025 Reportr by Digital Frog. All rights reserved.
            </Text>
            <Text style={styles.footerText}>
              <Link href="https://reportr.agency" style={styles.link}>
                reportr.agency
              </Link>
              {' · '}
              <Link href="https://reportr.agency/support" style={styles.link}>
                Support
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    margin: 0,
    padding: 0,
  },
  container: {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
    maxWidth: '600px',
  },
  header: {
    padding: '32px 32px 20px',
    textAlign: 'center' as const,
  },
  logo: {
    margin: '0 auto',
  },
  content: {
    padding: '0 32px',
  },
  hr: {
    borderColor: '#e6ebf1',
    margin: '32px 0',
  },
  footer: {
    padding: '0 32px',
    textAlign: 'center' as const,
  },
  footerText: {
    color: '#8898aa',
    fontSize: '12px',
    lineHeight: '16px',
    margin: '4px 0',
  },
  link: {
    color: '#7e23ce',
    textDecoration: 'none',
  },
};