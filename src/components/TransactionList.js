import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_TRANSACTIONS } from "../graphql/queries";

const TransactionList = () => {
    const { loading, error, data } = useQuery(GET_ALL_TRANSACTIONS);

    if (loading) return <p className="text-gray-600">Chargement des transactions...</p>;
    if (error) return <p className="text-red-600">Erreur : {error.message}</p>;

    return (
        <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Historique des Transactions</h2>

            <div className="space-y-4">
                {data?.allTransactions?.map((transaction) => (
                    <div key={transaction.id} className="border border-gray-200 rounded p-4">
                        <div className="space-y-2">
                            <p className="font-semibold text-lg">ID : {transaction.id}</p>
                            <p><span className="font-medium">Type :</span> {transaction.type}</p>
                            <p><span className="font-medium">Montant :</span> {transaction.montant?.toFixed(2)} €</p>
                            <p><span className="font-medium">Date :</span> {new Date(transaction.date).toLocaleString()}</p>
                            <p><span className="font-medium">Compte :</span> {transaction.compte.id}</p>
                        </div>
                    </div>
                ))}

                {(!data?.allTransactions || data.allTransactions.length === 0) && (
                    <p className="text-gray-500 text-center py-4">Aucune transaction trouvée</p>
                )}
            </div>
        </div>
    );
};

export default TransactionList;