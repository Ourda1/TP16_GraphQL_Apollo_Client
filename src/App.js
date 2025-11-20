import React from 'react';
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo/client";
import CompteList from "./components/CompteList";
import CreateCompte from "./components/CreateCompte";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import "./App.css";

function App() {
  return (
      <ApolloProvider client={client}>
        <div className="min-h-screen bg-white py-8">
          <div className="container mx-auto px-4 max-w-3xl">

            {/* Titre principal */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Gestion des Comptes et Transactions
              </h1>
            </div>

            {/* Contenu principal en une seule colonne */}
            <div className="space-y-8">

              {/* Section Créer un Compte */}
              <div className="border border-gray-300 rounded-lg p-6">
                <CreateCompte />
              </div>

              {/* Section Liste des Comptes */}
              <div className="border border-gray-300 rounded-lg p-6">
                <CompteList />
              </div>

              {/* Section Ajouter une Transaction */}
              <div className="border border-gray-300 rounded-lg p-6">
                <TransactionForm />
              </div>

              {/* Section Historique des Transactions */}
              <div className="border border-gray-300 rounded-lg p-6">
                <TransactionList />
              </div>

            </div>
          </div>
        </div>
      </ApolloProvider>
  );
}

export default App;