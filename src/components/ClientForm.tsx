import React from "react";
import { Client } from "../types";

interface ClientFormProps {
  onSubmit: (client: Omit<Client, "id">) => void;
  initialData?: Client;
  buttonText: string;
}

export function ClientForm({
  onSubmit,
  initialData,
  buttonText,
}: ClientFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    gender: initialData?.gender || "other",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Telefone deve ter pelo menos 10 dígitos";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">Nome</label>
        <div className="relative">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="pl-10 form-input"
            placeholder="Digite o nome do cliente"
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 animate-slide-down">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="form-label">Email</label>
        <div className="relative">
          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="pl-10 form-input"
            placeholder="Digite o email"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-red-600 animate-slide-down">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="form-label">Telefone</label>
        <div className="relative">
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="pl-10 form-input"
            placeholder="Digite o telefone"
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600 animate-slide-down">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label className="form-label">Gênero</label>
        <div className="relative">
          <select
            value={formData.gender}
            onChange={(e) =>
              setFormData({
                ...formData,
                gender: e.target.value as Client["gender"],
              })
            }
            className="pl-10 form-select"
          >
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
            <option value="other">Outro</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transform transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        {buttonText}
      </button>
    </form>
  );
}
