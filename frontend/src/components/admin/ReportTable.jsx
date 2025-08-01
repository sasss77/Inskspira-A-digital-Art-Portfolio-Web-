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
            <th className="py-3 px-4 text-left text-pink-200 font-semibold">Description</th>
            <th className="py-3 px-4 text-left text-pink-200 font-semibold">Status</th>
            <th className="py-3 px-4 text-left text-pink-200 font-semibold">Date</th>
            <th className="py-3 px-4 text-center text-pink-200 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports && reports.length > 0 ? reports.map(report => (
            <tr key={report.id} className="hover:bg-pink-900/15 border-b border-pink-700/30 transition">
              <td className="py-2 px-4 text-white">{report.id}</td>
              <td className="py-2 px-4 text-purple-200 font-bold">
                 {report.artwork ? (
                   <div className="flex items-center space-x-2">
                     {report.artwork.imageUrl && (
                       <img 
                         src={report.artwork.imageUrl} 
                         alt={report.artwork.title}
                         className="w-8 h-8 rounded object-cover border border-purple-500/30"
                       />
                     )}
                     <a 
                       href={`/artwork/${report.artwork.id}`}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-purple-300 hover:text-purple-100 underline transition-colors"
                       title="View artwork"
                     >
                       {report.artwork.title}
                     </a>
                   </div>
                 ) : (
                   <span className="text-gray-400">No artwork</span>
                 )}
               </td>
              <td className="py-2 px-4 text-blue-200">
                 {report.reporter ? (
                   <a 
                     href={`/profile/${report.reporter.username}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-blue-300 hover:text-blue-100 underline transition-colors"
                     title="View reporter profile"
                   >
                     @{report.reporter.username}
                   </a>
                 ) : (
                   <span className="text-gray-400">Unknown user</span>
                 )}
               </td>
              <td className="py-2 px-4 text-pink-300 max-w-xs truncate" title={report.reason}>
                 <span className="capitalize">{report.reason.replace('_', ' ')}</span>
               </td>
               <td className="py-2 px-4 text-gray-300 max-w-xs truncate" title={report.description}>
                 {report.description || 'No description provided'}
               </td>
               <td className="py-2 px-4">
                 <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                   report.status === 'pending' ? 'bg-yellow-600/20 text-yellow-300' :
                   report.status === 'resolved' ? 'bg-green-600/20 text-green-300' :
                   report.status === 'dismissed' ? 'bg-gray-600/20 text-gray-300' :
                   'bg-blue-600/20 text-blue-300'
                 }`}>
                   {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                 </span>
               </td>
               <td className="py-2 px-4 text-gray-300">{new Date(report.createdAt).toLocaleDateString()}</td>
              <td className="py-2 px-4 text-center space-x-2">
                 {report.status === 'pending' && (
                   <>
                     <button
                       onClick={() => onResolve(report)}
                       className="px-3 py-1 bg-green-600/90 hover:bg-green-700 text-white rounded-xl text-xs font-bold transition"
                       title="Mark as resolved"
                     >
                       ✅ Resolve
                     </button>
                     <button
                       onClick={() => onIgnore(report)}
                       className="px-3 py-1 bg-gray-700/90 hover:bg-gray-600 text-white rounded-xl text-xs font-bold transition"
                       title="Dismiss this report"
                     >
                       ❌ Dismiss
                     </button>
                   </>
                 )}
                 {report.status !== 'pending' && (
                   <span className="text-gray-500 text-xs italic">
                     {report.status === 'resolved' ? 'Resolved' : 'Dismissed'}
                   </span>
                 )}
               </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={8} className="py-10 text-center text-gray-400">No reports available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ReportTable;
