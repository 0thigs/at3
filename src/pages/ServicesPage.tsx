import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Scissors, DollarSign } from "lucide-react";
import { Service } from "../types";
import { ServiceForm } from "../components/ServiceForm";
import { loadServices, saveServices } from "../utils/storage";

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    setServices(loadServices());
  }, []);

  const handleAddService = (serviceData: Omit<Service, "id">) => {
    const newService = {
      ...serviceData,
      id: Date.now().toString(),
    };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    saveServices(updatedServices);
    setIsAddingService(false);
  };

  const handleUpdateService = (serviceData: Omit<Service, "id">) => {
    if (editingService) {
      const updatedServices = services.map((service) =>
        service.id === editingService.id
          ? { ...serviceData, id: service.id }
          : service
      );
      setServices(updatedServices);
      saveServices(updatedServices);
      setEditingService(null);
    }
  };

  const handleDeleteService = (id: string) => {
    const updatedServices = services.filter((service) => service.id !== id);
    setServices(updatedServices);
    saveServices(updatedServices);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="flex gap-2 items-center text-2xl font-bold text-gray-900">
          <Scissors size={28} />
          Serviços
        </h2>
        <button
          onClick={() => setIsAddingService(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transform transition-all duration-200 hover:scale-[1.02]"
        >
          <Plus size={20} />
          Adicionar Serviço
        </button>
      </div>

      {isAddingService && (
        <div className="p-6 bg-white rounded-lg shadow-md animate-scale-in">
          <h3 className="mb-4 text-lg font-semibold">Novo Serviço</h3>
          <ServiceForm
            onSubmit={handleAddService}
            buttonText="Adicionar Serviço"
          />
          <button
            onClick={() => setIsAddingService(false)}
            className="mt-4 text-gray-600 transition-colors duration-200 hover:text-gray-800"
          >
            Cancelar
          </button>
        </div>
      )}

      {editingService && (
        <div className="p-6 bg-white rounded-lg shadow-md animate-scale-in">
          <h3 className="mb-4 text-lg font-semibold">Editar Serviço</h3>
          <ServiceForm
            initialData={editingService}
            onSubmit={handleUpdateService}
            buttonText="Atualizar Serviço"
          />
          <button
            onClick={() => setEditingService(null)}
            className="mt-4 text-gray-600 transition-colors duration-200 hover:text-gray-800"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="p-6 bg-white rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg animate-fade-in"
          >
            <div className="flex gap-2 items-center mb-2">
              <Scissors className="text-purple-600" size={20} />
              <h3 className="text-lg font-semibold">{service.name}</h3>
            </div>
            <div className="flex gap-2 items-center mb-4 text-gray-600">
              <DollarSign size={16} />
              <p>R$ {service.price.toFixed(2)}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingService(service)}
                className="flex gap-1 items-center text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                <Edit size={16} />
                Editar
              </button>
              <button
                onClick={() => handleDeleteService(service.id)}
                className="flex gap-1 items-center text-red-600 transition-colors duration-200 hover:text-red-800"
              >
                <Trash2 size={16} />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {services.length === 0 && !isAddingService && (
        <div className="py-12 text-center text-gray-500 animate-fade-in">
          Nenhum serviço cadastrado. Clique em "Adicionar Serviço" para começar.
        </div>
      )}
    </div>
  );
}
