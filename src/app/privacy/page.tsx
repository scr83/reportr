export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: October 21, 2025</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Reportr Agency ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information 
              when you use our SEO reporting service at reportr.agency.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Google Account Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you sign in with Google, we collect:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Your name</li>
              <li>Your email address</li>
              <li>Your profile picture</li>
            </ul>
            
            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-4">Google Services Data</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              With your explicit permission, we access:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Google Search Console data (search performance metrics)</li>
              <li>Google Analytics 4 data (website traffic analytics)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-4">Usage Information</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Client websites you add to your account</li>
              <li>Reports you generate</li>
              <li>Subscription and billing information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">We use your information to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Authenticate your account and provide access to our services</li>
              <li>Generate SEO reports using Google Search Console and Analytics data</li>
              <li>Process your subscription payments</li>
              <li>Send you service-related notifications</li>
              <li>Improve our service and user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Google API Services User Data Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              Reportr&apos;s use of information received from Google APIs adheres to the{' '}
              <a 
                href="https://developers.google.com/terms/api-services-user-data-policy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:underline"
              >
                Google API Services User Data Policy
              </a>
              , including the Limited Use requirements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We store your data securely using industry-standard encryption. Your Google API 
              access tokens are encrypted and stored securely. We do not sell, trade, or transfer 
              your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Revoke Google API access at any time</li>
              <li>Export your data</li>
              <li>Close your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Retention</h2>
            <p className="text-gray-700 leading-relaxed">
              We retain your data for as long as your account is active. When you delete your 
              account, we permanently delete your personal information within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              For privacy-related questions or to exercise your rights, contact us at:{' '}
              <a href="mailto:privacy@reportr.agency" className="text-purple-600 hover:underline">
                privacy@reportr.agency
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}