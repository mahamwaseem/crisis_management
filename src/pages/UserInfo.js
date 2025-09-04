import React from 'react';
import { User } from 'lucide-react';
import '../styles/UserInfo.css';

const UserInfo = ({ user }) => (
  <div className="user-card">
    <div className="user-header">
      <div className="user-avatar">
        <User size={50} />
      </div>
      <div>
        <h2 className="user-title">{user.name}</h2>
        <p className="user-subtitle">Citizen ID: {user.id}</p>
      </div>
    </div>
    
    <div className="user-grid">
      <div className="user-section">
        <div>
          <label className="user-label">Email</label>
          <p className="user-value">{user.email}</p>
        </div>
        <div>
          <label className="user-label">Phone</label>
          <p className="user-value">{user.phone}</p>
        </div>
        <div>
          <label className="user-label">CNIC</label>
          <p className="user-value">{user.cnic}</p>
        </div>
      </div>
      <div className="user-section">
        <div>
          <label className="user-label">Address</label>
          <p className="user-value">{user.address}</p>
        </div>
        <div>
          <label className="user-label">Member Since</label>
          <p className="user-value">{user.memberSince}</p>
        </div>
      </div>
    </div>
  </div>
);

export default UserInfo;
