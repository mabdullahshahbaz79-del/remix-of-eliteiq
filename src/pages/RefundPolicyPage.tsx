import { motion } from "framer-motion";

const RefundPolicyPage = () => (
  <div className="container mx-auto px-6 py-24">
    <motion.div
      className="mx-auto max-w-3xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-2 gradient-text">Refund Policy</h1>
      <p className="text-sm text-muted-foreground mb-12">Last updated: April 12, 2026</p>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Overview</h2>
          <p>At eliteiq.tech, we want you to be completely satisfied with your purchase. This Refund Policy outlines the terms and conditions for requesting a refund on our digital products and subscription plans.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Refund Eligibility</h2>
          <p className="mb-3">You may request a refund within <span className="text-foreground font-medium">7 days</span> of your purchase if:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>The software does not function as described on our website</li>
            <li>You experience critical technical issues that our support team cannot resolve</li>
            <li>You were charged incorrectly or for a duplicate transaction</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Non-Refundable Situations</h2>
          <p className="mb-3">Refunds will <span className="text-foreground font-medium">not</span> be issued in the following cases:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>More than 7 days have passed since the purchase date</li>
            <li>You have extensively used the service (processed more than 50 images)</li>
            <li>The request is based on a change of mind or preference</li>
            <li>Your account was suspended or terminated due to violation of our Terms & Conditions</li>
            <li>You failed to contact our support team before requesting a refund</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. How to Request a Refund</h2>
          <p className="mb-3">To initiate a refund request:</p>
          <ol className="list-decimal pl-6 space-y-1">
            <li>Email us at <a href="mailto:support@eliteiq.tech" className="text-primary hover:underline">support@eliteiq.tech</a> with the subject line "Refund Request"</li>
            <li>Include your license key, registered email, and reason for the refund</li>
            <li>Our team will review your request within 2-3 business days</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Refund Processing</h2>
          <p>Approved refunds will be processed through <span className="text-foreground font-medium">Paddle</span>, our payment provider. The refund will be credited back to your original payment method within 5-10 business days, depending on your bank or payment provider.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. License Deactivation</h2>
          <p>Upon a successful refund, your license key will be immediately deactivated and you will lose access to all premium features associated with the refunded plan.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Free Plan</h2>
          <p>The free plan does not involve any payment and is therefore not subject to this Refund Policy. You may continue using the free plan with its included features at any time.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact Us</h2>
          <p>For any questions regarding this Refund Policy, please reach out to us at <a href="mailto:support@eliteiq.tech" className="text-primary hover:underline">support@eliteiq.tech</a>.</p>
        </section>
      </div>
    </motion.div>
  </div>
);

export default RefundPolicyPage;
