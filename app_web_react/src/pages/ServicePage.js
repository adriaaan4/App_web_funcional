import React, { useState } from "react";
import ServiceForm from "../components/ServiceForm";
import ServiceList from "../components/ServiceList";

export default function ServicePage() {
  const [selectedService, setSelectedService] = useState(null);

  const handleEdit = (service) => setSelectedService(service);
  const handleSaveComplete = () => setSelectedService(null);

  return (
    <div style={{ margin: "20px" }}>
      <h1>Gestión de Servicios</h1>

      <ServiceForm
        serviceToEdit={selectedService}
        onSaveComplete={handleSaveComplete}
      />

      <hr />

      <ServiceList onEdit={handleEdit} />
    </div>
  );
}