// components/UserProfile.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../../services/userService'; 
import { toast } from 'react-toastify';
import '../profile/UserProfile.css';
import { MdEmail } from 'react-icons/md';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await userService.getUserById(id, localStorage.getItem('token'));
        setUser(data[0]);
      } catch (error) {
        toast.error('Error al obtener los datos del usuario');
      }
    };
    fetchUser();
  }, [id]);

  const handleBack = () => {
    navigate('/taskmanager');
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="user-profile">
      <h2>Perfil del Usuario</h2>
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input type="text" id="name" value={user.name} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="last_name">Apellido:</label>
        <input type="text" id="last_name" value={user.last_name} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Número:</label>
        <input type="text" id="phone" value={user.phone} readOnly />
      </div>
      <div className="form-group">
        <label htmlFor="address">Dirección:</label>
        <input type="text" id="address" value={user.address} readOnly />
      </div>
      <button className="back-button" onClick={handleBack}>Volver al Taskmaster</button>
    </div>
  );
};

export default UserProfile;
