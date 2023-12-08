const BackendApi = "http://localhost:4000/v1";

// Change Class

const _changeClasses = (action, element, className) => {
  if (element) {
    if (action == "add") {
      element.classList.add(...className);
    } else if (action == "remove") {
      element.classList.remove(...className);
    } else if (action == "toggle") {
      element.classList.toggle(...className);
    } else {
      console.log("somthing wrong");
    }
  }
};

// Timer

const createTimer = (dayElem, hourElem, minElem, secElem, time = "2:10:20:30", haveZero = false) => {
  time = time.split(":");
  [dayElem.innerHTML, hourElem.innerHTML, minElem.innerHTML, secElem.innerHTML] = time;
  let interVal = setInterval(() => {
    time[3] = time[3] - 1;
    if (time[3] < 0) {
      time[3] = 60;
      time[2] = time[2] - 1;
      if (time[2] < 0) {
        time[2] = 59;
        time[1] = time[1] - 1;
        if (time[1] < 0) {
          time[1] = 23;
          time[0] = time[0] - 1;
          if (time[0] < 1) {
            clearInterval(interVal);
            [time[0], time[1], time[2], time[3]] = [0, 0, 0, 0];
          }
        }
      }
    }
    if (haveZero == true) {
      time[0] = time[0].toString().length == 1 ? `0${time[0]}` : time[0];
      time[1] = time[1].toString().length == 1 ? `0${time[1]}` : time[1];
      time[2] = time[2].toString().length == 1 ? `0${time[2]}` : time[2];
      time[3] = time[3].toString().length == 1 ? `0${time[3]}` : time[3];
    }

    [dayElem.innerHTML, hourElem.innerHTML, minElem.innerHTML, secElem.innerHTML] = time;
  }, 1000);
};

// Get Courses

const getCourses = async () => {
  const res = await fetch(`${BackendApi}/courses`);
  const courses = await res.json();

  return courses;
};

// Get Time

const getTime = () => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

  // Divide Time with a year
  const d = new Date("2022-10-20T00:11:07.408Z");
  let years = Math.round(d.getTime() / year);

  return years;
};

console.log(getTime());

export { _changeClasses, createTimer, getCourses, BackendApi };
