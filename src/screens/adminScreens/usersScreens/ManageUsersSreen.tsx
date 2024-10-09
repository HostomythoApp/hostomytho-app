import React, { useState } from 'react';
import { View, ScrollView, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { useTailwind } from 'tailwind-rn';
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import CustomHeaderEmpty from 'components/header/CustomHeaderEmpty';
import { getAllUsers } from 'services/api/user';
import { User } from 'models/User';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('username', {
    header: () => 'Pseudo',
    cell: info => info.getValue(),
    footer: info => info.column.id,
    enableSorting: true,
  }),
  columnHelper.accessor('email', {
    header: () => 'Email',
    cell: info => info.getValue(),
    footer: info => info.column.id,
    enableSorting: true,
  }),
  columnHelper.accessor('points', {
    header: () => 'Points',
    cell: info => info.getValue(),
    footer: info => info.column.id,
    enableSorting: true,
  }),
  columnHelper.accessor('monthly_points', {
    header: () => 'Points mensuels',
    cell: info => info.getValue(),
    footer: info => info.column.id,
    enableSorting: true,
  }),
  columnHelper.accessor('trust_index', {
    header: () => 'Trust Index',
    cell: info => info.getValue(),
    footer: info => info.column.id,
    enableSorting: true,
  }),
  columnHelper.accessor('lastPlayedDate', {
    header: () => 'Dernier jour joué',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.display({
    id: 'manage',
    header: () => 'Gérer',
    cell: ({ row }) => {
      const navigation = useNavigation();

      const handlePress = () => {
        // @ts-ignore
        navigation.navigate('UserDetails', { userId: row.original.id });
      };

      return (
        <Button title="Gérer" onPress={handlePress} />
      );
    },
    footer: info => info.column.id,
  }),
];

const ManageUsersScreen = () => {
  const tw = useTailwind();
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setData(response);
    } catch (error) {
      console.error('Error fetching users:', error);
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
        <CustomHeaderEmpty title="Gestion des utilisateurs" backgroundColor="bg-whiteTransparent" />
        <View style={tw('mx-auto pt-20 items-center')}>
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
};

export default ManageUsersScreen;
