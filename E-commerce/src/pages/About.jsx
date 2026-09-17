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

      <section className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-gray-950">

        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-yellow-400/10 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.06]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 lg:px-12">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">

            <div className="max-w-3xl">

              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 backdrop-blur-md">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-400" />
                More than shopping
              </div>

              <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
                Shopping
                <br />
                <span className="text-yellow-400">
                  made better.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
                Shoply is built around one simple idea: online shopping
                should feel effortless, modern, and enjoyable.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
                We bring products, technology, and thoughtful design together
                to create a shopping experience made for everyday life.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  to="/products"
                  className="group inline-flex items-center gap-3 rounded-xl bg-yellow-400 px-7 py-4 text-sm font-black text-gray-950 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-[0_15px_40px_rgba(255,216,20,0.25)]"
                >
                  Explore Shoply

                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href="#team"
                  className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10"
                >
                  Meet the team
                </a>

              </div>
            </div>


            <div className="relative mx-auto w-full max-w-[480px]">

              <div className="absolute -right-5 -top-5 h-24 w-24 rounded-full border border-yellow-400/20" />

              <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full border border-white/10" />

              <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-2xl backdrop-blur-xl">

                <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-7">

                  <div className="mb-10 flex items-center justify-between">

                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                        Our vision
                      </p>

                      <p className="mt-2 text-2xl font-black text-white">
                        Simple. Smart. Shoply.
                      </p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-gray-950">
                      <FiShoppingBag size={22} />
                    </div>

                  </div>


                  <div className="space-y-4">

                    {[
                      "Discover products",
                      "Choose what you love",
                      "Shop with confidence",
                      "Enjoy the experience",
                    ].map((item, index) => (

                      <div
                        key={item}
                        className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
                      >

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-sm font-black text-yellow-400">
                          0{index + 1}
                        </div>

                        <span className="text-sm font-semibold text-gray-300">
                          {item}
                        </span>

                        <FiCheck className="ml-auto text-yellow-400" />

                      </div>

                    ))}

                  </div>


                  <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-6">

                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
                      Built with passion
                    </span>

                    <FiHeart className="text-yellow-400" />

                  </div>

                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      <section className="border-b border-gray-100 bg-white dark:border-[#2a2a2a] dark:bg-[#111111]">

        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-gray-100 px-5 dark:divide-[#2a2a2a] sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-12">

          {stats.map((stat) => (

            <div
              key={stat.label}
              className="px-6 py-10 text-center sm:py-12"
            >

              <p className="text-4xl font-black tracking-tight text-gray-950 dark:text-white">
                {stat.number}
              </p>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                {stat.label}
              </p>

            </div>

          ))}

        </div>

      </section>


      {/* =====================================================
          OUR STORY
      ===================================================== */}
      <section className="bg-gray-50 py-24 dark:bg-[#171717] sm:py-28">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="grid items-center gap-16 lg:grid-cols-2">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-500">
                Our story
              </p>

              <h2 className="mt-4 max-w-xl text-4xl font-black leading-tight tracking-[-0.03em] text-gray-950 dark:text-white sm:text-5xl">
                We believe shopping should be
                <span className="text-gray-400">
                  {" "}
                  simple.
                </span>
              </h2>

              <div className="mt-8 space-y-5 text-[15px] leading-8 text-gray-600 dark:text-gray-400">

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


              <div className="mt-9 flex items-center gap-3">

                <div className="flex -space-x-3">

                  {team.map((member) => (

                    <div
                      key={member.name}
                      className="h-10 w-10 overflow-hidden rounded-full border-2 border-gray-50 bg-gray-950 dark:border-[#171717]"
                    >

                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />

                    </div>

                  ))}

                </div>

                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  Built by a team that cares.
                </p>

              </div>

            </div>


            <div className="relative">

              <div className="absolute -inset-5 rounded-[2.5rem] bg-yellow-400/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] bg-gray-950 p-7 shadow-2xl sm:p-9">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500">
                    The Shoply mindset
                  </span>

                  <FiAward className="text-yellow-400" />

                </div>


                <div className="mt-12">

                  <div className="h-px w-full bg-white/10" />

                  <div className="grid grid-cols-2">

                    <div className="border-r border-white/10 py-8 pr-6">

                      <p className="text-4xl font-black text-white">
                        01
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Think customer first
                      </p>

                    </div>

                    <div className="py-8 pl-6">

                      <p className="text-4xl font-black text-white">
                        02
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Keep things simple
                      </p>

                    </div>

                  </div>


                  <div className="h-px w-full bg-white/10" />


                  <div className="grid grid-cols-2">

                    <div className="border-r border-white/10 py-8 pr-6">

                      <p className="text-4xl font-black text-yellow-400">
                        03
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Build with purpose
                      </p>

                    </div>

                    <div className="py-8 pl-6">

                      <p className="text-4xl font-black text-yellow-400">
                        04
                      </p>

                      <p className="mt-2 text-sm text-gray-500">
                        Keep improving
                      </p>

                    </div>

                  </div>

                </div>


                <div className="mt-8 rounded-2xl bg-yellow-400 p-5">

                  <p className="text-sm font-black leading-6 text-gray-950">
                    “Great shopping experiences aren't accidental.
                    They're designed.”
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY SHOPLY
      ===================================================== */}
      <section className="bg-white py-24 dark:bg-[#111111] sm:py-28">

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-500">
              Why Shoply
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-gray-950 dark:text-white sm:text-5xl">
              Designed around
              <span className="text-gray-400">
                {" "}
                you.
              </span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500 dark:text-gray-400">
              We combine technology and thoughtful design to make every
              shopping interaction feel easier.
            </p>

          </div>


          <div className="mt-16 grid gap-5 md:grid-cols-3">

            {features.map((feature, index) => {

              const Icon = feature.icon;

              return (

                <div
                  key={feature.title}
                  className="group rounded-[1.75rem] border border-gray-100 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 hover:shadow-2xl dark:border-[#2a2a2a] dark:bg-[#1a1a1a] dark:hover:border-[#3a3a3a]"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-950 text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-gray-950">
                      <Icon size={23} />
                    </div>

                    <span className="text-xs font-black text-gray-200 dark:text-gray-600">
                      0{index + 1}
                    </span>

                  </div>


                  <h3 className="mt-8 text-xl font-black text-gray-950 dark:text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                    {feature.text}
                  </p>


                  <div className="mt-7 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 transition-colors group-hover:text-gray-950 dark:group-hover:text-white">

                    Shoply experience

                    <FiArrowRight className="transition-transform group-hover:translate-x-1" />

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
        className="bg-gray-50 py-24 dark:bg-[#171717] sm:py-28"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

          {/* Team heading */}
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-500">
                The team
              </p>

              <h2 className="mt-4 max-w-2xl text-4xl font-black tracking-[-0.03em] text-gray-950 dark:text-white sm:text-5xl">
                The people behind
                <span className="text-gray-400">
                  {" "}
                  Shoply.
                </span>
              </h2>

            </div>

            <p className="max-w-md text-sm leading-7 text-gray-500 dark:text-gray-400 md:text-right">
              Four people. Different responsibilities. One shared goal:
              building a better digital shopping experience.
            </p>

          </div>


          {/* Team cards */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {team.map((member, index) => {

              const Icon = member.icon;

              return (

                <div
                  key={member.name}
                  className="group relative overflow-hidden rounded-[1.75rem] border border-gray-100 bg-white p-4 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl dark:border-[#2a2a2a] dark:bg-[#1a1a1a] sm:p-5"
                >

                  <div className="relative h-64 w-full overflow-hidden rounded-[1.5rem] bg-gray-950">

                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />


                    <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1.5 text-xs font-black text-white backdrop-blur-md">
                      0{index + 1}
                    </span>


                    <div className="absolute bottom-4 left-4">

                      <p className="text-[10px] font-black uppercase tracking-[0.15em] text-yellow-400">
                        {member.role}
                      </p>

                    </div>


                    {/* Icon */}
                    <div className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-xl bg-yellow-400 text-gray-950 shadow-lg">
                      <Icon size={15} />
                    </div>

                  </div>


                  {/* ================= INFO ================= */}
                  <div className="px-1 pb-1 pt-6">

                    <h3 className="text-xl font-black text-gray-950 dark:text-white">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-xs font-black uppercase tracking-[0.12em] text-yellow-500">
                      {member.role}
                    </p>

                    <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-400">
                      {member.description}
                    </p>

                  </div>


                  {/* Bottom status */}
                  <div className="mt-5 flex items-center gap-2 border-t border-gray-100 px-1 pt-5 text-xs font-bold text-gray-400 dark:border-[#2a2a2a]">

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
      <section className="bg-white px-5 py-24 dark:bg-[#111111] sm:px-8 sm:py-28">

        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gray-950 px-7 py-16 sm:px-12 sm:py-20 lg:px-20">

          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-yellow-400/10 blur-3xl" />

          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-yellow-400/5 blur-3xl" />


          <div className="relative z-10 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">

            <div className="max-w-2xl">

              <p className="text-xs font-black uppercase tracking-[0.25em] text-yellow-400">
                Ready to explore?
              </p>

              <h2 className="mt-4 text-4xl font-black tracking-[-0.03em] text-white sm:text-5xl">

                Your next favorite

                <span className="text-yellow-400">
                  {" "}
                  thing{" "}
                </span>

                is waiting.

              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500">
                Discover products, explore categories, and experience
                shopping the Shoply way.
              </p>

            </div>


            <Link
              to="/products"
              className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-yellow-400 px-7 py-4 text-sm font-black text-gray-950 transition-all duration-300 hover:-translate-y-1 hover:bg-yellow-300 hover:shadow-[0_15px_40px_rgba(255,216,20,0.25)]"
            >

              Start Shopping

              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />

            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default About;