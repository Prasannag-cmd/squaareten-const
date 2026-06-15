/* ============================================================
   AI SMART CONSULTATION ASSISTANT
   Keyword-matching FAQ engine with conversation flow
   ============================================================ */
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

// Knowledge Base
const kb = [
  { keys: ['hello', 'hi', 'hey', 'good'], response: 'Hello! Welcome to Squaareten Construction. 🏗️ How can I assist you today? I can help with project estimates, service information, or booking a consultation.', chips: ['Services', 'Cost Estimate', 'Book Consultation'] },
  { keys: ['service', 'what do you', 'offer', 'provide'], response: 'We offer 6 premium services:\n\n🏠 Residential Construction\n🏢 Commercial Projects\n🏡 Villa Construction\n🔧 Renovation & Remodeling\n🎨 Interior Design\n🔑 Turnkey Solutions\n\nWhich service interests you?', chips: ['Residential', 'Villa', 'Commercial', 'Renovation'] },
  { keys: ['cost', 'price', 'rate', 'budget', 'how much', 'estimate', 'pricing'], response: 'Our construction rates vary by project type:\n\n• Residential: ₹1,800–2,200/sq.ft.\n• Villa: ₹2,200–3,000/sq.ft.\n• Commercial: ₹2,000–2,800/sq.ft.\n• Renovation: ₹1,200–1,800/sq.ft.\n\nWant an instant personalized estimate? Try our AI Cost Estimator!', chips: ['Open Estimator', 'Book Consultation'] },
  { keys: ['residential', 'home', 'house'], response: 'Our Residential Construction service covers custom homes designed around your lifestyle. We handle everything from architectural planning to final finishing.\n\n✅ Modern & traditional designs\n✅ Earthquake-resistant structure\n✅ Smart home integration available\n✅ 10-year structural warranty', chips: ['Cost Estimate', 'View Projects', 'Book Consultation'] },
  { keys: ['villa', 'luxury'], response: 'Our Luxury Villa Construction is our premium offering. We create architectural masterpieces with:\n\n✅ Bespoke architectural design\n✅ Premium Italian marble & imported fixtures\n✅ Infinity pools, home theaters\n✅ Landscaped gardens & outdoor living\n✅ Complete smart home automation', chips: ['Villa Pricing', 'View Projects'] },
  { keys: ['commercial', 'office', 'retail', 'shop'], response: 'Our Commercial Construction division specializes in:\n\n🏢 Office complexes & co-working spaces\n🏬 Retail & shopping centers\n🏭 Industrial & warehouse facilities\n\nWe focus on sustainable design with LEED certification options.', chips: ['Cost Estimate', 'Book Consultation'] },
  { keys: ['renovation', 'remodel', 'upgrade'], response: 'Our Renovation & Remodeling service transforms existing spaces:\n\n🔧 Complete home makeovers\n🏠 Kitchen & bathroom remodeling\n🏛️ Heritage building restoration\n🏗️ Structural reinforcement\n\nWe preserve what you love while upgrading for modern living.', chips: ['Renovation Cost', 'Before & After'] },
  { keys: ['interior', 'design', 'furnish'], response: 'Our Interior Design services include:\n\n🎨 Concept design & 3D visualization\n🪑 Custom furniture & cabinetry\n💡 Lighting design\n🖼️ Art curation & styling\n\nWe offer Basic, Premium, and Ultra-Luxury packages.', chips: ['Interior Packages', 'Cost Estimate'] },
  { keys: ['timeline', 'how long', 'duration', 'time', 'months'], response: 'Typical project timelines:\n\n⏱️ Residential: 8–12 months\n⏱️ Villa: 12–18 months\n⏱️ Commercial: 14–24 months\n⏱️ Renovation: 3–6 months\n⏱️ Interior: 2–4 months\n\nTimelines depend on project size and complexity.', chips: ['Cost Estimate', 'Book Consultation'] },
  { keys: ['book', 'consult', 'meeting', 'appointment', 'contact', 'call'], response: 'We\'d love to discuss your project! Here\'s how to reach us:\n\n📞 +91 7540002054 or +91 91507 65025\n💬 WhatsApp: +91 7540002054 / +91 91507 65025\n✉️ info@squaareten.com\n📍 Visit our office\n\nOr fill out the contact form on this page and we\'ll call you within 24 hours!', chips: ['WhatsApp Us', 'Go to Contact', 'Services'] },
  { keys: ['team', 'experience', 'about', 'who', 'company'], response: 'Squaareten Construction has been building excellence for 10+ years:\n\n👥 50+ experienced professionals\n🏗️ 250+ projects completed\n⭐ 98% client satisfaction rate\n🏆 Multiple industry awards\n\nWe\'re committed to quality, transparency, and timely delivery.', chips: ['View Projects', 'Services'] },
  { keys: ['turnkey', 'end to end', 'complete', 'full'], response: 'Our Turnkey Solution is our most comprehensive offering — just hand us the key!\n\n✅ Architectural design\n✅ Structural engineering\n✅ Construction management\n✅ Interior design & furnishing\n✅ Landscaping & exterior\n✅ Final handover with quality check\n\nOne team, one timeline, zero hassle.', chips: ['Cost Estimate', 'Book Consultation'] },
  { keys: ['material', 'quality', 'brand', 'cement', 'steel', 'marble'], response: 'We use only premium materials from trusted brands:\n\n🧱 UltraTech / ACC Cement\n🔩 Tata Steel / JSW\n🪨 Italian & Indian marble\n🪟 Saint-Gobain glass\n🚰 Jaquar / Kohler fittings\n🎨 Asian Paints premium range\n\nAll materials come with warranty certificates.', chips: ['View Projects', 'Cost Estimate'] },
  { keys: ['warranty', 'guarantee', 'after'], response: 'Our warranty coverage:\n\n🛡️ 10-year structural warranty\n🛡️ 5-year waterproofing warranty\n🛡️ 2-year electrical & plumbing warranty\n🛡️ 1-year interior finishing warranty\n\nWe also offer post-construction maintenance packages.', chips: ['Book Consultation', 'Services'] },
  { keys: ['package', 'plan', 'tier'], response: 'We offer three construction packages:\n\n⭐ Essential Build — Quality basics with standard specs\n⭐⭐ Premium Plus — Enhanced materials, modern design\n⭐⭐⭐ Luxury Signature — Ultra-premium, fully bespoke\n\nUse our AI Cost Estimator to see pricing for each tier!', chips: ['Open Estimator', 'Book Consultation'] },
];

