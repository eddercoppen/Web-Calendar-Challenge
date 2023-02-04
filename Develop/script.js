// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  let saveButtonEl = document.querySelectorAll(".saveBtn")
  saveButtonEl.forEach(function (i) {
    i.addEventListener("click", clickHandler)
  })
  class Event {
    constructor(hour, text) {
      this.hour = hour
      this.text = text
    }
  }

  function getUserCalendary() {
    let userSchedule = localStorage.getItem("user_schedule")
    if (userSchedule) {
      userSchedule = JSON.parse(userSchedule)
    } else {
      userSchedule = []
    }
    return userSchedule
  }



  function clickHandler(e) {
    e.stopPropagation()
    let hourParentEl = e.target.closest(".time-block")
    let hour = hourParentEl.children[1].id
    let toSave = hourParentEl.children[1].value
    saveUserData(hour, toSave)
  }

  function saveUserData(hour, text) {
    let newEvent = new Event(hour, text)
    let userSchedule = getUserCalendary()
    userSchedule.push(newEvent)
    userSchedule = JSON.stringify(userSchedule)
    localStorage.setItem("user_schedule", userSchedule)
  }

  function updateCalendar() {
    let currentDate = new Date()
    let currentHour = currentDate.getHours()

    for (i = 9; i < 18; i++) {
      let hourRow = document.querySelector("#hour-" + i)

      if (i == currentHour) {
        hourRow.className = "row time-block present"
      } else if (i < currentHour) {
        hourRow.className = "row time-block past"
      } else {
        hourRow.className = "row time-block future"
      }
    }
  }

  updateCalendar()

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function currentDay() {
    let currentDate = new Date()
    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()
    let time = `${currentDate.getHours() % 12}:${currentDate.getMinutes()}`
    let dateEl = document.querySelector("#currentDay")
    dateEl.textContent = `${cMonth}/${cDay}/${cYear} @ ${time}`
  }

  currentDay()

    function renderUserCalendary(userSchedule) {
    userSchedule.forEach((i) => {
      const hourEl = document.getElementById(i.hour)
      hourEl.textContent = i.text
    })
  }

  function init() {
    let userSchedule = getUserCalendary()

    renderUserCalendary(userSchedule)
  }
  init()
})
