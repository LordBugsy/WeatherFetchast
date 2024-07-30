import WeatherDisplay from "./WeatherDisplay"
import Information from "./Informations"
import React, { useContext } from "react"
import DataProvider, { WeatherData } from "./DataProvider"
import WeatherResult from "./WeatherResult"

function App() {
  return (
    <>
      <DataProvider>
        <MainApp />
      </DataProvider>
    </>
  )
}

function MainApp() {
  const { isInfo, isCitySelected } = useContext(WeatherData);

  return (
    <>
      <WeatherDisplay />
      {isInfo && <Information />}
      {isCitySelected && <WeatherResult />}
    </>
  )
}


export default App
