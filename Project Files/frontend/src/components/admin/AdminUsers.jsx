import React, { useEffect, useState } from 'react';
import authAxios from '../../utils/authAxios';
import './Admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const { data } = await authAxios.get('/api/admin/getallusers');
    setUsers(data);
  };

  const deleteUser = async (id) => {
    await authAxios.delete(`/api/admin/delete-user/${id}`);
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  const formatDate = (iso) => {
    const d = new Date(iso);
    return isNaN(d) ? 'N/A' : d.toLocaleDateString();
  };

  return (
    <div className="admin-users">
      <h2>All Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Joined</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{formatDate(u.createdAt)}</td>
                <td>
                  <button onClick={() => deleteUser(u._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;
