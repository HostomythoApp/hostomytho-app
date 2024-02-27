import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';
import { ButtonConfig } from 'interfaces/ButtonConfig';
import { TouchableOpacity } from 'react-native';
import { useTailwind } from "tailwind-rn";

const PlausibilityButton = ({ config }: { config: ButtonConfig }) => {
    const tw = useTailwind();

    const Icon = {
        Entypo: Entypo,
        AntDesign: AntDesign,
        Ionicons: Ionicons,
    }[config.iconSet];

    return (
        <TouchableOpacity
            style={tw(`items-center justify-center ml-2 rounded-full w-6 h-6 ${config.backgroundColor}`)}
        >
            {/* @ts-ignore */}
            <Icon name={config.iconName} size={16} color={config.iconColor} />
        </TouchableOpacity>
    );
};


export default PlausibilityButton;

