import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_COMPTES } from "../graphql/queries";

const CompteList = () => {
    const { loading, error, data } = useQuery(GET_ALL_COMPTES);

    if (loading) return <p className="text-gray-600">Chargement des comptes...</p>;
    if (error) return <p className="text-red-600">Erreur : {error.message}</p>;

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Liste des Comptes</h2>

            <div className="space-y-4">
                {data?.allComptes?.map((compte) => (
                    <div key={compte.id} className="border border-gray-200 rounded p-4">
                        <div className="space-y-2">
                            <p className="font-semibold text-lg">ID : {compte.id}</p>
                            <p><span className="font-medium">Solde :</span> {compte.solde?.toFixed(2)} €</p>
                            <p><span className="font-medium">Date de création :</span> {new Date(compte.dateCreation).toLocaleDateString()}</p>
                            <p><span className="font-medium">Type :</span> {compte.type}</p>
                        </div>
                    </div>
                ))}

                {(!data?.allComptes || data.allComptes.length === 0) && (
                    <p className="text-gray-500 text-center py-4">Aucun compte trouvé</p>
                )}
            </div>
        </div>
    );
};

export default CompteList;