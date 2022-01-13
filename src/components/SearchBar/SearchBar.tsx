import React ,{FC, useState} from 'react';
import Country from '../Country/Country';

interface country {
    capital:string;
    population:string ;
    flags:{
        png:string
    } ;
    name:{
        official:string
    } ;
    latlng:number[]

  

    
}

interface weatherResponse  {
    current:{
        precip:number;
        temperature:number;
        weather_icons:string[];
        wind_speed:number
    }

}




const SearchBar : FC = () => {
    const [country , setCountry] = useState<string>('');
    const [info, setInfo] = useState<country[]>([]);
    const [weather , setWeather] = useState<weatherResponse>()
    const fetchData = () => {
        console.log(country)
        fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(res => res.json())
        .then(data => {
            console.log(data, 'data inside ')
            setInfo(data)
            console.log(info,'info inside')
            
            
        })


    }

    const fetchWeatherData = (country: string) =>  {
        fetch(`http://api.weatherstack.com/current?access_key=f2475ac6db433e8c8a282083b81fef6d&query=${country}`)
        .then(res=> res.json())
        .then(data => {
            console.log(data);
            setWeather(data);
            console.log(weather)
        })

    }


  
    return (
        <div className='text-center'>
            <h1 className='font-bold text-2xl '> Search country </h1>
            <div className=''>
               <input className='px-5 rounded-2xl border-2 w-1/2' onChange={(e)=> setCountry(e.target.value)}></input>
               <button onClick={fetchData} className='bg-blue-500 px-3 py-1 rounded-2xl '>Search</button>

            </div>

            <div className='text-center'>
                {
                    info.map(ele => <div>
                        <p>Capital:{ele.capital} </p>
                        <p>Population{ele.population} </p>
                        <p> Longitude : {ele?.latlng[0]} Latitude : {ele.latlng[1]}</p>
                        <div className='flex justify-center items-center'>
                           <img src={ele?.flags?.png}></img>
                        </div>
                      
                    </div>)
                }
            </div>
            <button onClick={()=> fetchWeatherData(info[0].name.official)}>Weather</button>
            <div>
                <ul>
                    <li>{weather?.current.precip}</li>
                    <li>{weather?.current.temperature}</li>
                    <li>{weather?.current.wind_speed}</li>
                    <img src={weather?.current.weather_icons[0]}></img>
                </ul>
                
                
            </div>
           

            
        </div>
    );
};

export default SearchBar;