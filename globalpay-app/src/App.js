import React, { useState } from "react";

const GlobalPayIntegration = () => {
  const [formData, setFormData] = useState({
    amount: "",
    currency: "USD",
    customerName: "",
    customerEmail: "",
    bank: "",
    iban: "",
    swift: "",
    countryCode: "",
    paymentType: "single",
    reference: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Procesando pago...");

    try {
      const response = await fetch("http://localhost:5000/api/create-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirigir al usuario a la URL de pago de GlobalPay
        window.location.href = data.payment_url;
      } else {
        setMessage(`Error: ${data.message || "No se pudo procesar el pago."}`);
      }
    } catch (error) {
      setMessage("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <img
          src={require("./global.svg").default}
          alt="GlobalPay Logo"
          className="w-32 mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-center mb-4">Pago con GlobalPay</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="number" name="amount" placeholder="Monto (USD)" value={formData.amount} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="customerName" placeholder="Nombre del Cliente" value={formData.customerName} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="email" name="customerEmail" placeholder="Correo Electrónico" value={formData.customerEmail} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="bank" placeholder="Banco del Cliente" value={formData.bank} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="iban" placeholder="IBAN" value={formData.iban} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="swift" placeholder="BIC/SWIFT" value={formData.swift} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <input type="text" name="countryCode" placeholder="Código del País" value={formData.countryCode} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <select name="paymentType" value={formData.paymentType} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="single">Pago Único</option>
            <option value="recurring">Pago Recurrente</option>
          </select>
          <input type="text" name="reference" placeholder="Referencia del Pago" value={formData.reference} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded"/>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Enviar Pago</button>
        </form>

        {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default GlobalPayIntegration;
