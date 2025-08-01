import React from 'react';
import { useRole } from '../hooks/useRole';
import RoleGuard from '../components/common/RoleGuard';
import AdminRoute from '../components/common/AdminRoute';
import ArtistRoute from '../components/common/ArtistRoute';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Example component showing different role-based patterns
const RoleBasedExamples = () => {
  const { isAdmin, isArtist, canUpload, canModerate, canEdit } = useRole();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Role-Based Access Examples</h1>

      {/* Example 1: Conditional rendering with hooks */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Using Role Hooks</h2>
        
        {isAdmin() && (
          <div className="bg-red-100 p-4 rounded mb-2">
            <p>Admin-only content using isAdmin() hook</p>
          </div>
        )}
        
        {isArtist() && (
          <div className="bg-blue-100 p-4 rounded mb-2">
            <p>Artist-only content using isArtist() hook</p>
          </div>
        )}
        
        {canUpload() && (
          <div className="bg-green-100 p-4 rounded mb-2">
            <p>Upload button visible for artists and admins</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded">
              Upload Artwork
            </button>
          </div>
        )}
      </section>

      {/* Example 2: Using RoleGuard component */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Using RoleGuard Component</h2>
        
        <RoleGuard role="admin">
          <div className="bg-red-100 p-4 rounded mb-2">
            <p>Admin-only content using RoleGuard</p>
          </div>
        </RoleGuard>
        
        <RoleGuard roles={['artist', 'admin']}>
          <div className="bg-purple-100 p-4 rounded mb-2">
            <p>Content for artists and admins using RoleGuard</p>
          </div>
        </RoleGuard>
        
        <RoleGuard 
          role="viewer" 
          fallback={
            <div className="bg-gray-100 p-4 rounded mb-2">
              <p>You need viewer role to see this content</p>
            </div>
          }
        >
          <div className="bg-yellow-100 p-4 rounded mb-2">
            <p>Viewer-only content with fallback</p>
          </div>
        </RoleGuard>
      </section>

      {/* Example 3: Route protection examples */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Route Protection Examples</h2>
        
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Route Examples (code snippets):</h3>
          
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm mb-2">
{`// Admin-only route
<Route path="/admin" element={
  <AdminRoute>
    <AdminDashboard />
  </AdminRoute>
} />`}
          </pre>
          
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm mb-2">
{`// Artist and Admin route
<Route path="/upload" element={
  <ArtistRoute>
    <UploadPage />
  </ArtistRoute>
} />`}
          </pre>
          
          <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm mb-2">
{`// Custom role protection
<Route path="/special" element={
  <ProtectedRoute 
    allowedRoles={['premium', 'admin']}
    unauthorizedPath="/upgrade"
  >
    <SpecialPage />
  </ProtectedRoute>
} />`}
          </pre>
        </div>
      </section>

      {/* Example 4: Dynamic content based on ownership */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Ownership-Based Access</h2>
        
        <div className="bg-gray-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Example Artwork Card:</h3>
          
          <div className="border p-4 rounded bg-white">
            <h4 className="font-medium">Sample Artwork</h4>
            <p className="text-gray-600 mb-3">By Artist Name</p>
            
            {/* Example: Show edit/delete buttons based on ownership or admin role */}
            <div className="flex gap-2">
              {canEdit('artist-user-id') && (
                <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm">
                  Edit
                </button>
              )}
              
              <RoleGuard role="admin">
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm">
                  Delete (Admin)
                </button>
              </RoleGuard>
              
              {canModerate() && (
                <button className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">
                  Moderate
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoleBasedExamples;