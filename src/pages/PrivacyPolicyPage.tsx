import { motion } from "framer-motion";
import SEOHead from "@/components/SEOHead";

const PrivacyPolicyPage = () => (
  <div className="container mx-auto px-6 py-24">
    <SEOHead
      title="Privacy Policy"
      description="Learn how eliteiq.tech collects, uses, and protects your personal information. Read our privacy practices for image processing and data security."
      canonical="/privacy"
    />
    <motion.div
      className="mx-auto max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-2 gradient-text">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-12">Last updated: April 12, 2026</p>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
          <p>Welcome to eliteiq.tech ("we", "our", "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <p className="mb-3">We collect information that you provide directly to us, including:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Account information (name, email address)</li>
            <li>Payment and billing information (processed securely via Paddle)</li>
            <li>Images you upload for metadata generation (processed temporarily, not stored permanently)</li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
            <li>Communication data when you contact our support</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To provide, maintain, and improve our services</li>
            <li>To process transactions and manage your license</li>
            <li>To generate AI-powered metadata for your uploaded images</li>
            <li>To send you technical notices, updates, and support messages</li>
            <li>To detect, prevent, and address technical issues or fraud</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Image Processing</h2>
          <p>Images uploaded for metadata generation are processed in real-time using third-party AI models (Google Gemini, OpenAI GPT). Images are sent to these services solely for analysis and are <span className="text-foreground font-medium">not stored permanently</span> on our servers. We do not claim any ownership over your uploaded content.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Sharing</h2>
          <p className="mb-3">We do not sell your personal data. We may share information with:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><span className="text-foreground font-medium">Payment processors</span> (Paddle) to handle transactions</li>
            <li><span className="text-foreground font-medium">AI service providers</span> (Google, OpenAI) for image analysis</li>
            <li><span className="text-foreground font-medium">Infrastructure providers</span> for hosting and analytics</li>
            <li><span className="text-foreground font-medium">Law enforcement</span> when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Rights</h2>
          <p className="mb-3">Depending on your location, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Data portability</li>
            <li>Withdraw consent at any time</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Cookies</h2>
          <p>We use essential cookies to maintain your session and preferences. We may also use analytics cookies to understand how our service is used. You can control cookie settings through your browser.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:support@eliteiq.tech" className="text-primary hover:underline">support@eliteiq.tech</a>.</p>
        </section>
      </div>
    </motion.div>
  </div>
);

export default PrivacyPolicyPage;
