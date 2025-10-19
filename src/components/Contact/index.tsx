"use client";

import { useState } from "react";
import NewsLatterBox from "./NewsLatterBox";

type Status = { type: "idle" | "loading" | "success" | "error"; message?: string };

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status.type === "loading") return;

    // basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus({ type: "error", message: "Udfyld venligst alle felter." });
      return;
    }
    if (!/[^\s@]+@[^\s@]+\.[^\s@]+/.test(email)) {
      setStatus({ type: "error", message: "Indtast en gyldig e-mailadresse." });
      return;
    }

    setStatus({ type: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Noget gik galt. Prøv igen senere.");
      }
      setStatus({ type: "success", message: "Tak! Din besked er sendt." });
      setName("");
      setEmail("");
      setMessage("");
      setCompany("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Noget gik galt.";
      setStatus({ type: "error", message: msg });
    }
  };
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div
              className="relative mb-12 rounded-xs bg-white px-8 py-11 shadow-two hover:shadow-one dark:bg-gray-dark dark:shadow-three dark:hover:shadow-gray-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] duration-300"
              data-wow-delay=".15s
              "
            >
              {/* Top accent bar */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] rounded-t-xs bg-gradient-to-r from-green-500 via-green-500/70 to-green-500/30 dark:from-green-400 dark:via-green-400/70 dark:to-green-400/40"
              />
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">
                Brug for hjælp?
              </h2>
              <p className="mb-12 text-base font-medium text-body-color">
                Skriv til os – vi vender hurtigt tilbage på e-mail.
              </p>
              <form onSubmit={onSubmit} noValidate>
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="name"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Dit navn
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Dit navn"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 md:w-1/2">
                    <div className="mb-8">
                      <label
                        htmlFor="email"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Din e-mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Din e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4">
                    <div className="mb-8">
                      <label
                        htmlFor="message"
                        className="mb-3 block text-sm font-medium text-dark dark:text-white"
                      >
                        Din besked
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        placeholder="Skriv din besked"
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="border-stroke w-full resize-none rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:shadow-two dark:focus:border-primary dark:focus:shadow-none"
                      ></textarea>
                    </div>
                  </div>
                  {/* Honeypot field - visually hidden but accessible to bots */}
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="w-full px-4">
                    <button
                      type="submit"
                      disabled={status.type === "loading"}
                      className="rounded-xs bg-primary px-9 py-4 text-base font-medium text-white shadow-submit duration-300 hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed dark:shadow-submit-dark"
                    >
                      {status.type === "loading" ? "Sender…" : "Send besked"}
                    </button>
                    {status.type === "error" && (
                      <p className="mt-4 text-sm text-red-600 dark:text-red-400">{status.message}</p>
                    )}
                    {status.type === "success" && (
                      <p className="mt-4 text-sm text-green-600 dark:text-green-400">{status.message}</p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
