import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { SAVE_COMPTE } from '../graphql/mutations';
import { GET_ALL_COMPTES } from '../graphql/queries';

const CreateCompte = () => {
    const [solde, setSolde] = useState('');
    const [type, setType] = useState('COURANT');

    const [saveCompte, { loading, error }] = useMutation(SAVE_COMPTE, {
        refetchQueries: [{ query: GET_ALL_COMPTES }],
        onCompleted: () => {
            setSolde('');
            setType('COURANT');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!solde || parseFloat(solde) < 0) {
            alert("Veuillez entrer un solde valide");
            return;
        }

        try {
            await saveCompte({
                variables: {
                    compte: {
                        solde: parseFloat(solde),
                        type,
                    },
                },
            });
        } catch (error) {
            console.error('Erreur lors de la création du compte :', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Créer un Compte</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Solde initial
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={solde}
                        onChange={(e) => setSolde(e.target.value)}
                        required
                        placeholder="Entrez le solde initial"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type de compte
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="COURANT">Courant</option>
                        <option value="EPARGNE">Épargne</option>
                    </select>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                        <p className="text-red-800 text-sm">Erreur : {error.message}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                >
                    {loading ? 'Création...' : 'Enregistrer'}
                </button>
            </form>
        </div>
    );
};

export default CreateCompte;