/* ============================================================
   DOCUMENT MODAL — PDF download modal
   ============================================================ */
import React, { useState } from 'react';

const PDF_PATH = '/assets/karuppiah-nagar-layout.pdf';
const PDF_FILENAME = 'Karuppiah_Nagar_Layout_Plan.pdf';

export default function DocumentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch(PDF_PATH);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = PDF_FILENAME;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // Fallback: open in new tab
      window.open(PDF_PATH, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="kn-documents" id="kn-documents">
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Project Documents</span>
          <h2 className="kn-section-title">Legal & Layout Documents</h2>
          <p className="kn-section-desc">Download the official DTCP-approved layout plan and project documents.</p>
        </div>

        <div className="kn-docs__grid">
          <div className="kn-docs__card" onClick={() => setIsOpen(true)}>
            <div className="kn-docs__card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <h3 className="kn-docs__card-title">Layout Plan (PDF)</h3>
            <p className="kn-docs__card-desc">Official DTCP-approved layout plan with plot dimensions and road details.</p>
            <span className="kn-docs__card-action">View & Download →</span>
          </div>

          <a href="tel:+919150765025" className="kn-docs__card">
            <div className="kn-docs__card-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
            </div>
            <h3 className="kn-docs__card-title">Request Documents</h3>
            <p className="kn-docs__card-desc">Call us to request title deeds, EC, and other legal documents.</p>
            <span className="kn-docs__card-action">Call +91 91507 65025 →</span>
          </a>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="kn-modal-overlay" onClick={() => setIsOpen(false)}>
          <div className="kn-modal" onClick={e => e.stopPropagation()}>
            <button className="kn-modal__close" onClick={() => setIsOpen(false)} aria-label="Close">✕</button>
            <h3 className="kn-modal__title">Layout Plan — Karuppiah Nagar</h3>
            <p className="kn-modal__desc">Download the official DTCP-approved layout document for your reference.</p>
            <div className="kn-modal__preview">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                <polyline points="14,2 14,8 20,8" />
              </svg>
              <span>Layout Pattern-Model-3.pdf</span>
            </div>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="kn-btn kn-btn--primary kn-modal__download"
            >
              {isDownloading ? '⏳ Downloading...' : '⬇ Download PDF'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
