import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, Alert, Pressable } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import FunctionButton from 'components/FunctionButton';
import { getVariables, updateVariables } from 'services/api/variables';
import { Variable } from 'models/Variable';
import TimedCustomModal from 'components/modals/TimedCustomModal';

const TableEntry = ({ variable, onChange }: { variable: Variable; onChange: (newValue: string) => void }) => {
  const tw = useTailwind();

  return (
    <View style={tw('flex-col justify-between p-2 border-b border-gray-200')}>
      <Text style={tw('text-sm text-gray-600')}>{variable.description}</Text>
      <View style={tw('flex-1 my-2 flex-row items-center')}>
        <TextInput
          style={tw('border border-gray-300 rounded p-2 w-12 text-center mr-3')}
          value={variable.value.toString()}
          onChangeText={onChange}
          keyboardType="numeric"
        />
        <Text style={tw('text-xs text-gray-500')}>Valeur par défaut : {variable.default_value}</Text>
      </View>
    </View>
  );
};

const EditVariablesScreen = () => {
  const tw = useTailwind();
  const [variables, setVariables] = useState<Variable[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const response = await getVariables();
        setVariables(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des variables :", error);
        Alert.alert("Erreur", "Impossible de charger les variables.");
      }
    };

    fetchVariables();
  }, []);

  const handleVariableChange = (key: string, newValue: string) => {
    setVariables((prevState) =>
      prevState.map((variable) =>
        variable.key === key ? { ...variable, value: parseInt(newValue, 10) } : variable
      )
    );
  };

  const handleEdit = async () => {
    try {
      const updatedVariables = variables.reduce((acc: any, variable) => {
        acc[variable.key] = variable.value;
        return acc;
      }, {});

      await updateVariables(updatedVariables);
      setModalVisible(true);

    } catch (error) {
      console.error(error);
      Alert.alert("Erreur", "Échec de la modification des variables.");
    }
  };

  return (
    <View style={tw("flex-1 bg-gray-100")}>
      <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
        <CustomHeaderEmpty title="Modification des variables de l'application" backgroundColor="bg-whiteTransparent" />
        <View style={tw('w-full px-4 max-w-7xl mt-16')}>
          <Text style={tw('text-lg font-primary my-6')}>
            Modifiez les variables, puis cliquez sur enregistrer
          </Text>
          {variables.map((variable) => (
            <TableEntry
              key={variable.key}
              variable={variable}
              onChange={(newValue) => handleVariableChange(variable.key, newValue)}
            />
          ))}
          <View style={tw('w-full items-center mt-4')}>
            <FunctionButton text={"Enregistrer les modifications"} func={handleEdit} width={250} />
          </View>
        </View>
      </ScrollView>

      <TimedCustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
        <Text style={tw('text-center font-primary text-xl text-green-900')}>
          Variables modifiées avec succès.</Text>
      </TimedCustomModal>
    </View>
  );
};

export default EditVariablesScreen;
