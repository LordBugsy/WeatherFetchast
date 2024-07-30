import React, { createContext, useState } from "react";

export const WeatherData = createContext();

const DataProvider = ({children}) => {
    const [isInfo, setInformationState] = useState(false);
    const [selectedCity, setCountry] = useState("");
    const [isCitySelected, selectComponentState] = useState(false);

    return (
        <WeatherData.Provider value={{isInfo, setInformationState, selectedCity, setCountry, isCitySelected, selectComponentState}}>
            {children}
        </WeatherData.Provider>
    );
};

export default DataProvider