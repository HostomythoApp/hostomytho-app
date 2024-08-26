import React, { useState } from 'react';
import { View, Text, ScrollView, Switch, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import { dumpTable } from 'services/api/utils';
import FunctionButton from 'components/FunctionButton';

const tableDescriptions = {
  users: "Utilisateurs de l'application",
  texts: "Table des textes (contient la note moyenne de plausibilité donnée par les utilisateurs: avg_weighted_plausibility)",
  user_text_rating: "Annotations de plausibilité dans MythoOuPas",
  user_sentence_specification: "Annotations de négations dans MythoNo",
  user_typing_errors: "Typage d'erreurs dans MythoTypo",
  user_error_details: "Erreurs spécifiées dans MythoOuPas",
  // test_specifications: "Spécifications des tests effectués",
};

const TableEntry = ({ tableName, isActive, onToggle }: { tableName: any, isActive: boolean, onToggle: any }) => {
  const tw = useTailwind();
  return (
    <View style={tw('flex-row items-center justify-between p-2 border-b border-gray-200')}>
      <View style={tw('flex-1')}>
        <Text style={tw('text-lg font-semibold')}>{tableName}</Text>
        {/* @ts-ignore */}
        <Text style={tw('text-sm text-gray-600')}>{tableDescriptions[tableName]}</Text>
      </View>
      <Switch
        value={isActive}
        onValueChange={onToggle}
      />
    </View>
  );
};

const ExportDataScreen = () => {
  const tw = useTailwind();
  const [selectedTables, setSelectedTables] = useState({
    users: false,
    texts: false,
    user_text_rating: false,
    user_sentence_specification: false,
    user_typing_errors: false,
    user_error_details: false,
    // test_specifications: false,
  });

  const handleCheckboxChange = (tableName: any) => {
    setSelectedTables(prevState => ({
      ...prevState,
      // @ts-ignore
      [tableName]: !prevState[tableName]
    }));
  };

  const handleDownload = async () => {
    // @ts-ignore
    const tablesToExport = Object.keys(selectedTables).filter(table => selectedTables[table]);
    if (tablesToExport.length === 0) {
      Alert.alert('Aucune table sélectionnée', 'Veuillez sélectionner au moins une table à exporter.');
      return;
    }
    try {
      await dumpTable(tablesToExport);
      Alert.alert('Succès', 'Les tables sélectionnées ont été exportées avec succès.');
    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Échec de l'exportation des données.");
    }
  };

  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Exporter les données de l'application" backgroundColor="bg-whiteTransparent" />
        <View style={tw('w-full px-4')}>
          <Text style={tw('text-lg font-primary my-6')}
          > Cochez les tables que vous souhaitez exporter</Text>
          {Object.keys(selectedTables).map((tableName) => (
            <TableEntry
              key={tableName}
              tableName={tableName}
              // @ts-ignore
              isActive={selectedTables[tableName]}
              onToggle={() => handleCheckboxChange(tableName)}
            />
          ))}
          <View style={tw('w-full items-center mt-4')}>
            <FunctionButton text={"Exporter les tables"} func={handleDownload} width={250} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExportDataScreen;
