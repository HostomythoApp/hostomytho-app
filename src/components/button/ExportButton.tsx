import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useTailwind } from 'tailwind-rn';

interface ExportButtonProps {
  chartRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const ExportButton: React.FC<ExportButtonProps> = ({ chartRef, fileName }) => {
  const tw = useTailwind();

  const handleExportSVG = (chartRef: React.RefObject<HTMLDivElement>, fileName: string) => {
    const svg = chartRef.current?.querySelector('svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `${fileName}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <View style={tw('max-w-40 self-end mx-4 my-2')}>
      <TouchableOpacity
        style={tw('flex-row items-center justify-center px-4 w-full bg-blue-400 py-2 rounded-md')}
        onPress={() => handleExportSVG(chartRef, fileName)}
      >
        <Entypo name="download" size={24} color="white" style={tw('mr-2')} />
        <Text style={tw('text-white font-semibold')}>Exporter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ExportButton;
