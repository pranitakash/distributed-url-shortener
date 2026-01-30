export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "Always Free",
      description: "Perfect for getting started",
      features: [
        "Unlimited URL shortening",
        "Basic link analytics",
        "Custom aliases",
        "No signup required",
        "Community support",
      ],
      cta: "Get Started",
      ctaStyle: "border-2 border-green-600 text-green-600 hover:bg-green-50",
    },
    {
      name: "Pro",
      price: "Coming Soon",
      description: "For power users & teams",
      features: [
        "Everything in Free +",
        "Advanced analytics & insights",
        "QR code generation",
        "Bulk URL shortening",
        "API access",
        "Priority support",
      ],
      cta: "Get Notified",
      ctaStyle: "bg-green-600 text-white hover:bg-green-700",
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large-scale deployments",
      features: [
        "Everything in Pro +",
        "Custom branding",
        "Dedicated support",
        "SLA guarantees",
        "On-premise deployment",
        "Advanced security",
      ],
      cta: "Contact Us",
      ctaStyle: "border-2 border-green-600 text-green-600 hover:bg-green-50",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero */}
      <section className="pt-24 pb-16 px-6 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Simple, <span className="text-green-600 dark:text-green-500">Transparent</span> Pricing
        </h1>
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Start free. Upgrade when you're ready. No hidden fees, ever.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlight
                  ? "border-green-600 dark:border-green-500 shadow-lg dark:shadow-xl bg-white dark:bg-gray-700 scale-105 md:scale-110"
                  : "border-gray-200 dark:border-gray-700 shadow-sm dark:shadow-md hover:shadow-md dark:hover:shadow-lg hover:border-green-500 dark:hover:border-green-500 bg-white dark:bg-gray-700"
              }`}
            >
              {plan.highlight && (
                <div className="text-xs font-bold text-green-600 dark:text-green-500 uppercase tracking-wider mb-4">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-4">{plan.price}</p>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{plan.description}</p>

              <button
                className={`w-full mt-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${plan.ctaStyle}`}
              >
                {plan.cta}
              </button>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-gray-600 dark:text-gray-300 text-sm">
                    <span className="text-green-600 dark:text-green-500 font-bold">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Frequently Asked Questions</h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Can I try Pro or Enterprise for free?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes! Start with our Free plan and upgrade whenever you need additional features. We'll have a trial available for Pro soon.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Is there a long-term contract?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              No. All plans are month-to-month with no long-term commitment. Cancel anytime.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Do you offer discounts for annual billing?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Yes! Contact us for annual billing rates and special pricing for teams and organizations.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We accept all major credit cards (Visa, Mastercard, American Express) and PayPal. Enterprise customers can arrange custom payment terms.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Can I change plans?</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 dark:bg-gray-700 py-16 px-6 text-center transition-colors duration-300">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Ready to get started?</h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          The Free plan includes everything you need to start shortening URLs.
        </p>
        <a
          href="/"
          className="inline-block mt-8 px-8 py-3 bg-green-600 dark:bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 dark:hover:bg-green-700 transition-colors duration-200"
        >
          Start for Free
        </a>
      </section>
    </div>
  );
}
