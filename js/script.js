async function Bussar() {
    let ResponseData = await fetch("https://api.sl.se/api2/realtimedeparturesV4.json?key=e7f50c116e0f4a448f8ae6a0fbad0a7c&siteid=7000&timewindow=10");
    let data = await ResponseData.json();
  
    console.log(data);
  
    data.ResponseData.Buses.forEach((bus, index) => {
      let infoHolder = document.createElement("div");
      infoHolder.id = `bus-info-${index}`;
  

      infoHolder.style.display = "flex";
      infoHolder.style.margin = "1%";
      infoHolder.style.width = "90%";
      infoHolder.style.height = "5vh";
      infoHolder.style.color = "wheat";
      infoHolder.style.border = "solid 1.3px";
      infoHolder.style.borderRadius = "15px";
      infoHolder.style.gap = "10px";
  
      let lineNumber = document.createElement("p");
      let destination = document.createElement("p");
      let displayTime = document.createElement("p");
      let stopPointDesignation = document.createElement("p");
  
      lineNumber.textContent = bus.LineNumber;
      destination.textContent = bus.Destination;
      displayTime.textContent = bus.DisplayTime;
      stopPointDesignation.textContent = `Läge ${bus.StopPointDesignation}`;
  
      infoHolder.appendChild(lineNumber);
      infoHolder.appendChild(destination);
      infoHolder.appendChild(displayTime);
      infoHolder.appendChild(stopPointDesignation);
  
      document.getElementById("sl-info").appendChild(infoHolder);
    });
  }
  
  Bussar();


  async function Väder(){
    let ResponseData = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=Huddinge&appid=44a55c9774f72959d2895bcddc188f36&units=metric");
  
    let data = await ResponseData.json();
  
    console.log(data);
  
    for(let i = 0; i<8; i++) {
      let infoHolder = document.createElement("div");
      let day = document.createElement("h1");
      let temp = document.createElement("p");
      let temp_max = document.createElement("p");
      let temp_min = document.createElement("p");
  

      let date = new Date();
      date.setDate(date.getDate() + i);
  

      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  

      let dayName = days[date.getDay()];
  
      day.textContent = `${dayName}, ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
      temp.textContent = `${Math.floor(data.list[i].main.temp)}°C`;
      temp_max.textContent = `Max: ${Math.floor(data.list[i].main.temp_max)}°C`;
      temp_min.textContent = `Min: ${Math.floor(data.list[i].main.temp_min)}°C`;
  
      Väderinformation.appendChild(infoHolder);
      infoHolder.appendChild(day);
      infoHolder.appendChild(temp);
      infoHolder.appendChild(temp_max);
      infoHolder.appendChild(temp_min);
    }
  }
  
  Väder();
  

  function updateClock() {
    let now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
  

    document.getElementById('clock').textContent = hours + ":" + minutes + ":" + seconds;
  }
  

  let clockElement = document.createElement("div");
  clockElement.id = "clock";
  document.body.appendChild(clockElement);
  
  setInterval(updateClock, 1000);
  
  updateClock();


  async function BokRecensioner(){
    let ResponseData = await fetch("https://api.nytimes.com/svc/books/v3/reviews.json?author=Stephen+King&api-key=wYYNG0pWkxlg3hxsDqiXXlYdBGOyScpn");
  
    let data = await ResponseData.json();
  
    console.log(data);
  
    for(let i = 0; i < Math.min(10, data.results.length); i++) {
      let infoHolder = document.createElement("div");
      let bookTitle = document.createElement("h1");
  
      bookTitle.textContent = data.results[i].book_title;
  
      Bokinformation.appendChild(infoHolder);
      infoHolder.appendChild(bookTitle);
    }
  }
  BokRecensioner();