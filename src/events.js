var ReactDom = require('react-dom');
var React = require('react');
var reqwest = require('reqwest');

var API_URL = 'https://notman.herokuapp.com';

function getJSON(path, callback) {
  return reqwest({
    url: API_URL + path,
    method: 'get',
    type: 'json'
  });
}

window.init = function init() {
  fetchAndRender();
  updateTime();
  setInterval(updateTime, 20000);
  setInterval(fetchAndRender, 15 * 60000);
  setTimeout(() => window.location.reload(), 120 * 60000)
}

function fetchAndRender() {
  getJSON('/api/events').then(function(events) {
    render(events);
  });
}

function render(events) {
  var el = document.getElementById('events-container');
  ReactDom.render(<Dashboard eventsGroupedByDay={events}/>, el);
}

function updateTimeElement(timeString) {
  document.getElementById('current-time').innerHTML = timeString;
}

function updateTime() {
  getJSON('/api/time').then(function(response) {
    updateTimeElement(response.time);
  });
}

function hueFromHash(str) {
  var hash = 5381;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash << 5) + hash) + char;
  }
  var hue = Math.abs(hash) % 359;
  return 'hsl(' + hue + ', 40%, 60%)';
}

var Tag = ({text, color}) => {
  let styles = { backgroundColor: color };
  return <span className="badge tag" style={styles}>{text}</span>;
};

var EventTitle = ({title}) => <div className="event-title">{title}</div>;

var EventDetails = ({start, end, duration, tags}) => {

  var tagElements = tags.map((t) => <Tag text={t} color={hueFromHash(t)}/>);

  return <div className="event-details">
    <span className="time">{start}</span>
    <span className="duration badge">{duration}</span>
    <span className="time">{end}</span>
    <span className="tags">
      {tagElements}
    </span>
  </div>;
};

var Dashboard = ({eventsGroupedByDay}) => {
  var daySections = eventsGroupedByDay.map(d => <DaySection day={d}/>);
  return <div className="dashboard">
    {daySections}
  </div>;
};

var DaySection = ({day}) => {
  var events = day.items.map(event => <Event event={event}/>);
  return <div key={day.date} className="day-section">
    <div className="day-label">{day.day}</div>
    <div className="day-events">
      {events}
    </div>
  </div>;
};

var Event = ({event}) => {
  var {title, start, end, duration, tags} = event;
  return <div key={title} className="event">
    <EventTitle title={title}/>
    <EventDetails start={start} end={end} duration={duration} tags={tags}/>
  </div>;
};
