import { useContext, useEffect } from 'react';
import styles from './Information.module.css'
import { WeatherData } from './DataProvider';

const Information = () => {
    const {setInformationState} = useContext(WeatherData);

    const closeInformation = () => {
        const container = document.getElementById("container");
        container.classList.remove(styles.fadeIn);
        container.classList.add(styles.fadeOut);

        setTimeout(() => setInformationState(false), 600);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const container = document.getElementById('container');
            //if the container was found AND the "mousedown" event is on the container, close the informations.
            if (container && event.target === container) closeInformation();
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [])

    return (
        <div id='container' className={`${styles.informationContainer} ${styles.fadeIn}`}>
            <div className={styles.informations}>
                <i onClick={closeInformation} className={`ri-close-line ${styles.close}`}></i>
                <h1 className={styles.header}>Informations</h1>
                <div className={styles.description}>
                    <p>
                        Thank you for using my <span className={styles.name}>Weather Fetchcast</span> Web App! <br /> <br />
                        In order to use it properly, make sure to create an account on <a target='_blank' className={`${styles.name} ${styles.interactive}`} href='https://openweathermap.org/api'>OpenWeatherMap</a>'s website!
                        You will then receive an email telling you what your API key is and how to use it! <br />
                        Anyway, have a good day and happy coding! :) <br />
                        - LordBugsy
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Information