import { Plus } from "lucide-react";

function FQA() {
    const faqs = [
        {
            question: "What is Kezi Natural Pearl?",
            answer: "Kezi Natural Pearl is a skincare brand that offers natural and effective products to enhance your skin's health and beauty."
        },
        {
            question: "Are Kezi products suitable for all skin types?",
            answer: "Yes, our products are formulated to be gentle and effective for all skin types, including sensitive skin."
        },
        {
            question: "How do I choose the right products for my skin?",
            answer: "We recommend consulting with our skincare experts or using our online quiz to find the best products for your skin type and concerns."
        },
        {
            question: "What ingredients are used in Kezi products?",
            answer: "We use natural ingredients such as aloe vera, chamomile, green tea extract, and essential oils to ensure our products are safe and effective."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive a tracking number via email to monitor the delivery status."
        }
    ];
  return (
    <section className="h-screen grid grid-cols-2 py-3 px-5">
        <div>
            <h1 className="text-4xl font-semibold">Frequently Asked Questions</h1>
            <p className="pt-3.5">we understanding that Skincare can be complex, so we’ve gathered
the most common questions to help guide you on your journey to
healthy,beautiful skin. Find answers to your skincare concerns. </p>
        </div>
        <div>
            <p className="bg-[var(--primary)] text-white rounded-md py-2 px-2.5">What skin types are your product suitable for?
we understand that skincare can be complex, so we’ve gathered
the most common questions to help guide you on your journey to
healthy, beautiful skin. Find answers to your skincare concerns.</p>
            <div>
                {faqs.map((faq, index) => (
                    <div key={index} className="pt-4">
                        <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">{faq.question}</h2>
                        <Plus className="inline-block ml-2 w-5 h-5 text-[var(--primary)] cursor-pointer" />
                        </div>
                        <p className="pt-1.5">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}

export default FQA