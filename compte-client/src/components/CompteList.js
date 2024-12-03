import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config';

function CompteList() {
  const [comptes, setComptes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [compteToEdit, setCompteToEdit] = useState({
    id: '',
    solde: '',
    dateCreation: '',
    type: ''
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then((response) => setComptes(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des comptes :", error));
  }, []);

  const handleChange = (event) => {
    setCompteToEdit({ ...compteToEdit, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`${API_BASE_URL}/comptes/${compteToEdit.id}`, compteToEdit)
      .then(() => {
        alert("Compte modifié avec succès !");
        setIsEditing(false);
        setCompteToEdit({ id: '', solde: '', dateCreation: '', type: '' });
        fetchComptes();
      })
      .catch((error) => {
        console.error("Erreur lors de la modification du compte", error);
        alert("Erreur lors de la modification du compte.");
      });
  };

  const startEditing = (compte) => {
    setCompteToEdit(compte);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setCompteToEdit({ id: '', solde: '', dateCreation: '', type: '' });
  };

  const fetchComptes = () => {
    axios.get(`${API_BASE_URL}/comptes`)
      .then((response) => setComptes(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des comptes :", error));
  };

  const handleDelete = (compteId) => {
    axios.delete(`${API_BASE_URL}/comptes/${compteId}`)
      .then(() => {
        alert("Compte supprimé avec succès !");
        fetchComptes();
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression du compte", error);
        alert("Erreur lors de la suppression du compte.");
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ color: '#4CAF50' }}>Liste des Comptes</h2>

      {isEditing ? (
        <div className="card shadow-sm mb-4" style={{ backgroundColor: '#f5f5f5' }}>
          <div className="card-body">
            <h3 style={{ color: '#4CAF50' }}>Modifier le Compte</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="solde" className="form-label">Solde</label>
                <input
                  type="number"
                  name="solde"
                  value={compteToEdit.solde}
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
                  value={compteToEdit.dateCreation}
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
                  value={compteToEdit.type}
                  className="form-select"
                  onChange={handleChange}
                  required
                  style={{ borderColor: '#4CAF50' }}
                >
                  <option value="COURANT">Courant</option>
                  <option value="EPARGNE">Épargne</option>
                </select>
              </div>
              <button type="submit" className="btn" style={{ backgroundColor: '#4CAF50', color: 'white' }}>Modifier</button>
              <button type="button" className="btn btn-secondary ms-2" onClick={cancelEditing}>Annuler</button>
            </form>
          </div>
        </div>
      ) : (
        <table className="table table-bordered table-striped" style={{ backgroundColor: '#f5f5f5' }}>
          <thead style={{ backgroundColor: '#4CAF50', color: 'white' }}>
            <tr>
              <th>ID</th>
              <th>Solde</th>
              <th>Date de Création</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comptes.map((compte) => (
              <tr key={compte.id}>
                <td>{compte.id}</td>
                <td>{compte.solde}</td>
                <td>{compte.dateCreation}</td>
                <td>{compte.type}</td>
                <td>
                  <button className="btn" style={{ backgroundColor: '#4CAF50', color: 'white' }} onClick={() => startEditing(compte)}>
                    Modifier
                  </button>
                  <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(compte.id)}>
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CompteList;

