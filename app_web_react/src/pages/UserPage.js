import React, { useState } from "react";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

export default function UserPage() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => setSelectedUser(user);
  const handleSaveComplete = () => setSelectedUser(null);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Gestión de Usuarios</h1>

      <UserForm userToEdit={selectedUser} onSaveComplete={handleSaveComplete} />

      <hr />

      <UserList onEdit={handleEdit} />
    </div>
  );
}

