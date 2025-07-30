// src/components/admin/ReportTable.jsx
import React from 'react';

const ReportTable = ({ reports, onResolve, onIgnore }) => (
  <div className="bg-gradient-to-br from-pink-900 via-black/90 to-purple-950 p-8 rounded-3xl shadow-2xl border border-pink-700/30">
    <h2 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text mb-6">
      Reports & Moderation
    </h2>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-pink-700 bg-pink-800/40">
            <th className="py-3 px-4 text-left text-pink-200 font-semibold">ID</th>
            <th className="py-3 px-4 text-left text-pink-200 font-semibold">Artwork</th>
            <th className="py-3 px-4 text-left text-pink-200 font-semibold">Reporter</th>
            <th className="py-3 px-4 text-left text-pink-200 font-semibold">Reason</th>
            <th className="py-3 px-4 text-left text-pink-200 font-semibold">Date</th>
            <th className="py-3 px-4 text-center text-pink-200 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.length > 0 ? reports.map(report => (
            <tr key={report.id} className="hover:bg-pink-900/15 border-b border-pink-700/30 transition">
              <td className="py-2 px-4 text-white">{report.id}</td>
              <td className="py-2 px-4 text-purple-200 font-bold">{report.artworkTitle}</td>
              <td className="py-2 px-4 text-blue-200">{report.reportedBy}</td>
              <td className="py-2 px-4 text-pink-300 max-w-xs truncate" title={report.reason}>{report.reason}</td>
              <td className="py-2 px-4 text-gray-300">{new Date(report.date).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-center space-x-2">
                <button
                  onClick={() => onResolve(report)}
                  className="px-3 py-1 bg-green-600/90 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition"
                >Resolve</button>
                <button
                  onClick={() => onIgnore(report)}
                  className="px-3 py-1 bg-gray-700/90 hover:bg-gray-600 text-white rounded-xl text-xs font-bold transition"
                >Ignore</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} className="py-10 text-center text-gray-400">No reports available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ReportTable;
