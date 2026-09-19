import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiAward,
  FiCheck,
  FiCode,
  FiHeart,
  FiLayers,
  FiShield,
  FiShoppingBag,
  FiZap,
} from "react-icons/fi";

const team = [
  {
    name: "Nehal Reda",
    role: "Front-End Engineer",
    description:
      "Responsible for transforming ideas into polished, responsive, and engaging user experiences.",
    icon: FiCode,
    initials: "NR",
    image: "/nehal.jpeg",
  },
  {
    name: "Mohamed Gaber",
    role: "Back-End Developer",
    description:
      "Builds the systems and APIs that power Shoply behind the scenes.",
    icon: FiLayers,
    initials: "MG",
    image: "/mohamed.jpeg",
  },
  {
    name: "Aya Ahmed",
    role: "Back-End Developer",
    description:
      "Works on reliable backend solutions and the core logic behind the platform.",
    icon: FiZap,
    initials: "AA",
    image: "/ayaahmed.jpeg",
  },
  {
    name: "Aya Gamal",
    role: "Back-End Developer",
    description:
      "Helps build secure, scalable, and efficient services for the Shoply experience.",
    icon: FiShield,
    initials: "AG",
    image: "/ayagamal.jpeg",
  },
];

const features = [
  {
    icon: FiShoppingBag,
    title: "Everything in One Place",
    text: "A carefully designed shopping experience that brings products and categories together in one seamless place.",
  },
  {
    icon: FiZap,
    title: "Fast & Simple",
    text: "From discovering a product to adding it to your cart, every interaction is designed to feel effortless.",
  },
  {
    icon: FiShield,
    title: "Built with Trust",
    text: "We focus on creating a shopping experience that feels reliable, clear, and comfortable.",
  },
];

const stats = [
  {
    number: "01",
    label: "Unified Experience",
  },
  {
    number: "04",
    label: "Team Members",
  },
  {
    number: "∞",
    label: "Possibilities",
  },
];

