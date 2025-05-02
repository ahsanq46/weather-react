import './App.css'
import { useState } from 'react';

function App() {
    let [city, setCity] = useState('');
    let [wDetails, setWDetails] = useState(null);

    let getData = (e) => {
        e.preventDefault(); // Prevent page reload

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dd2eba8680a98482f6f32e5239bb1cdd&units=metric`)
            .then((res) => res.json())
            .then((finalRes) => {
                if (finalRes.cod === "404") {
                    setWDetails(null); // If city not found
                } else {
                    setWDetails(finalRes);
                }
            })
            .catch((error) => {
                console.error("Error fetching weather data:", error);
            });

        setCity('');
    };

    return (
        <div className="w-[100%] h-[100vh] bg-[#4aacb1] flex flex-col items-center justify-center">
            <h1 className="text-[40px] font-bold text-white">Simple Weather App</h1>

            <form onSubmit={getData} className="mt-4">
                <input 
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                    className="w-[300px] h-[40px] p-2 rounded-md shadow-md"
                />
                <button type="submit" className="bg-white text-black px-4 py-2 ml-2 rounded-md">Search</button>
            </form>

            <div className="w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] text-center rounded-lg">
                {wDetails ? (
                    <>
                        <h3 className="font-bold text-[30px]">{wDetails.name}</h3>
                        <h2 className="font-bold text-[40px]">{wDetails.main?.temp}°C</h2>
                        <img src={`http://openweathermap.org/img/w/${wDetails.weather?.[0]?.icon}.png`} alt="Weather Icon" />
                        <p>{wDetails.weather?.[0]?.main}</p>
                    </>
                ) : (
                    <h3 className="font-bold text-[30px]">No Data</h3>
                )}
            </div>
        </div>
    );
}

export default App;
