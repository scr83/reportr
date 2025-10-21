export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <p className="text-gray-600 mb-8">Last updated: October 21, 2025</p>

        <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing or using Reportr Agency (&quot;the Service&quot;), you agree to be 
              bound by these Terms of Service. If you do not agree to these terms, please do 
              not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              Reportr is an SEO reporting tool that generates professional PDF reports using 
              data from Google Search Console and Google Analytics 4. The Service is designed 
              for digital marketing agencies and professionals.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To use the Service, you must:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Create an account using Google authentication</li>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Be at least 18 years old or the age of majority in your jurisdiction</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Subscription and Payment</h2>
            <h3 className="text-xl font-medium text-gray-800 mb-2">Plans and Pricing</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer multiple subscription tiers:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Free Plan: Limited features at no cost</li>
              <li>Starter Plan: $29/month</li>
              <li>Professional Plan: Contact for pricing</li>
              <li>Enterprise Plan: Contact for pricing</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-4">Payment Processing</h3>
            <p className="text-gray-700 leading-relaxed">
              All payments are processed securely through PayPal. By subscribing, you authorize 
              us to charge your payment method on a recurring basis until you cancel.
            </p>

            <h3 className="text-xl font-medium text-gray-800 mb-2 mt-4">Cancellation and Refunds</h3>
            <p className="text-gray-700 leading-relaxed">
              You may cancel your subscription at any time through your PayPal account. 
              Cancellations take effect at the end of your current billing period. We do not 
              provide refunds for partial months of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
            <p className="text-gray-700 leading-relaxed mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Use the Service for any illegal purpose</li>
              <li>Attempt to gain unauthorized access to the Service</li>
              <li>Share your account credentials with others</li>
              <li>Abuse or overload our systems</li>
              <li>Violate Google&apos;s Terms of Service or API policies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service and its original content, features, and functionality are owned by 
              Reportr Agency and are protected by international copyright, trademark, and other 
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              The Service is provided &quot;as is&quot; without warranties of any kind. We are 
              not liable for any damages arising from your use of the Service, including but not 
              limited to direct, indirect, incidental, or consequential damages.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of 
              material changes via email. Continued use of the Service after changes constitutes 
              acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms of Service, contact us at:{' '}
              <a href="mailto:legal@reportr.agency" className="text-purple-600 hover:underline">
                legal@reportr.agency
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}