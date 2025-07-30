// src/components/common/ReportDialog.jsx
import React, { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const REPORT_REASONS = [
  { value: '', label: 'Select a reason...' },
  { value: 'spam', label: 'Spam or Scam' },
  { value: 'abuse', label: 'Abusive or Offensive' },
  { value: 'copyright', label: 'Copyright Violation' },
  { value: 'other', label: 'Other' },
];

const ReportDialog = ({ isOpen, onClose, onSubmit, targetName }) => {
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    if (!reason) return;
    onSubmit({ reason, details });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false); setReason(''); setDetails(''); onClose();
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Report Artwork`}>
      {submitted ? (
        <div className="text-center py-10">
          <div className="text-5xl mb-2">✅</div>
          <div className="text-lg text-green-400 font-semibold">Thank you for reporting.<br />We'll review this artwork soon.</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-purple-300 font-semibold">
              Reason
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border-2 bg-black bg-opacity-60 border-purple-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-400 transition"
              value={reason} onChange={e => setReason(e.target.value)}
              required
            >
              {REPORT_REASONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-purple-300 font-semibold">
              Details (optional)
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-xl border-2 bg-black bg-opacity-60 border-purple-700 text-white focus:border-pink-500 focus:ring-2 focus:ring-pink-400 transition resize-none"
              placeholder={`Explain briefly why you are reporting this artwork...`}
              rows={3}
              value={details}
              onChange={e => setDetails(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={!reason}>
              Submit Report
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};

export default ReportDialog;
