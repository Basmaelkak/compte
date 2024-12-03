import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteForm() {
  const [compte, setCompte] = useState({
    solde: '',
    dateCreation: '',
    type: ''
  });

  const handleChange = (event) => {
    setCompte({ ...compte, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${API_BASE_URL}/comptes`, compte)
      .then((response) => {
        alert("Compte ajouté avec succès !");
        setCompte({ solde: '', dateCreation: '', type: '' });
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout du compte :", error);
        alert("Une erreur s'est produite lors de l'ajout.");
      });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-sm" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="card-body">
          <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>Ajouter un Compte</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="solde" className="form-label">Solde</label>
              <input
                type="number"
                name="solde"
                value={compte.solde}
                className="form-control"
                onChange={handleChange}
                required
                style={{ borderColor: '#4CAF50' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateCreation" className="form-label">Date de Création</label>
              <input
                type="date"
                name="dateCreation"
                value={compte.dateCreation}
                className="form-control"
                onChange={handleChange}
                required
                style={{ borderColor: '#4CAF50' }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="type" className="form-label">Type</label>
              <select
                name="type"
                value={compte.type}
                className="form-select"
                onChange={handleChange}
                required
                style={{ borderColor: '#4CAF50' }}
              >
                <option value="" disabled>-- Sélectionnez un type --</option>
                <option value="COURANT">Courant</option>
                <option value="EPARGNE">Épargne</option>
              </select>
            </div>
            <button type="submit" className="btn" style={{ backgroundColor: '#4CAF50', color: 'white', width: '100%' }}>
              Ajouter
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CompteForm;
