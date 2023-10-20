const API_KEY = 'AIzaSyCgeoB3uArlV8IyrHveTEg6Ja62on4Bt1Y';
const CALENDAR_ID = 'c_d9aaaa6aa5b776b23b57ec82ab49a0b39b34177b8390aa055f926d10033e3648@group.calendar.google.com';

async function getSchedule() {
    const url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.items;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
}

window.onload = async function() {
    const scheduleDiv = document.getElementById('schedule');
    const events = await getSchedule();

    events.forEach(event => {

        const startWeek = new Date(event.start.dateTime || event.start.date).getWeek();
        const endWeek = new Date(event.end.dateTime || event.end.date).getWeek();


        const currentWeek = new Date().getWeek();
        if (startWeek >= currentWeek && startWeek <= currentWeek + 4) {
            const eventDiv = document.createElement('div');
            eventDiv.innerHTML = `<h2>${event.summary}</h2><p>Start: ${event.start.dateTime || event.start.date} (Vecka ${startWeek})<br>End: ${event.end.dateTime || event.end.date} (Vecka ${endWeek})</p>`;
            scheduleDiv.appendChild(eventDiv);


            const emojis = ['😀', '😎', '👍', '🎉', '🎁', '🎂', '👏', '👌', '💯', '🔥'];
            const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
            eventDiv.querySelector('h2').innerHTML += ` ${randomEmoji}`;


            const colors = ['#ff0000', '#ff6600', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            eventDiv.style.borderColor = randomColor;


            if (event.location) {
                eventDiv.innerHTML += `<p><a href="https://www.google.com/maps/search/${event.location}" target="_blank">Visa plats på Google Maps</a></p>`;
            }
        }
    });}


Date.prototype.getWeek = function() {
    var onejan = new Date(this.getFullYear(), 0, 1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}



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