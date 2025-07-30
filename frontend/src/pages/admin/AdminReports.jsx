import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ReportTable from '../../components/admin/ReportTable';

const mockReports = [
  { id: 1, artworkTitle: 'Mystic Forest', reportedBy: 'ArtLover', reason: 'Spam', date: '2025-07-30' },
  { id: 2, artworkTitle: 'Sunset Overdrive', reportedBy: 'UserX', reason: 'Copyright', date: '2025-07-28' },
  { id: 3, artworkTitle: 'Electric Night', reportedBy: 'CoolViewer', reason: 'Abuse', date: '2025-07-25' }
];

const AdminReports = () => {
  const [reports, setReports] = useState(mockReports);
  const onResolve = (report) => setReports(r => r.filter(rp => rp.id !== report.id));
  const onIgnore = (report) => setReports(r => r.filter(rp => rp.id !== report.id));

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-purple-900">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8">
          <ReportTable reports={reports} onResolve={onResolve} onIgnore={onIgnore} />
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
