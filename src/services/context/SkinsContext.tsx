import React, { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { Skin } from "models/Skin";
import { getEquippedUserSkins } from "services/api/skins";

type SkinsContextType = {
  equippedSkins: Skin[];
  setEquippedSkins: React.Dispatch<React.SetStateAction<Skin[]>>;
};

const SkinsContext = React.createContext<SkinsContextType>({
  equippedSkins: [],
  setEquippedSkins: () => { },
});

export const SkinsProvider = ({ children }: { children: any }) => {
  const { user } = useUser();
  const [equippedSkins, setEquippedSkins] = useState<Skin[]>([]);

  useEffect(() => {
    const fetchEquippedSkins = async () => {
      if (user?.id) {
        const skins = await getEquippedUserSkins(user.id);
        setEquippedSkins(skins);
      }
    };
    fetchEquippedSkins();
  }, [user]);

  return (
    <SkinsContext.Provider value={{ equippedSkins, setEquippedSkins }}>
      {children}
    </SkinsContext.Provider>
  );
};

export const useSkins = () => {
  return useContext(SkinsContext);
};