const fallback = {
  response: 'I appreciate your question! For detailed information on that topic, I\'d recommend speaking with our construction experts directly.\n\nShall I help you book a free consultation?',
  chips: ['Book Consultation', 'Services', 'Cost Estimate']
};

export default function AIAssistant({ onOpenEstimator }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chips, setChips] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const showGreeting = useCallback(() => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: 'Welcome to Squaareten Construction! 🏗️✨\n\nI\'m your AI construction assistant. I can help you with:\n\n• Service information\n• Cost estimates\n• Project timelines\n• Booking consultations\n\nHow can I help you today?'
      }
    ]);
    setChips(['Services', 'Cost Estimate', 'WhatsApp Us', 'Book Consultation']);
  }, []);

  const togglePanel = useCallback(() => {
    setIsOpen(prev => {
      const next = !prev;
      if (next && messages.length === 0) {
        showGreeting();
      }
      return next;
    });
  }, [messages.length, showGreeting]);

  // Scroll to bottom of message panel
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const findResponse = useCallback((text) => {
    const lower = text.toLowerCase();
    for (const entry of kb) {
      if (entry.keys.some(k => lower.includes(k))) {
        return entry;
      }
    }
    return fallback;
  }, []);

  const handleSend = useCallback((textToSend) => {
    const text = textToSend.trim();
    if (!text) return;

    // Add user message
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, sender: 'user', text }]);
    setInputVal('');
    setChips([]);
    setIsTyping(true);

    // Typing delay simulation
    setTimeout(() => {
      setIsTyping(false);
      const match = findResponse(text);
      const botMsgId = Date.now() + 1;
      setMessages(prev => [...prev, { id: botMsgId, sender: 'bot', text: match.response }]);
      if (match.chips) {
        setChips(match.chips);
      }
    }, 800 + Math.random() * 600);
  }, [findResponse]);

  const handleChipClick = useCallback((text) => {
    if (text === 'Open Estimator' || text === 'Cost Estimate') {
      if (onOpenEstimator) onOpenEstimator();
      return;
    }
    if (text === 'Go to Contact' || text === 'Book Consultation') {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = 'contact';
      }
      setIsOpen(false);
      return;
    }
    if (text === 'WhatsApp Us') {
      window.open('https://wa.me/919150765025?text=Hello%20Squareten%20Constructions%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.', '_blank');
      return;
    }
    if (text === 'View Projects') {
      window.location.href = '/projects';
      return;
    }

    handleSend(text);
  }, [handleSend, onOpenEstimator]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        className={`ai-fab ${isOpen ? 'is-open' : ''}`}
        onClick={togglePanel}
        aria-label="Toggle AI Consultation Assistant"
      >
        <span className="ai-fab__icon-chat">💬</span>
        <span className="ai-fab__icon-close">✕</span>
      </button>

      {/* Chat Panel */}
      <div className={`ai-panel ${isOpen ? 'is-open' : ''}`}>
        <div className="ai-panel__header">
          <div className="ai-panel__avatar">AI</div>
          <div className="ai-panel__info">
            <div className="ai-panel__name">Squaareten Assistant</div>
            <div className="ai-panel__status">Online</div>
          </div>
        </div>

        <div className="ai-panel__messages">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`ai-msg ai-msg--${msg.sender} is-visible`}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br>') }}
            />
          ))}

          {isTyping && (
            <div className="ai-msg ai-msg--bot ai-msg--typing is-visible">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {chips.length > 0 && (
          <div className="ai-panel__chips">
            {chips.map((text, idx) => (
              <button
                key={idx}
                className="ai-chip"
                onClick={() => handleChipClick(text)}
              >
                {text}
              </button>
            ))}
          </div>
        )}

        <div className="ai-panel__input-area">
          <input
            type="text"
            className="ai-panel__input"
            placeholder="Type your question..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(inputVal);
            }}
          />
          <button
            className="ai-panel__send"
            onClick={() => handleSend(inputVal)}
          >
            ➔
          </button>
        </div>
      </div>
    </>
  );
}
