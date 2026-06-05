import React, { useState } from 'react';
import '../styles/FAQ.css';

const FAQS = [
  {
    q: 'Who can attend LITHIUM 2K26?',
    a: 'Student from any College  can attend.',
    color: '#FFB3BA',
    accent: '#E8192C',
  },
  {
    q: 'Is there a registration fee?',
    a: 'Entry to the main event is free for all.',
    color: '#BAFFC9',
    accent: '#00FF88',
  },
  {
    q: 'Why should you attend?',
    a: ' Meet your batchmates and make new friends. Experience the first major event of your college journey. Enjoy exciting performances, music, dance and entertainment. Create unforgettable memories and capture amazing moments. Interact with seniors and the college community. Feel welcomed and become a part of the TBIT family. ',
    color: '#8c26bf',
    accent: '#edcc0f',
  },
  {
    q: 'How Can I stay Updated about Lithium 2K26?',
    a: ' Follow the official Instagram & Facebook page and WhatsApp groups for announcements, schedules and event updates. ',
    color: '#d7780c',
    accent: '#ec0404',
  },
  {
    q: 'What time should I arrive at the Venue?',
    a: 'Everyone are requested to arrive at least 30 minutes before the event starts to complete entry formalities and find their seats.',
    color: '#7f1210',
    accent: '#e6aa7c',
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(o => o === i ? null : i);

  return (
    <section id="faq" className="faq-section">
    
      <div className="faq-dot-bg" />


      <div className="faq-inner">
        {/* Header */}
        <div className="faq-header">
          <span className="faq-eyebrow">✦ Got Questions? ✦</span>
          <div className="faq-title-wrap">
            <h2 className="faq-title">FAQs</h2>
            <span className="faq-classified">CLASSIFIED INTEL</span>
          </div>
          <p className="faq-sub">Everything you need to know before entering the veil.</p>
        </div>

        {/* Accordion Cards */}
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${open === i ? 'open' : ''}`}
              style={{ '--faq-bg': faq.color, '--faq-accent': faq.accent }}
            >
              {/* Question bar */}
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span className="faq-q-text">{faq.q}</span>
                <span className="faq-toggle">
                  <span className="faq-toggle-icon">{open === i ? '−' : '+'}</span>
                </span>
              </button>

              {/* Answer */}
              <div className="faq-answer">
                <p className="faq-answer-text">{faq.a}</p>
              </div>

              {/* Bottom accent bar */}
              <div className="faq-foot" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        
      </div>

       
      
      
    </section>
  );
};

export default FAQ;