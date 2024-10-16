import React, { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView, Button, Switch, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTailwind } from 'tailwind-rn';
import { getAllTexts } from 'services/api/texts';
import { getAllThemes } from 'services/api/themes';
import { Text as TextModel } from 'models/Text';
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


const columnHelper = createColumnHelper<any>();
const columns = [
    columnHelper.accessor('id', {
        header: () => 'Id',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        enableSorting: true,
    }),
    columnHelper.accessor('num', {
        header: () => 'Numéro',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        enableSorting: true,
    }),
    columnHelper.accessor('content', {
        header: () => 'Contenu',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        enableSorting: true,
    }),
    columnHelper.accessor('origin', {
        header: () => 'Origine',
        cell: info => info.getValue(),
        footer: info => info.column.id,
        enableSorting: true,
    }),
    columnHelper.accessor('is_plausibility_test', {
        header: () => 'Test de plausibilité',
        cell: info => info.getValue() ? 'vrai' : 'faux',
        footer: info => info.column.id,
        enableSorting: true,
    }),
    columnHelper.accessor('test_plausibility', {
        header: () => 'Taux de plausibilité',
        cell: info => info.row.original.is_plausibility_test ? info.getValue() : '',
        footer: info => info.column.id,
        enableSorting: true,
    }),
    columnHelper.accessor('is_negation_specification_test', {
        header: () => 'Test de négation',
        cell: info => info.getValue() ? 'vrai' : 'faux',
        footer: info => info.column.id,
        enableSorting: true,
    }),
    columnHelper.accessor('nb_of_treatments', {
        header: () => 'Nombre de fois joué',
        cell: info => info.getValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('is_active', {
        header: () => 'Actif',
        cell: info => info.getValue() ? 'vrai' : 'faux',
        footer: info => info.column.id,
    }),

    columnHelper.display({
        id: 'manage',
        header: () => 'Gérer',
        cell: ({ row }) => {
            const navigation = useNavigation();

            const handlePress = () => {
                // @ts-ignore
                navigation.navigate('TextDetails', { textId: row.original.id });
            };

            return (
                <Button title="Gérer" onPress={handlePress} />
            );
        },
        footer: info => info.column.id,
    }),
];

export default function ManageTextsScreen() {
    const tw = useTailwind();
    const [data, setData] = useState<TextModel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchUsers = async () => {
        try {
            const response = await getAllTexts();
            setData(response);
        } catch (error) {
            console.error('Error fetching texts:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUsers();
        }, [])
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const origins = [
        { id: 1, name: 'synthétique' },
        { id: 2, name: 'réel - vrai' },
        { id: 3, name: 'réel - faux' }
    ];

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
                <CustomHeaderEmpty title="Gestion des textes" backgroundColor="bg-whiteTransparent" />
                <View style={tw('mx-auto pt-20 items-center')}>
                    <Text style={tw('text-lg font-bold mb-2 self-end mx-6')}>
                        Nombre total de textes : {table.getRowModel().rows.length}
                    </Text>
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

                            <tfoot>
                            </tfoot>
                        </table>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}