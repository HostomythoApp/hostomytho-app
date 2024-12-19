import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import { getAllErrorTests, deleteErrorTestById } from 'services/api/testError';
import { getTypesError } from 'services/api/errors';
import {
    useReactTable,
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from '@tanstack/react-table';
import CustomHeaderEmpty from "components/header/CustomHeaderEmpty";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from '@react-navigation/native';
import CustomModal from "components/modals/CustomModal";
import { RootStackNavigationProp } from "navigation/Types";

const columnHelper = createColumnHelper<any>();

export default function ManageListTestErrorScreen() {
    const tw = useTailwind();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [errorIdToDelete, setErrorIdToDelete] = useState<number | null>(null);
    const [errorTypes, setErrorTypes] = useState<any[]>([]);
    const navigation = useNavigation<RootStackNavigationProp<"Menu">>();

    const fetchErrors = async () => {
        try {
            const response = await getAllErrorTests();
            setData(response);
        } catch (error) {
            console.error('Error fetching errors:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchErrorTypes = async () => {
        try {
            const types = await getTypesError();
            setErrorTypes(types);
        } catch (error) {
            console.error("Error fetching error types:", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchErrors();
            fetchErrorTypes();
        }, [])
    );

    const handleDeleteError = async () => {
        if (!errorIdToDelete) return;
        try {
            await deleteErrorTestById(errorIdToDelete);
            Alert.alert("Succès", "Erreur supprimée.");
            setModalVisible(false);
            fetchErrors(); // Refresh the table after deletion
        } catch (error) {
            Alert.alert("Erreur", "La suppression a échoué.");
        }
    };

    const columns = [
        columnHelper.accessor('id', {
            header: () => 'Id',
            cell: info => info.getValue(),
            footer: info => info.column.id,
            enableSorting: true,
        }),
        columnHelper.accessor('text_id', {
            header: () => 'Id du texte lié',
            cell: info => (
                <View style={[tw('flex-row items-center'), { minWidth: 120 }]}>
                    <Text>{info.getValue()}</Text>
                    <TouchableOpacity
                        style={tw('ml-2')}
                        onPress={() => navigation.navigate("AddTestError", { textId: info.getValue() })}
                    >
                        <Text style={tw("text-blue-500")}>Gérer le texte</Text>
                    </TouchableOpacity>
                </View>
            ),
            footer: info => info.column.id,
            enableSorting: true,
        }),
        columnHelper.accessor('content', {
            header: () => 'Contenu',
            cell: info => info.getValue(),
            footer: info => info.column.id,
            enableSorting: true,
        }),
        columnHelper.accessor('test_error_type_id', {
            header: () => 'Type de l\'erreur',
            cell: info => {
                const type = errorTypes.find((type) => type.id === info.getValue());
                return type ? type.name : "Inconnu";
            },
            footer: info => info.column.id,
        }),
        columnHelper.display({
            id: 'manage',
            header: () => 'Gérer',
            cell: ({ row }) => (
                <View style={tw('flex-row')}>
                    <TouchableOpacity
                        style={tw('mr-3')}
                        // @ts-ignore
                        onPress={() => navigation.navigate("TestErrorDetails", { errorId: row.original.id })}
                    >
                        <Text style={tw("text-blue-500")}>Modifier</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setErrorIdToDelete(row.original.id);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={tw("text-red-500")}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
            ),
            footer: info => info.column.id,
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    if (loading) {
        return (
            <View style={tw('flex-1 justify-center items-center')}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={tw("flex-1 bg-gray-100")}>
            <ScrollView contentContainerStyle={tw("flex-grow justify-center items-center")} style={tw('w-full')}>
                <CustomHeaderEmpty title="Gestion des erreurs de contrôle" backgroundColor="bg-whiteTransparent" />
                <View style={tw('mx-auto pt-20 items-center')}>
                    <View style={tw('flex-row justify-between w-full mb-4 ml-2')}>
                        <Text style={tw('font-primary')}
                        >Pour créer de nouvelles erreurs de contrôle, passez par la gestion des textes et ajoutez une erreur à un texte.</Text>
                    </View>
                    <View style={tw('mb-2 p-4 rounded-lg bg-white')}>
                        <table>
                            <thead>
                                {table.getHeaderGroups().map(headerGroup => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map(header => (
                                            <th key={header.id} style={{ borderBottom: 'solid 3px ', background: 'aliceblue', color: 'black', fontWeight: 'bold' }}>
                                                <TouchableOpacity onPress={header.column.getToggleSortingHandler()}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: ' 🔼',
                                                        desc: ' 🔽',
                                                        // @ts-ignore
                                                    }[header.column.getIsSorted()] ?? null}
                                                </TouchableOpacity>
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row, index) => (
                                    <tr
                                        key={row.id}
                                        style={Object.assign(
                                            {},
                                            tw('py-1 px-2 flex-row items-center justify-between'),
                                            index % 2 === 0 ? tw('bg-blue-100') : tw('bg-white')
                                        )}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} style={tw('py-1 px-2')}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </View>
                </View>
            </ScrollView>

            <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}>
                <Text style={tw("mb-4 text-center font-primary")}>Êtes-vous sûr de vouloir supprimer cette erreur ?</Text>
                <TouchableOpacity onPress={handleDeleteError} style={tw("bg-red-500 p-4 rounded-lg")}>
                    <Text style={tw("text-center text-white font-bold")}>Confirmer</Text>
                </TouchableOpacity>
            </CustomModal>
        </View>
    );
}
