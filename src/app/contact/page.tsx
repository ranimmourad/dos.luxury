"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  return (
    <>
      <section className="bg-dos-black text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">Contact</p>
          <h1 className="font-display text-4xl lg:text-5xl mt-3">Get in touch with D.O.S</h1>
          <p className="mt-3 text-neutral-400 max-w-xl">
            Questions, custom orders or wholesale enquiries — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="border border-dos-gold p-10 text-center">
                <p className="font-display text-3xl">Thank you.</p>
                <p className="mt-3 text-neutral-600">
                  Your message has been received. The D.O.S team will reply within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
                  className="mt-7 btn-outline-dark px-6 py-3 text-xs"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Name" required>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input"
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input"
                    />
                  </Field>
                </div>
                <Field label="Subject">
                  <input
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="input"
                  />
                </Field>
                <Field label="Message" required>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input resize-y"
                  />
                </Field>
                <button type="submit" className="btn-gold px-10 py-4 text-xs">
                  Send Message
                </button>

                <style jsx>{`
                  .input {
                    width: 100%;
                    border: 1px solid #e5e5e5;
                    background: #fff;
                    padding: 12px 14px;
                    font-size: 14px;
                    outline: none;
                    transition: border-color .2s;
                  }
                  .input:focus { border-color: #c9a961; }
                `}</style>
              </form>
            )}
          </div>

          {/* Info */}
          <aside className="bg-dos-cream/40 border border-dos-line p-8 lg:p-10 h-fit">
            <p className="text-[11px] tracking-[0.4em] uppercase text-dos-gold">D.O.S Tunisia</p>
            <h2 className="font-display text-2xl mt-2">Reach the house</h2>

            <ul className="mt-7 space-y-5">
              <li>
                <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 mb-1">Phone</p>
                <a href="tel:+21620084541" className="block text-base hover:text-dos-gold transition-colors">
                  +216 20 084 541
                </a>
                <a href="tel:23707806" className="block text-base hover:text-dos-gold transition-colors">
                  23 707 806
                </a>
              </li>
              <li>
                <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 mb-1">Email</p>
                <a href="mailto:yassindammak820@gmail.com" className="text-base hover:text-dos-gold transition-colors break-all">
                  yassindammak820@gmail.com
                </a>
              </li>
              <li>
                <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 mb-1">Website</p>
                <a href="https://dammak.outfit.store" target="_blank" rel="noopener" className="text-base hover:text-dos-gold transition-colors">
                  dammak.outfit.store
                </a>
              </li>
              <li>
                <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 mb-1">Hours</p>
                <p>Monday – Saturday · 9:00 – 19:00 (GMT+1)</p>
              </li>
            </ul>

            <div className="mt-8 pt-7 border-t border-dos-line">
              <p className="text-[11px] tracking-[0.25em] uppercase text-neutral-500 mb-3">Follow</p>
              <div className="flex gap-2">
                <a href="#" className="btn-outline-dark px-4 py-2 text-[11px]">Instagram</a>
                <a href="#" className="btn-outline-dark px-4 py-2 text-[11px]">TikTok</a>
                <a href="#" className="btn-outline-dark px-4 py-2 text-[11px]">Facebook</a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
        {label}{required && <span className="text-dos-gold ml-1">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
