import { useState } from "react";

import {
  FiArrowRight,
  FiCheckCircle,
  FiChevronDown,
  FiClock,
  FiCreditCard,
  FiHeadphones,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPackage,
  FiPhone,
  FiRefreshCw,
  FiSend,
  FiShoppingBag,
  FiTruck,
  FiUser,
  FiAlertCircle,
} from "react-icons/fi";

import { sendContactMessage } from "../Apis/contactApi";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error while typing
    if (error) {
      setError("");
    }
  };

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(false);
    setError("");
    setSending(true);

    try {
      const payload = {
        name: formData.name,
        email: formData.email,

        // Backend currently receives only:
        // name, email, message
        // So we include the subject inside the message.
        message: `Subject: ${formData.subject}\n\n${formData.message}`,
      };

      await sendContactMessage(payload);

      // Show success message
      setSubmitted(true);

      // Clear form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error("CONTACT FORM ERROR:", err);

      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setSending(false);
    }
  };

  /* =========================================================
     FAQ TOGGLE
  ========================================================= */

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] text-gray-900 transition-colors duration-300 dark:bg-[#101010] dark:text-white">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="border-b border-gray-200 bg-white dark:border-[#292929] dark:bg-[#171717]">

        <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-12">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">

            <span>Home</span>

            <FiArrowRight size={12} />

            <span className="font-semibold text-gray-800 dark:text-gray-200">
              Contact Us
            </span>

          </div>

          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                Customer Service
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                How can we help you?
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                Find answers, get help with your orders, or contact our
                customer service team.
              </p>

            </div>

            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-[#303030] dark:bg-[#202020]">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yellow-400 text-black">
                <FiHeadphones size={18} />
              </div>

              <div>

                <p className="text-[11px] text-gray-400">
                  Need help?
                </p>

                <p className="text-sm font-bold">
                  We're here for you
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          HELP CATEGORIES
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-12">

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">

          <HelpCategory
            icon={<FiPackage />}
            title="My Orders"
            text="Track your order"
          />

          <HelpCategory
            icon={<FiTruck />}
            title="Delivery"
            text="Delivery information"
          />

          <HelpCategory
            icon={<FiRefreshCw />}
            title="Returns"
            text="Returns & refunds"
          />

          <HelpCategory
            icon={<FiCreditCard />}
            title="Payments"
            text="Payment questions"
          />

          <HelpCategory
            icon={<FiShoppingBag />}
            title="Products"
            text="Product information"
          />

          <HelpCategory
            icon={<FiUser />}
            title="My Account"
            text="Account & profile"
          />

        </div>

      </section>

      {/* =====================================================
          CONTACT + FORM
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-8 sm:px-8 lg:px-12">

        <div className="grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">

          {/* =================================================
              CUSTOMER SERVICE CARD
          ================================================= */}

          <div className="rounded-2xl border border-gray-200 bg-white dark:border-[#292929] dark:bg-[#171717]">

            <div className="border-b border-gray-200 p-6 dark:border-[#292929] sm:p-7">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-yellow-400 text-black">

                  <FiHeadphones size={20} />

                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                    Contact us
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    Customer Service
                  </h2>

                </div>

              </div>

            </div>

            <div className="p-6 sm:p-7">

              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400">
                Our customer service team is ready to help you with
                your orders, products, payments, and more.
              </p>

              <div className="mt-7 space-y-1">

                <ContactInfo
                  icon={<FiPhone />}
                  title="Phone"
                  value="+20 100 000 0000"
                  href="tel:+201000000000"
                />

                <ContactInfo
                  icon={<FiMail />}
                  title="Email"
                  value="support@shoply.com"
                  href="mailto:support@shoply.com"
                />

                <ContactInfo
                  icon={<FiMapPin />}
                  title="Location"
                  value="Cairo, Egypt"
                />

                <ContactInfo
                  icon={<FiClock />}
                  title="Working hours"
                  value="Sat - Thu, 9 AM - 10 PM"
                />

              </div>

              <div className="mt-7 rounded-xl bg-gray-50 p-5 dark:bg-[#202020]">

                <div className="flex gap-3">

                  <FiMessageCircle
                    className="mt-0.5 shrink-0 text-yellow-500"
                    size={19}
                  />

                  <div>

                    <p className="text-sm font-bold">
                      Need quick assistance?
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                      Send us your question and our team will get
                      back to you as soon as possible.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              CONTACT FORM
          ================================================= */}

          <div className="rounded-2xl border border-gray-200 bg-white dark:border-[#292929] dark:bg-[#171717]">

            <div className="border-b border-gray-200 p-6 dark:border-[#292929] sm:p-7">

              <p className="text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                Send us a message
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Tell us what you need
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Complete the form below and we'll help you with your request.
              </p>

            </div>

            <div className="p-6 sm:p-7">

              {/* SUCCESS MESSAGE */}

              {submitted && (

                <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-900/40 dark:bg-green-900/10">

                  <FiCheckCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
                  />

                  <div>

                    <p className="text-sm font-bold text-green-700 dark:text-green-400">
                      Message sent successfully
                    </p>

                    <p className="mt-1 text-xs leading-5 text-green-600 dark:text-green-500">
                      Thank you for contacting Shoply. We'll get back
                      to you soon.
                    </p>

                  </div>

                </div>

              )}

              {/* ERROR MESSAGE */}

              {error && (

                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-900/40 dark:bg-red-900/10">

                  <FiAlertCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
                  />

                  <div>

                    <p className="text-sm font-bold text-red-700 dark:text-red-400">
                      Message could not be sent
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-600 dark:text-red-500">
                      {error}
                    </p>

                  </div>

                </div>

              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NAME + EMAIL */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <InputField
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* SUBJECT */}

                <InputField
                  label="Subject"
                  name="subject"
                  type="text"
                  placeholder="What do you need help with?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />

                {/* MESSAGE */}

                <div>

                  <label className="mb-2 block text-sm font-semibold">
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows="7"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message..."
                    required
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-gray-200
                      bg-gray-50
                      px-4
                      py-3.5
                      text-sm
                      text-gray-900
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-gray-400
                      focus:border-yellow-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-yellow-400/10
                      dark:border-[#333]
                      dark:bg-[#202020]
                      dark:text-white
                      dark:focus:bg-[#202020]
                    "
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  disabled={sending}
                  className="
                    group
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-yellow-400
                    px-6
                    py-4
                    text-sm
                    font-black
                    text-black
                    transition-all
                    duration-300
                    hover:bg-yellow-300
                    hover:shadow-lg
                    hover:shadow-yellow-400/10
                    active:scale-[0.99]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {sending ? "Sending..." : "Send Message"}

                  <FiSend
                    size={17}
                    className={`transition-transform duration-300 ${
                      sending ? "animate-pulse" : "group-hover:translate-x-1"
                    }`}
                  />

                </button>

                <p className="text-center text-xs text-gray-400">
                  We'll only use your information to respond to your request.
                </p>

              </form>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-12 sm:px-8 lg:px-12">

        <div className="rounded-2xl border border-gray-200 bg-white dark:border-[#292929] dark:bg-[#171717]">

          <div className="border-b border-gray-200 p-6 dark:border-[#292929] sm:p-7">

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-400">
                  Help Center
                </p>

                <h2 className="mt-2 text-2xl font-black sm:text-3xl">
                  Frequently Asked Questions
                </h2>

              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Find answers to common questions
              </p>

            </div>

          </div>

          <div className="divide-y divide-gray-200 dark:divide-[#292929]">

            <FAQItem
              index={0}
              openFaq={openFaq}
              toggleFaq={toggleFaq}
              question="How can I track my order?"
              answer="You can check your order status from the My Orders page in your account."
            />

            <FAQItem
              index={1}
              openFaq={openFaq}
              toggleFaq={toggleFaq}
              question="How can I contact customer support?"
              answer="You can contact our support team using the contact form on this page."
            />

            <FAQItem
              index={2}
              openFaq={openFaq}
              toggleFaq={toggleFaq}
              question="What payment methods are available?"
              answer="Shoply currently supports Cash on Delivery for your orders."
            />

            <FAQItem
              index={3}
              openFaq={openFaq}
              toggleFaq={toggleFaq}
              question="Can I ask about a product before ordering?"
              answer="Yes. Send us the product name or details through the contact form and our team can help."
            />

            <FAQItem
              index={4}
              openFaq={openFaq}
              toggleFaq={toggleFaq}
              question="How can I return a product?"
              answer="Please contact customer service with your order details and we'll guide you through the return process."
            />

          </div>

        </div>

      </section>

    </main>
  );
}


/* =========================================================
   HELP CATEGORY
========================================================= */

function HelpCategory({ icon, title, text }) {
  return (
    <button
      type="button"
      className="
        group
        rounded-xl
        border
        border-gray-200
        bg-white
        p-5
        text-left
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-yellow-400
        hover:shadow-sm
        dark:border-[#292929]
        dark:bg-[#171717]
        dark:hover:border-yellow-400
      "
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700 transition-colors duration-200 group-hover:bg-yellow-400 group-hover:text-black dark:bg-[#242424] dark:text-gray-300">

        {icon}

      </div>

      <h3 className="mt-4 text-sm font-bold">
        {title}
      </h3>

      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
        {text}
      </p>

    </button>
  );
}


/* =========================================================
   CONTACT INFO
========================================================= */

function ContactInfo({
  icon,
  title,
  value,
  href,
}) {
  const content = (
    <div className="group flex items-center gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-[#202020]">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-yellow-400/15 text-yellow-600 dark:text-yellow-400">

        {icon}

      </div>

      <div className="min-w-0">

        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          {title}
        </p>

        <p className="mt-1 break-words text-sm font-bold text-gray-900 dark:text-white">
          {value}
        </p>

      </div>

    </div>
  );

  if (href) {
    return (
      <a href={href}>
        {content}
      </a>
    );
  }

  return content;
}


/* =========================================================
   INPUT FIELD
========================================================= */

function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full
          rounded-xl
          border
          border-gray-200
          bg-gray-50
          px-4
          py-3.5
          text-sm
          text-gray-900
          outline-none
          transition-all
          duration-200
          placeholder:text-gray-400
          focus:border-yellow-400
          focus:bg-white
          focus:ring-4
          focus:ring-yellow-400/10
          dark:border-[#333]
          dark:bg-[#202020]
          dark:text-white
          dark:focus:bg-[#202020]
        "
      />

    </div>
  );
}


/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({
  index,
  openFaq,
  toggleFaq,
  question,
  answer,
}) {
  const isOpen = openFaq === index;

  return (
    <div>

      <button
        type="button"
        onClick={() => toggleFaq(index)}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-5
          px-5
          py-5
          text-left
          transition-colors
          duration-200
          hover:bg-gray-50
          sm:px-7
          dark:hover:bg-[#202020]
        "
      >

        <span className="text-sm font-bold">
          {question}
        </span>

        <span
          className={`
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            transition-all
            duration-300
            ${
              isOpen
                ? "bg-yellow-400 text-black"
                : "bg-gray-100 text-gray-500 dark:bg-[#242424] dark:text-gray-400"
            }
          `}
        >

          <FiChevronDown
            size={17}
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />

        </span>

      </button>

      <div
        className={`
          grid
          transition-all
          duration-300
          ${
            isOpen
              ? "grid-rows-[1fr]"
              : "grid-rows-[0fr]"
          }
        `}
      >

        <div className="overflow-hidden">

          <p className="px-5 pb-5 text-sm leading-7 text-gray-500 sm:px-7 dark:text-gray-400">
            {answer}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Contact;