import React, { useEffect, useState, useRef} from 'react'
import { ExpoScaleEase, RoughEase, SlowMo } from "gsap/EasePack";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import AnimatedPage from './AnimatedPage';
gsap.registerPlugin(SplitText);
gsap.registerPlugin(ExpoScaleEase, RoughEase, SlowMo);

export default function Main (props) {
    
  const [capitalNameIsLong, setCapitalNameIsLong] = useState(false);
  const [date, setDate] = useState();
  const secondContainer = useRef();;
  const input = useRef()
  const [inputValue, setInputValue] = useState("Toronto");
  const [submitted, setSubmitted] = useState(true)
  const [weatherInformations, setWeatherInformations] = useState({
    City: "Toronto",
    Description: "",
    Humidity: "23",
    Wind: "5",
    Precipitation: "40",
    Temp: "17°c",
  });

  useEffect(() => {
    setTimeout(() => {
      secondContainer.current.style.backgroundImage = 'url("https://images.unsplash.com/photo-1517935706615-2717063c2225?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dG9yb250b3xlbnwwfHwwfHw%3D&w=1000&q=80")'
    }, 1500)
  },[])

  function submitHandler(event) {
    event.preventDefault();
    setSubmitted(false)
    setTimeout(() => {
      setSubmitted(true)
    }, 2000)

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
        setTimeout(() => {
          secondContainer.current.style.backgroundImage = picUrl
        }, 1000)
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

    setTimeout(() => {
      gsap.set(input.current, {
        opacity:1
      })
      gsap.set('.fakeText', {
      y:'100%',
      opacity:0
      })
    }, 1400)

    const inputTextTimeline = gsap.timeline(),
    inputText = new SplitText('.fakeText', { type: "chars" }),
    inputTextChars = inputText.chars;
    inputTextTimeline.from(inputTextChars, {
      ease: 'Power3.easeIn',
      y: '70%',
      opacity: 0,
      stagger: 0.03,
      duration: 1,
    })
    const tempTextTimeline = gsap.timeline(),
    tempText = new SplitText('.temp', { type: "chars" }),
    tempTextChars = tempText.chars;
    tempTextTimeline.from(tempTextChars, {
      ease: 'Power3.easeIn',
      y: '70%',
      opacity: 0,
      stagger: 0,
      duration: 1,
    })

    gsap.from('.wind', {
      ease: 'Power3.easeIn',
      y: '100%',
      opacity: 0,
      duration: 1,
    })

    gsap.from('.precipitation', {
      ease: 'Power3.easeIn',
      y: '100%',
      opacity: 0,
      duration: 1,
    })

    gsap.from('.humidity', {
      ease: 'Power3.easeIn',
      y: '100%',
      opacity: 0,
      duration: 1,
    })

    gsap.from('.date', {
      ease: 'Power3.easeIn',
      y: '100%',
      opacity: 0,
      duration: 1,
    })

    const devByHoidxTextTimeline = gsap.timeline(),
    devByHoidxText = new SplitText('.devByHoidx', { type: "chars" }),
    devByHoidxTextChars = devByHoidxText.chars;
    devByHoidxTextTimeline.from(devByHoidxTextChars, {
      ease: 'Power3.easeIn',
      y: '100%',
      opacity: 0,
      stagger: 0.01,
      duration: 1,
    })

  }, []);

  const inputClassForShortCapital =
  'placeholder:text-black input bg-transparent opacity-0 font-["Montserrat"] font-[1000] absolute tracking-[0px] 2xl:w-[800px] 2xl:h-[190px] 2xl:text-[147px] 2xl:top-[250px] 2xl:left-[200px] xl:text-[100px] xl:left-[10%] xl:top-[28%] xl:w-[550px] xl:h-[10vh] lg:text-[110px] lg:left-[27%] lg:w-[700px] lg:top-[10%] md:left-[24%] sm:text-[90px] sm:w-[460px] sm:left-[19%] sm:top-[15%]';
  const inputClassForLongCapital =
  'placeholder:text-black input bg-transparent font-["Montserrat"] opacity-0 font-[1000] absolute -tracking-wide 2xl:w-[800px] 2xl:h-[190px] 2xl:text-[80px] 2xl:top-[300px] 2xl:left-[200px] xl:left-[10%] xl:top-[28%] xl:text-[80px] xl:w-[540px] md:left-[24.5%] sm:text-[70px] sm:left-[20%] sm:top-[17%] sm:w-[450px]';
  const inputClassForShortCapital2 =
  'text-black fakeText font-["Montserrat"] bg-transparent overflow-hidden font-[1000] absolute tracking-[-3px] 2xl:text-[149px] 2xl:w-[800px] 2xl:h-[190px] 2xl:top-[233px] 2xl:left-[197px] xl:text-[100px] xl:left-[10%] xl:h-[12vh] xl:top-[25%] xl:tracking-[-2px] xl:w-[550px] lg:text-[110px] lg:left-[27%] lg:w-[700px] lg:top-[10%] md:left-[24%] sm:text-[90px] sm:w-[460px] sm:left-[19%] sm:top-[15%]';


  return (
    <div className="h-[100vh] w-full overflow-hidden xl:flex">
      <div className="flex items-center justify-center 2xl:w-[60%] 2xl:h-[100vh] xl:h-[100vh] xl:w-[55%] sm:w-full sm:h-[60vh]">
        <form onSubmit={submitHandler}>
          <input value={inputValue} ref={input} onChange={changeHandler} className={capitalNameIsLong ? inputClassForLongCapital : inputClassForShortCapital}/>
          <h1 className={capitalNameIsLong ? inputClassForLongCapital : inputClassForShortCapital2}>{inputValue}</h1>
          <h2 className='temp overflow-hidden font-["Archivo"] absolute tracking-tight 2xl:text-[80px] 2xl:left-[200px] 2xl:top-[420px] xl:left-[10%] xl:text-[70px] xl:top-[39%] lg:text-[80px] lg:left-[27%] lg:top-[24%] md:left-[24.3%] sm:text-[70px] sm:left-[20%] sm:top-[26%]'>
            {weatherInformations["Temp"]}
          </h2>
          <p className='wind text-[#464646] font-["Poppins"] overflow-hidden absolute 2xl:top-[445px] 2xl:left-[400px] 2xl:text-[15px] xl:left-[25%] xl:top-[41%] lg:left-[47%] lg:top-[26.5%] md:left-[48%] lg:text-[14px] sm:text-[13px] sm:left-[50%] sm:top-[28.3%]'>
             Wind: {weatherInformations["Wind"]} km/h
          </p>
          <p className='text-[15px] precipitation text-[#464646] overflow-hidden font-["Poppins"] absolute 2xl:top-[465px] 2xl:left-[400px] 2xl:text-[15px] xl:left-[25%] xl:top-[43%] lg:left-[47%] lg:top-[29%] md:left-[48%] lg:text-[14px] sm:text-[13px] sm:left-[50%] sm:top-[30.3%]'>
            Precipitation: {weatherInformations["Precipitation"]}%
          </p>
          <p className='text-[15px] text-[#464646] font-["Poppins"] humidity overflow-hidden h-[2vh] absolute 2xl:top-[485px] 2xl:left-[400px] 2xl:text-[15px] xl:left-[25%] xl:top-[45%] lg:left-[47%] lg:top-[31.5%] lg:text-[14px] md:left-[48%] sm:text-[13px] sm:left-[50%] sm:top-[32.3%]'>
             Humidity: {weatherInformations["Humidity"]}
          </p>
        </form>
        <p className='overflow-hidden devByHoidx text-[#464646] font-["Poppins"] absolute 2xl:bottom-[80px] 2xl:left-[200px] 2xl:text-[16px] xl:left-[10.5%] xl:bottom-[10%] lg:text-[15px] lg:left-[27.5%] lg:bottom-[43%] md:left-[26%] sm:text-[14px] sm:bottom-[50%] sm:left-[22.5%]'>
          Dev by Hoidx
        </p>
        <p className='text-[16px] date text-[#4e4a4a] overflow-hidden font-["Poppins"] absolute 2xl:bottom-[80px] 2xl:left-[620px] 2xl:text-[16px] xl:left-[30%] xl:bottom-[10%] lg:text-[15px] lg:left-[57%] lg:bottom-[43%] md:left-[55%] sm:text-[14px] sm:bottom-[50%] sm:left-[57%]'>
          {date}
        </p>
      </div> 
      <div ref={secondContainer} className={`bg-cover bg-center bg-no-repeat bg-white 2xl:w-[800px] 2xl:h-full xl:h-full xl:w-[45%] md:w-full sm:h-[40vh] sm:w-[800px]`}></div>
      <AnimatedPage click={submitted}/>
    </div>
  );
}
