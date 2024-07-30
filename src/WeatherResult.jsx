import React, { useContext, useEffect, useState } from "react";
import styles from './WeatherResult.module.css'
import { WeatherData } from "./DataProvider";

const WeatherResult = () => {
    const {selectedCity, selectComponentState} = useContext(WeatherData);
    const [errorInfo, setErrorInfo] = useState("");
    const [isErrorDetected, setErrorState] = useState(false);

    /* ======================== */
    const [emojiTemperature, setEmojiTemperature] = useState("☀️");
    const [currentTemperature, setTemperature] = useState(0);
    const [currentHumidity, setHumidity] = useState(0);
    const [currentSky, setSky] = useState("Sunny")
    /* ======================== */

    async function fetchData() {
        const apiKey = ""; //enter your API key here.
        let errorMessage = "";

        try {
            const apiResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&APPID=${apiKey}`);
            if (!apiResponse.ok) {
                setErrorState(true);
                
                if (apiKey === "") errorMessage = `You didn't enter an API key. If you need help on how to get one, click on the information icon "ⓘ" in the home menu.`;
                else errorMessage = `An error occured while trying to fetch data for '${selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}'. Make sure you entered the correct API key or select a different city/country.`;

                throw new Error(errorMessage);
            }

            const data = await apiResponse.json();
            
            setEmojiTemperature(setWeatherEmoji(data.weather[0].id));
            setTemperature((data.main.temp - 273.15).toFixed(2));
            setHumidity(data.main.humidity)
            setSky(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1));
        }

        catch(error) {
            setErrorInfo(errorMessage);
        }
    }

    const setWeatherEmoji = id => {
        //the "id" corresponds to the id OpenWeather set for different weather conditions (https://openweathermap.org/weather-conditions)
        switch (true) {
            case (id >= 200 && id < 300):
                return '🌩️';

            case (id >= 300 && id < 400):
                return '🌧️';

            case (id >= 500 && id < 600):
                return '🌧️';

            case (id >= 600 && id < 700):
                return '🌨️';

            case (id >= 700 && id < 800):
                return '🌁';

            case (id == 800):
                return '☀️';

            case (id > 800 && id < 810): 
                return '☁️';

            default:
                return '❓';
        }
    }

    const closeWeatherData = () => {
        const container = document.getElementById("container");
        container.classList.remove(styles.fadeIn);
        container.classList.add(styles.fadeOut);

        setTimeout(() => selectComponentState(false), 600);
    }

    //in order to use the API when the Component is loaded (mounted), we must use the useEffect hook and call the function that fetches the API
    useEffect(() => fetchData, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const container = document.getElementById("container");
            //if the container was found AND the "mousedown" event is on the container, close the weather data.
            if (container && event.target === container) closeWeatherData();
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div id="container" className={`${styles.weatherResultContainer} ${styles.fadeIn}`}>

                {isErrorDetected ?
                    <div className={styles.errorResult}>
                        <i onClick={closeWeatherData} className={`ri-close-line ${styles.close}`}></i>
                        <h1 className={`${styles.header} ${styles.errorDetected}`}>ERROR</h1>
                        <p className={styles.description}>{errorInfo}</p>
                    </div>

                        :

                    <div className={styles.weatherResult}>
                        <i onClick={closeWeatherData} className={`ri-close-line ${styles.close}`}></i>
                        <div className={styles.relative}>
                            <h1 className={styles.header}>{selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}</h1>
                            <span className={styles.emoji}>{emojiTemperature}</span>
                            <p className={styles.temperature}>{currentTemperature}°c</p>
                        </div>
                        
                        <div className={styles.row}>
                            <div>
                                <h1 className={styles.humidity}>Humidity</h1>
                                <p className={styles.description}>{currentHumidity}%</p>
                            </div>

                            <hr />

                            <div>
                                <h1 className={styles.sky}>Sky</h1>
                                <p className={styles.description}>{currentSky}</p>
                            </div>
                        </div>
                    </div>
                }

                {!isErrorDetected && 
                
                    <div className={`${styles.responsiveWeatherResult} ${styles.hidden}`}>
                        <i onClick={closeWeatherData} className={`ri-close-line ${styles.close}`}></i>
                            <h1 className={styles.header}>{selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)}</h1>
                            <span className={styles.emoji}>{emojiTemperature}</span>
                            <p className={styles.temperature}>{currentTemperature}°c</p>
                        
                        <div className={styles.row}>
                            <div>
                                <h1 className={styles.humidity}>Humidity</h1>
                                <p className={styles.description}>{currentHumidity}%</p>
                            </div>

                            <hr />

                            <div>
                                <h1 className={styles.sky}>Sky</h1>
                                <p className={styles.description}>{currentSky}</p>
                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}

export default WeatherResult