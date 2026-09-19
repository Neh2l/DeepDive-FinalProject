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
    <main className="min-h-screen bg-[#f5f5f3] text-[#111] transition-colors duration-300 dark:bg-[#111] dark:text-white">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="border-b border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">
        <div className="mx-auto max-w-[1500px] px-5 py-9 sm:px-8 sm:py-11 lg:px-12 lg:py-14">

          {/* Breadcrumb */}

          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
            <span>Home</span>

            <FiArrowRight size={11} />

            <span className="text-gray-800 dark:text-gray-200">
              Contact Us
            </span>
          </div>

          <div className="mt-9 flex flex-col justify-between gap-7 md:flex-row md:items-end">

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-gray-400">
                Customer Service
              </p>

              <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-0.055em] sm:text-5xl lg:text-6xl">
                How can we help you?
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 dark:text-gray-400">
                Find answers, get help with your orders, or contact
                our customer service team.
              </p>
            </div>

            <div className="flex items-center gap-4 border border-[#deded9] bg-[#f8f8f6] px-5 py-4 dark:border-[#303030] dark:bg-[#202020]">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#ffd600] text-black">
                <FiHeadphones size={18} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400">
                  Need help?
                </p>

                <p className="mt-1 text-sm font-black">
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

      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 sm:py-10 lg:px-12">

        <div className="grid grid-cols-2 gap-px border border-[#deded9] bg-[#deded9] md:grid-cols-3 lg:grid-cols-6 dark:border-[#292929] dark:bg-[#292929]">

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

      <section className="mx-auto max-w-[1500px] px-5 pb-10 sm:px-8 lg:px-12">

        <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr]">

          {/* =================================================
              CUSTOMER SERVICE
          ================================================= */}

          <div className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">

            <div className="border-b border-[#deded9] px-7 py-7 sm:px-8 sm:py-8 dark:border-[#292929]">

              <div className="flex items-center gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#ffd600] text-black">
                  <FiHeadphones size={20} />
                </div>

                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
                    Contact us
                  </p>

                  <h2 className="mt-1.5 text-xl font-black tracking-[-0.02em]">
                    Customer Service
                  </h2>
                </div>

              </div>
            </div>

            <div className="px-7 py-8 sm:px-8 sm:py-9">

              <p className="max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400">
                Our customer service team is ready to help you with
                your orders, products, payments, and more.
              </p>

              <div className="mt-8 space-y-1">

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

              <div className="mt-8 border border-[#e3e3de] bg-[#f8f8f6] px-5 py-5 dark:border-[#292929] dark:bg-[#202020]">

                <div className="flex gap-4">

                  <FiMessageCircle
                    className="mt-0.5 shrink-0 text-[#c6a900] dark:text-[#ffd600]"
                    size={19}
                  />

                  <div>

                    <p className="text-sm font-black">
                      Need quick assistance?
                    </p>

                    <p className="mt-2 text-xs leading-6 text-gray-500 dark:text-gray-400">
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

          <div className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">

            <div className="border-b border-[#deded9] px-7 py-7 sm:px-8 sm:py-8 dark:border-[#292929]">

              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
                Send us a message
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] sm:text-3xl">
                Tell us what you need
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 dark:text-gray-400">
                Complete the form below and we'll help you with your
                request.
              </p>

            </div>

            <div className="px-7 py-8 sm:px-8 sm:py-9">

              {/* SUCCESS MESSAGE */}

              {submitted && (
                <div className="mb-7 flex items-start gap-4 border border-green-200 bg-green-50 px-5 py-4 dark:border-green-900/40 dark:bg-green-900/10">

                  <FiCheckCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-green-600 dark:text-green-400"
                  />

                  <div>

                    <p className="text-sm font-bold text-green-700 dark:text-green-400">
                      Message sent successfully
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-green-600 dark:text-green-500">
                      Thank you for contacting Shoply. We'll get
                      back to you soon.
                    </p>

                  </div>

                </div>
              )}

              {/* ERROR MESSAGE */}

              {error && (
                <div className="mb-7 flex items-start gap-4 border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900/40 dark:bg-red-900/10">

                  <FiAlertCircle
                    size={19}
                    className="mt-0.5 shrink-0 text-red-600 dark:text-red-400"
                  />

                  <div>

                    <p className="text-sm font-bold text-red-700 dark:text-red-400">
                      Message could not be sent
                    </p>

                    <p className="mt-1.5 text-xs leading-5 text-red-600 dark:text-red-500">
                      {error}
                    </p>

                  </div>

                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >

                {/* NAME + EMAIL */}

                <div className="grid gap-7 sm:grid-cols-2">

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

                  <label className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
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
                      border
                      border-[#d6d6d1]
                      bg-[#fafaf8]
                      px-4
                      py-4
                      text-sm
                      text-gray-900
                      outline-none
                      transition-all
                      duration-200
                      placeholder:text-gray-400
                      focus:border-black
                      focus:bg-white
                      dark:border-[#333]
                      dark:bg-[#202020]
                      dark:text-white
                      dark:focus:border-white
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
                    min-h-14
                    w-full
                    items-center
                    justify-center
                    gap-3
                    bg-[#ffd600]
                    px-6
                    py-4
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.14em]
                    text-black
                    transition-all
                    duration-300
                    hover:bg-[#f3ca00]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {sending
                    ? "Sending..."
                    : "Send Message"}

                  <FiSend
                    size={16}
                    className={`transition-transform duration-300 ${
                      sending
                        ? "animate-pulse"
                        : "group-hover:translate-x-1"
                    }`}
                  />

                </button>

                <p className="text-center text-[10px] leading-5 text-gray-400">
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

      <section className="mx-auto max-w-[1500px] px-5 pb-14 sm:px-8 lg:px-12">

        <div className="border border-[#deded9] bg-white dark:border-[#292929] dark:bg-[#181818]">

          <div className="border-b border-[#deded9] px-7 py-7 sm:px-8 sm:py-8 dark:border-[#292929]">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-400">
                  Help Center
                </p>

                <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] sm:text-3xl">
                  Frequently Asked Questions
                </h2>

              </div>

              <p className="text-[10px] uppercase tracking-[0.12em] text-gray-400">
                Find answers to common questions
              </p>

            </div>
          </div>

          <div className="divide-y divide-[#deded9] dark:divide-[#292929]">

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
        bg-white
        px-5
        py-6
        text-left
        transition-all
        duration-300
        hover:bg-[#fafaf8]
        dark:bg-[#181818]
        dark:hover:bg-[#202020]
      "
    >

      <div className="flex h-10 w-10 items-center justify-center border border-[#deded9] bg-[#f7f7f5] text-gray-600 transition-all duration-300 group-hover:border-[#ffd600] group-hover:bg-[#ffd600] group-hover:text-black dark:border-[#333] dark:bg-[#222] dark:text-gray-300">
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-black">
        {title}
      </h3>

      <p className="mt-1.5 text-[10px] leading-5 text-gray-500 dark:text-gray-400">
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
    <div className="group flex items-center gap-4 px-2 py-4 transition-colors duration-200 hover:bg-[#f8f8f6] dark:hover:bg-[#202020]">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#deded9] bg-[#fafaf8] text-gray-600 dark:border-[#333] dark:bg-[#202020] dark:text-gray-300">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-gray-400">
          {title}
        </p>

        <p className="mt-1.5 break-words text-sm font-bold text-gray-900 dark:text-white">
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

      <label className="mb-2.5 block text-[10px] font-black uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
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
          border
          border-[#d6d6d1]
          bg-[#fafaf8]
          px-4
          py-3.5
          text-sm
          text-gray-900
          outline-none
          transition-all
          duration-200
          placeholder:text-gray-400
          focus:border-black
          focus:bg-white
          dark:border-[#333]
          dark:bg-[#202020]
          dark:text-white
          dark:focus:border-white
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
          px-6
          py-6
          text-left
          transition-colors
          duration-200
          hover:bg-[#fafaf8]
          sm:px-8
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
            border
            transition-all
            duration-300
            ${
              isOpen
                ? "border-[#ffd600] bg-[#ffd600] text-black"
                : "border-[#deded9] bg-[#f7f7f5] text-gray-500 dark:border-[#333] dark:bg-[#222] dark:text-gray-400"
            }
          `}
        >

          <FiChevronDown
            size={16}
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

          <p className="max-w-4xl px-6 pb-6 text-sm leading-7 text-gray-500 sm:px-8 dark:text-gray-400">
            {answer}
          </p>

        </div>

      </div>

    </div>
  );
}

export default Contact;