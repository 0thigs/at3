import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, User, Mail, Phone, Users } from "lucide-react";
import { Client } from "../types";
import { ClientForm } from "../components/ClientForm";
import { loadClients, saveClients } from "../utils/storage";

export function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  useEffect(() => {
    setClients(loadClients());
  }, []);

  const handleAddClient = (clientData: Omit<Client, "id">) => {
    const newClient = {
      ...clientData,
      id: Date.now().toString(),
    };
    const updatedClients = [...clients, newClient];
    setClients(updatedClients);
    saveClients(updatedClients);
    setIsAddingClient(false);
  };

  const handleUpdateClient = (clientData: Omit<Client, "id">) => {
    if (editingClient) {
      const updatedClients = clients.map((client) =>
        client.id === editingClient.id
          ? { ...clientData, id: client.id }
          : client
      );
      setClients(updatedClients);
      saveClients(updatedClients);
      setEditingClient(null);
    }
  };

  const handleDeleteClient = (id: string) => {
    const updatedClients = clients.filter((client) => client.id !== id);
    setClients(updatedClients);
    saveClients(updatedClients);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="flex gap-2 items-center text-2xl font-bold text-gray-900">
          <Users size={28} />
          Clientes
        </h2>
        <button
          onClick={() => setIsAddingClient(true)}
          className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transform transition-all duration-200 hover:scale-[1.02]"
        >
          <Plus size={20} />
          Adicionar Cliente
        </button>
      </div>

      {isAddingClient && (
        <div className="p-6 bg-white rounded-lg shadow-md animate-scale-in">
          <h3 className="mb-4 text-lg font-semibold">Novo Cliente</h3>
          <ClientForm
            onSubmit={handleAddClient}
            buttonText="Adicionar Cliente"
          />
          <button
            onClick={() => setIsAddingClient(false)}
            className="mt-4 text-gray-600 transition-colors duration-200 hover:text-gray-800"
          >
            Cancelar
          </button>
        </div>
      )}

      {editingClient && (
        <div className="p-6 bg-white rounded-lg shadow-md animate-scale-in">
          <h3 className="mb-4 text-lg font-semibold">Editar Cliente</h3>
          <ClientForm
            initialData={editingClient}
            onSubmit={handleUpdateClient}
            buttonText="Atualizar Cliente"
          />
          <button
            onClick={() => setEditingClient(null)}
            className="mt-4 text-gray-600 transition-colors duration-200 hover:text-gray-800"
          >
            Cancelar
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="p-6 bg-white rounded-lg shadow-md transition-shadow duration-200 hover:shadow-lg animate-fade-in"
          >
            <div className="flex gap-2 items-center mb-2">
              <User className="text-purple-600" size={20} />
              <h3 className="text-lg font-semibold">{client.name}</h3>
            </div>
            <div className="flex gap-2 items-center mb-1 text-gray-600">
              <Mail size={16} />
              <p>{client.email}</p>
            </div>
            <div className="flex gap-2 items-center mb-1 text-gray-600">
              <Phone size={16} />
              <p>{client.phone}</p>
            </div>
            <p className="mb-4 text-gray-600 capitalize">
              {client.gender === "male"
                ? "Masculino"
                : client.gender === "female"
                ? "Feminino"
                : "Outro"}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingClient(client)}
                className="flex gap-1 items-center text-blue-600 transition-colors duration-200 hover:text-blue-800"
              >
                <Edit size={16} />
                Editar
              </button>
              <button
                onClick={() => handleDeleteClient(client.id)}
                className="flex gap-1 items-center text-red-600 transition-colors duration-200 hover:text-red-800"
              >
                <Trash2 size={16} />
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {clients.length === 0 && !isAddingClient && (
        <div className="py-12 text-center text-gray-500 animate-fade-in">
          Nenhum cliente cadastrado. Clique em "Adicionar Cliente" para começar.
        </div>
      )}
    </div>
  );
}
