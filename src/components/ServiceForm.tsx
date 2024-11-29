import React from "react";
import { Service } from "../types";

interface ServiceFormProps {
  onSubmit: (service: Omit<Service, "id">) => void;
  initialData?: Service;
  buttonText: string;
}

export function ServiceForm({
  onSubmit,
  initialData,
  buttonText,
}: ServiceFormProps) {
  const [formData, setFormData] = React.useState({
    name: initialData?.name || "",
    price: initialData?.price || "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    price: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      price: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Nome do serviço é obrigatório";
    }

    if (!formData.price) {
      newErrors.price = "Preço é obrigatório";
    } else if (Number(formData.price) <= 0) {
      newErrors.price = "Preço deve ser maior que 0";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        name: formData.name,
        price: Number(formData.price),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="form-label">Nome do Serviço</label>
        <div className="relative">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="pl-10 form-input"
            placeholder="Digite o nome do serviço"
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-red-600 animate-slide-down">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label className="form-label">Preço</label>
        <div className="relative">
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="pl-10 form-input"
            placeholder="Digite o preço do serviço"
          />
        </div>
        {errors.price && (
          <p className="mt-1 text-sm text-red-600 animate-slide-down">
            {errors.price}
          </p>
        )}
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
