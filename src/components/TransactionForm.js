import React, { useState } from 'react';
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TRANSACTION } from '../graphql/mutations';
import { GET_ALL_COMPTES, GET_ALL_TRANSACTIONS } from '../graphql/queries';

const TransactionForm = () => {
    const [montant, setMontant] = useState('');
    const [type, setType] = useState('DEPOT');
    const [compteId, setCompteId] = useState('');

    const { data: comptesData } = useQuery(GET_ALL_COMPTES);

    const [addTransaction, { loading, error }] = useMutation(ADD_TRANSACTION, {
        refetchQueries: [
            { query: GET_ALL_COMPTES },
            { query: GET_ALL_TRANSACTIONS }
        ],
        onCompleted: () => {
            setMontant('');
            setType('DEPOT');
            setCompteId('');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!montant || parseFloat(montant) <= 0 || !compteId) {
            alert("Veuillez remplir tous les champs correctement");
            return;
        }

        try {
            await addTransaction({
                variables: {
                    transaction: {
                        type,
                        montant: parseFloat(montant),
                        compteId,
                    },
                },
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la transaction :', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ajouter une Transaction</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Compte
                    </label>
                    <select
                        value={compteId}
                        onChange={(e) => setCompteId(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Sélectionnez un compte</option>
                        {comptesData?.allComptes?.map((compte) => (
                            <option key={compte.id} value={compte.id}>
                                {compte.id} - {compte.type} - {compte.solde?.toFixed(2)}€
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type de transaction
                    </label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    >
                        <option value="DEPOT">Dépôt</option>
                        <option value="RETRAIT">Retrait</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Montant
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        required
                        placeholder="Entrez le montant"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                    />
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded p-3">
                        <p className="text-red-800 text-sm">Erreur : {error.message}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 focus:outline-none disabled:opacity-50"
                >
                    {loading ? 'Ajout...' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
};

export default TransactionForm;