import React, { useEffect, useState, useRef} from 'react'
import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";
import { gsap } from "gsap";
import { Power4 } from "gsap";

gsap.registerPlugin(ExpoScaleEase, RoughEase, SlowMo);

export default function Main (props) {
  const [capitalNameIsLong, setCapitalNameIsLong] = useState(false);
  const [date, setDate] = useState();
  const secondContainer = useRef();;
  const [inputValue, setInputValue] = useState("Toronto");
  const [weatherInformations, setWeatherInformations] = useState({
    City: "Toronto",
    Description: "",
    Humidity: "23",
    Wind: "5",
    Precipitation: "40",
    Temp: "17°c",
  });

  function submitHandler(event) {
    event.preventDefault();

    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${inputValue}&limit=1&appid=38169036f26ad2923ea928e1797336d0`
    )
    .then((response) => response.json())
    .then((data) => {
      const dataSource = data[0];
      const lat = dataSource["lat"];
      const lon = dataSource["lon"];

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38169036f26ad2923ea928e1797336d0`)
    .then((response) => response.json())
    .then((data) => {
      const weather = data["weather"];
      const weatherString = weather[0];
      const wind = data["wind"];
      const windSpeed = wind["speed"];
      const precipitation = wind["deg"] * 0.1;
      const windValue = windSpeed;
      const main = data["main"];
      const temp = `${Math.floor(main["temp"] - 273)}°c`;
      const humidity = `${main["humidity"]}%`;
      const description = weatherString["main"];
      setWeatherInformations((prev) => ({
        City: inputValue,
        Description: description,
        Humidity: humidity,
        Wind: windValue,
        Precipitation: precipitation,
        Temp: temp,
      }));
    });
  });
    let tl = gsap.timeline();
    tl.from('.gsap' ,{
      delay: 0.5,
      y: '100%',
      ease: Power4.easeOut,
      duration: 1.5,
      stagger: 0.3,
      opacity: 0
    })
    fetch(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAxOdbRgQCfa3b40yDLe41D-Qbo0xmT9fA&cx=8194afe644f6ac21d&q=${inputValue}`)
    .then((response) => response.json())
    .then(data => {
      const items = data['items']
      const firstItem = items[0]
      const pageMap = firstItem['pagemap']
      const imgObj = pageMap['imageobject']
      const obj = imgObj[0]
      const url =  obj['thumbnailurl']
      const ticUrl = `'${url}'`
      const urlName = 'url'
      const ticPicUrl = `(${ticUrl})`
      const picUrl = urlName.concat(ticPicUrl)

      if (inputValue === 'New York') {
        secondContainer.current.style.backgroundImage = 'url("https://upload.wikimedia.org/wikipedia/commons/2/2b/NYC_Downtown_Manhattan_Skyline_seen_from_Paulus_Hook_2019-12-20_IMG_7347_FRD_%28cropped%29.jpg")'
      } 
      else {
        secondContainer.current.style.backgroundImage = picUrl
      }
    })
  }

  function changeHandler(event) {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    if (inputValue.length > 7) {
      setCapitalNameIsLong(true);
    } else {
      setCapitalNameIsLong(false);
    }
  }, [inputValue]);

  useEffect(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date();
    const allDate = date.toLocaleString("en-US", options);
    setDate(allDate);
  }, []);

  const inputClassForShortCapital =
  'placeholder:text-black text-[150px] gsap input font-["Montserrat"] font-[1000] w-[800px] h-[190px] absolute top-[250px] left-[200px] -tracking-wide';
  const inputClassForLongCapital =
  'placeholder:text-black text-[80px] gsap input font-["Montserrat"] font-[1000] w-[800px] h-[190px] absolute top-[300px] left-[200px] -tracking-wide';


  return (
    <div className="flex h-[100vh] w-full ">
      <div className="grow flex items-center justify-center">
        <form onSubmit={submitHandler}>
          <input value={inputValue}  onChange={changeHandler} className={capitalNameIsLong ? inputClassForLongCapital : inputClassForShortCapital}/>
          <h2 className='text-[80px] gsap font-["Archivo"] absolute left-[200px] top-[420px]'>
            {weatherInformations["Temp"]}
          </h2>
          <p className='text-[15px] gsap text-[#464646] font-["Poppins"]  absolute top-[445px] left-[400px]'>
             Wind: {weatherInformations["Wind"]} km/h
          </p>
          <p className='text-[15px] gsap text-[#464646] font-["Poppins"] absolute top-[465px] left-[400px]'>
            Precipitation: {weatherInformations["Precipitation"]}%
          </p>
          <p className='text-[15px] gsap text-[#464646] font-["Poppins"] absolute top-[485px] left-[400px]'>
             Humidity: {weatherInformations["Humidity"]}
          </p>
        </form>
        <p className='text-[16px] gsap text-[#464646]  font-["Poppins"] absolute bottom-[80px] left-[200px]'>
          Dev by Hoidx
        </p>
        <p className='text-[16px] gsap text-[#4e4a4a] font-["Poppins"] absolute bottom-[80px] left-[620px]'>
          {date}
        </p>
      </div> 
      <div ref={secondContainer} className='h-full w-[800px] bg-cover bg-center bg-no-repeat duration-1000 bg-[url("https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG9yb250b3xlbnwwfHwwfHw%3D&w=1000&q=80")]'></div>
    </div>
  );
}

