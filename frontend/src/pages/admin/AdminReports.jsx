import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import ReportTable from '../../components/admin/ReportTable';
import apiService from '../../services/api';

const AdminReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');

  useEffect(() => {
    fetchReports();
  }, [statusFilter]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAdminReports({ status: statusFilter });
      if (response.success && response.data) {
        setReports(response.data.reports || []);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const onResolve = async (report) => {
    if (window.confirm('Are you sure you want to mark this report as resolved?')) {
      try {
        await apiService.updateReportStatus(report.id, { status: 'resolved' });
        alert('Report resolved successfully!');
        fetchReports();
      } catch (error) {
        console.error('Error resolving report:', error);
        alert(`Failed to resolve report: ${error.message}`);
      }
    }
  };

  const onIgnore = async (report) => {
    if (window.confirm('Are you sure you want to dismiss this report?')) {
      try {
        await apiService.updateReportStatus(report.id, { status: 'dismissed' });
        alert('Report dismissed successfully!');
        fetchReports();
      } catch (error) {
        console.error('Error dismissing report:', error);
        alert(`Failed to dismiss report: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-purple-900">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <main className="p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                Reports Management
              </h1>
              <div className="flex items-center space-x-4">
                <label className="text-pink-300 font-semibold">Filter by Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-pink-600/30 rounded-lg text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                  <option value="reviewed">Reviewed</option>
                </select>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <ReportTable reports={reports} onResolve={onResolve} onIgnore={onIgnore} />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminReports;
