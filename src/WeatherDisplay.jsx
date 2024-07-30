import { useContext, useEffect, useState } from 'react'
import styles from './WeatherDisplay.module.css'
import { WeatherData } from './DataProvider';
import Loading from './Loading';

const WeatherDisplay = () => {
    const [inputValue, setValue] = useState("");
    const [isButtonDisabled, setButtonState] = useState(true);
    const [isLoading, setLoading] = useState(false);

    const {setInformationState, setCountry, selectComponentState} = useContext(WeatherData);

    const checkButtonState = isButtonDisabled;

    const setInputValue = (event) => {
        //if we were to use "inputValue" instead of creating a new variable, we wouldn't be able to properly tell the length since 'inputValue' is an asynchronous variable.
        const value = event.target.value;
        setValue(value);
        value.trim().length > 0 ? setButtonState(false) : setButtonState(true);
    }

    const loadWeather = () => {
        setCountry(inputValue);
        setLoading(!isLoading);

        setTimeout(() => {
            setLoading(false); 
            selectComponentState(true);
        }, Math.floor(Math.random() * 1400) +300); //I've made it so the loading animation lasts between 300ms - 1.7s, just to add more "realism". You can remove it if you want but I won't guarantee the web app will look any better..
    }

    useEffect(() => {
        const handleKeyEnter = (event) => {
            if (event.key === "Enter" && !checkButtonState) loadWeather();
        }

        document.addEventListener("keypress", handleKeyEnter);
        return () => document.removeEventListener("keypress", handleKeyEnter);
        //here, we are listening for 'inputValue' changes because it is important to still have our keypress event listener incase the user wants to pick a different city/country
    }, [inputValue])

    return (
        <div className={styles.weatherDisplayContainer}>
            <div className={styles.weatherDisplay}>
                <h1 className={styles.headerDisplay}>Weather Fetchcast <i onClick={() => setInformationState(true)} className={`ri-information-line ${styles.icon}`}></i></h1>
                <div className={styles.rowStyle}>
                    <div className={styles.searchBar}>
                        <i className={`ri-search-line ${styles.icon}`}></i>
                        <input readOnly={isLoading} className={styles.input} type='text' value={inputValue} onChange={() => setInputValue(event)} />
                    </div>
                    <button onClick={loadWeather} id='button' disabled={isButtonDisabled} className={`${styles.button} ${isButtonDisabled ? styles.disabled : styles.search}`}>
                        {!isLoading ? <i className="ri-send-plane-fill"></i> : <Loading />}
                    </button>
                </div>
                <h1 className={styles.backgroundEmoji}><i className="ri-sun-cloudy-fill"></i></h1>
            </div>

            <div className='copyright'>
                <p>Copyright © {new Date().getFullYear()} LordBugsy. All Rights Reserved.</p>
            </div>

        </div>
    )
}

export default WeatherDisplay