function About() {
  return (
    <main className="overflow-hidden bg-white text-gray-950 dark:bg-[#111111] dark:text-white">

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#111111] text-white">

        <div className="absolute inset-0 opacity-[0.045]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        <div className="absolute right-0 top-0 h-px w-1/2 bg-[#ffd814]" />

        <div className="relative mx-auto max-w-[1500px] px-5 py-24 sm:px-8 sm:py-28 lg:px-12 lg:py-32">

          <div className="grid items-end gap-16 lg:grid-cols-[1.15fr_.85fr]">

            {/* LEFT */}
            <div className="max-w-4xl">

              <div className="mb-8 flex items-center gap-3">
                <span className="h-px w-10 bg-[#ffd814]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#ffd814]">
                  About Shoply
                </span>
              </div>

              <h1 className="text-[54px] font-semibold leading-[0.9] tracking-[-0.06em] sm:text-[78px] lg:text-[105px]">
                Shopping
                <br />

                <span className="text-[#ffd814]">
                  made better.
                </span>
              </h1>

              <div className="mt-10 max-w-2xl">
                <p className="text-[16px] leading-8 text-gray-300 sm:text-[18px]">
                  Shoply is built around one simple idea: online shopping
                  should feel effortless, modern, and enjoyable.
                </p>

                <p className="mt-5 text-[13px] leading-7 text-gray-500">
                  We bring products, technology, and thoughtful design
                  together to create a shopping experience made for
                  everyday life.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-3">

                <Link
                  to="/products"
                  className="group inline-flex h-12 items-center gap-3 bg-[#ffd814] px-7 text-[10px] font-black uppercase tracking-[0.12em] text-gray-950 transition-all duration-300 hover:bg-[#f5cd00]"
                >
                  Explore Shoply

                  <FiArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#team"
                  className="inline-flex h-12 items-center gap-3 border border-white/15 px-7 text-[10px] font-black uppercase tracking-[0.12em] text-white transition-colors duration-300 hover:border-white/40"
                >
                  Meet the team
                </a>

              </div>

            </div>

            {/* RIGHT EDITORIAL PANEL */}
            <div className="border-l border-white/10 pl-7 lg:pl-10">

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500">
                Our vision
              </p>

              <h2 className="mt-5 text-[28px] font-semibold leading-tight tracking-[-0.04em] text-white sm:text-[34px]">
                Simple.
                <br />
                Smart.
                <br />
                Shoply.
              </h2>

              <div className="mt-9 space-y-0">

                {[
                  "Discover products",
                  "Choose what you love",
                  "Shop with confidence",
                  "Enjoy the experience",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 border-t border-white/10 py-4"
                  >
                    <span className="text-[9px] font-bold tracking-widest text-[#ffd814]">
                      0{index + 1}
                    </span>

                    <span className="text-[12px] font-medium text-gray-300">
                      {item}
                    </span>

                    <FiCheck
                      size={13}
                      className="ml-auto text-gray-500"
                    />
                  </div>
                ))}

              </div>

              <div className="mt-5 flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-500">
                <FiHeart
                  size={12}
                  className="text-[#ffd814]"
                />
                Built with passion
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          STATS
      ===================================================== */}
      <section className="border-b border-[#dededb] bg-white dark:border-[#292929] dark:bg-[#111111]">

        <div className="mx-auto grid max-w-[1500px] grid-cols-1 sm:grid-cols-3">

          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-10 sm:px-10 sm:py-12 ${
                index !== 0
                  ? "border-t border-[#dededb] sm:border-l sm:border-t-0 dark:border-[#292929]"
                  : ""
              }`}
            >
              <p className="text-[42px] font-semibold leading-none tracking-[-0.05em] text-gray-950 dark:text-white">
                {stat.number}
              </p>

              <p className="mt-3 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* =====================================================
          OUR STORY
      ===================================================== */}
      <section className="bg-[#f3f3f1] py-24 dark:bg-[#171717] sm:py-28">

        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

          <div className="grid items-start gap-16 lg:grid-cols-[1fr_.9fr]">

            {/* TEXT */}
            <div>

              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[#ffd814]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-500 dark:text-gray-400">
                  Our story
                </p>
              </div>

              <h2 className="mt-5 max-w-2xl text-[40px] font-semibold leading-[1] tracking-[-0.05em] text-gray-950 dark:text-white sm:text-[55px]">
                We believe shopping should be
                <span className="text-gray-400">
                  {" "}simple.
                </span>
              </h2>

              <div className="mt-9 max-w-xl space-y-5 text-[14px] leading-7 text-gray-600 dark:text-gray-400">

                <p>
                  Shoply was created with a clear goal: to build an online
                  shopping experience that feels modern without feeling
                  complicated.
                </p>

                <p>
                  Every part of the platform is designed around the customer —
                  from discovering products and exploring categories to
                  managing a wishlist and building a cart.
                </p>

                <p>
                  Behind Shoply is a team combining front-end development,
                  back-end engineering, and a shared passion for creating
                  something useful, beautiful, and reliable.
                </p>

              </div>

              <div className="mt-9 flex items-center gap-4">

                <div className="flex -space-x-2">

                  {team.map((member) => (
                    <div
                      key={member.name}
                      className="h-9 w-9 overflow-hidden rounded-full border-2 border-[#f3f3f1] bg-gray-900 dark:border-[#171717]"
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}

                </div>

                <p className="text-[11px] font-bold text-gray-600 dark:text-gray-300">
                  Built by a team that cares.
                </p>

              </div>

            </div>

            {/* MINDSET PANEL */}
            <div className="bg-[#111111] text-white">

              <div className="border-b border-white/10 px-7 py-6 sm:px-9">

                <div className="flex items-center justify-between">

                  <span className="text-[9px] font-bold uppercase tracking-[0.23em] text-gray-500">
                    The Shoply mindset
                  </span>

                  <FiAward
                    size={17}
                    className="text-[#ffd814]"
                  />

                </div>

              </div>

              <div className="grid grid-cols-2">

                <div className="border-b border-r border-white/10 px-7 py-8 sm:px-9">
                  <p className="text-[34px] font-semibold tracking-[-0.05em]">
                    01
                  </p>

                  <p className="mt-2 text-[11px] text-gray-500">
                    Think customer first
                  </p>
                </div>

                <div className="border-b border-white/10 px-7 py-8 sm:px-9">
                  <p className="text-[34px] font-semibold tracking-[-0.05em]">
                    02
                  </p>

                  <p className="mt-2 text-[11px] text-gray-500">
                    Keep things simple
                  </p>
                </div>

                <div className="border-r border-white/10 px-7 py-8 sm:px-9">
                  <p className="text-[34px] font-semibold tracking-[-0.05em] text-[#ffd814]">
                    03
                  </p>

                  <p className="mt-2 text-[11px] text-gray-500">
                    Build with purpose
                  </p>
                </div>

                <div className="px-7 py-8 sm:px-9">
                  <p className="text-[34px] font-semibold tracking-[-0.05em] text-[#ffd814]">
                    04
                  </p>

                  <p className="mt-2 text-[11px] text-gray-500">
                    Keep improving
                  </p>
                </div>

              </div>

              <div className="border-t border-white/10 px-7 py-6 sm:px-9">

                <p className="max-w-md text-[13px] font-semibold leading-6 text-gray-300">
                  “Great shopping experiences aren't accidental.
                  They're designed.”
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          WHY SHOPLY
      ===================================================== */}
      <section className="bg-white py-24 dark:bg-[#111111] sm:py-28">

        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

          <div className="flex flex-col justify-between gap-7 border-b border-[#dededb] pb-10 sm:flex-row sm:items-end dark:border-[#292929]">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Why Shoply
              </p>

              <h2 className="mt-4 text-[40px] font-semibold leading-none tracking-[-0.05em] text-gray-950 dark:text-white sm:text-[52px]">
                Designed around
                <span className="text-gray-400">
                  {" "}you.
                </span>
              </h2>

            </div>

            <p className="max-w-md text-[12px] leading-6 text-gray-500 sm:text-right">
              We combine technology and thoughtful design to make every
              shopping interaction feel easier.
            </p>

          </div>

          <div className="grid border-b border-[#dededb] md:grid-cols-3 dark:border-[#292929]">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className={`group px-1 py-10 sm:px-7 sm:py-12 ${
                    index !== 0
                      ? "border-t border-[#dededb] md:border-l md:border-t-0 dark:border-[#292929]"
                      : ""
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div className="flex h-11 w-11 items-center justify-center bg-gray-950 text-[#ffd814] transition-colors duration-300 group-hover:bg-[#ffd814] group-hover:text-gray-950 dark:bg-white dark:text-gray-950">
                      <Icon size={19} />
                    </div>

                    <span className="text-[9px] font-bold tracking-[0.15em] text-gray-300 dark:text-gray-600">
                      0{index + 1}
                    </span>

                  </div>

                  <h3 className="mt-8 text-[19px] font-semibold tracking-[-0.025em] text-gray-950 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 max-w-sm text-[12px] leading-6 text-gray-500 dark:text-gray-400">
                    {feature.text}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400 transition-colors group-hover:text-gray-950 dark:group-hover:text-white">
                    Shoply experience

                    <FiArrowRight
                      size={12}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          TEAM
      ===================================================== */}
      <section
        id="team"
        className="bg-[#f3f3f1] py-24 dark:bg-[#171717] sm:py-28"
      >

        <div className="mx-auto max-w-[1500px] px-5 sm:px-8 lg:px-12">

          <div className="flex flex-col justify-between gap-7 border-b border-[#dededb] pb-10 md:flex-row md:items-end dark:border-[#292929]">

            <div>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
                The team
              </p>

              <h2 className="mt-4 text-[40px] font-semibold leading-none tracking-[-0.05em] text-gray-950 dark:text-white sm:text-[52px]">
                The people behind
                <span className="text-gray-400">
                  {" "}Shoply.
                </span>
              </h2>

            </div>

            <p className="max-w-md text-[12px] leading-6 text-gray-500 md:text-right">
              Four people. Different responsibilities. One shared goal:
              building a better digital shopping experience.
            </p>

          </div>

          <div className="grid gap-px bg-[#dededb] sm:grid-cols-2 lg:grid-cols-4 dark:bg-[#292929]">

            {team.map((member, index) => {

              const Icon = member.icon;

              return (
                <div
                  key={member.name}
                  className="group bg-white p-4 dark:bg-[#1a1a1a] sm:p-5"
                >

                  {/* IMAGE */}
                  <div className="relative h-[320px] overflow-hidden bg-gray-200 dark:bg-[#222]">

                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.035]"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent" />

                    <span className="absolute left-4 top-4 text-[9px] font-bold tracking-[0.15em] text-white">
                      0{index + 1}
                    </span>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">

                      <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#ffd814]">
                        {member.role}
                      </p>

                      <div className="flex h-8 w-8 items-center justify-center bg-[#ffd814] text-gray-950">
                        <Icon size={14} />
                      </div>

                    </div>

                  </div>

                  {/* INFO */}
                  <div className="px-1 pb-2 pt-6">

                    <h3 className="text-[19px] font-semibold tracking-[-0.025em] text-gray-950 dark:text-white">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#b59a00] dark:text-[#ffd814]">
                      {member.role}
                    </p>

                    <p className="mt-4 text-[12px] leading-6 text-gray-500 dark:text-gray-400">
                      {member.description}
                    </p>

                  </div>

                  <div className="mt-5 flex items-center gap-2 border-t border-[#e5e5e2] px-1 pt-4 text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400 dark:border-[#292929]">

                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                    Building Shoply

                  </div>

                </div>
              );
            })}

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <section className="bg-white px-5 py-20 dark:bg-[#111111] sm:px-8 sm:py-24">

        <div className="mx-auto max-w-[1500px] border-t border-[#dededb] pt-16 dark:border-[#292929]">

          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">

            <div className="max-w-3xl">

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-gray-400">
                Ready to explore?
              </p>

              <h2 className="mt-5 text-[42px] font-semibold leading-[0.95] tracking-[-0.055em] text-gray-950 dark:text-white sm:text-[60px]">

                Your next favorite

                <span className="text-[#ffd814]">
                  {" "}thing
                </span>

                {" "}is waiting.

              </h2>

              <p className="mt-6 max-w-xl text-[13px] leading-7 text-gray-500 dark:text-gray-400">
                Discover products, explore categories, and experience
                shopping the Shoply way.
              </p>

            </div>

            <Link
              to="/products"
              className="group inline-flex h-12 shrink-0 items-center gap-3 bg-[#ffd814] px-7 text-[10px] font-black uppercase tracking-[0.12em] text-gray-950 transition-all duration-300 hover:bg-[#f5cd00]"
            >
              Start Shopping

              <FiArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}

export default About;