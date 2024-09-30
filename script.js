
const dayError = document.querySelector('.day-error');
const monthError = document.querySelector('.month-error');
const yearError = document.querySelector('.year-error');
const dateError = document.querySelector('.date-error');

const dayResult = document.querySelector('.day-result');
const monthResult = document.querySelector('.month-result');
const yearResult = document.querySelector('.year-result');

const arrowButton = document.querySelector('.arrow-button');

const dayInput = document.getElementById('day');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');

const inputRequiredError = "This field is required";
const dayInputError = "Must be a valid day";
const monthInputError = "Must be a valid month";
const yearInputError = "Must be in the past";
const invalidDateError = "Must be a valid date";


function setErrorStyle(selector) {
    const container = document.querySelector(selector);

    console.log("hehehehe");
    container.querySelector("label").style.color = "hsl(0, 100%, 67%)";
    container.querySelector("input").style.borderColor = "hsl(0, 100%, 67%)";
}


function resetErrorStyle(selector) {
    const container = document.querySelector(selector);

    container.querySelector("label").style.color = "hsl(0, 1%, 44%)";
    container.querySelector("input").style.borderColor = "hsl(0, 0%, 86%)";
}


function checkLeapYear(year) {
    if ((!(year % 4) && year % 100) || !(year % 400)) {
        return true;
    }
    else {
        return false;
    }
}


function checkValidDate(day, month, year) {
    let listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let result = false;

    if (day <= listOfDays[month - 1])
        result = true;

    if (month == 2 && day == 29)
        result = checkLeapYear(year);

    if (result) {
        dateError.innerHTML = "";
        resetErrorStyle("#day-input-item");
        resetErrorStyle("#month-input-item");
        resetErrorStyle("#year-input-item");
    }
    else {
        dateError.innerHTML = invalidDateError;
        setErrorStyle("#day-input-item");
        setErrorStyle("#month-input-item");
        setErrorStyle("#year-input-item");
    }

    return result;
}


function checkDayInput(dayNumString) {
    if (dayNumString == '') {
        dayError.innerHTML = inputRequiredError;
        setErrorStyle("#day-input-item");
        return false;
    }

    let dayNum = Number(dayNumString);

    if (isNaN(dayNum) || !Number.isInteger(dayNum) || dayNum < 1 || dayNum > 31) {
        dayError.innerHTML = dayInputError;
        setErrorStyle("#day-input-item");
        return false;
    }
    else {
        dayError.innerHTML = '';
        resetErrorStyle("#day-input-item");
        return true;
    }
}


function checkMonthInput(monthNumString) {
    if (monthNumString == '') {
        monthError.innerHTML = inputRequiredError;
        setErrorStyle("#month-input-item");
        return false;
    }

    let monthNum = Number(monthNumString);

    if (isNaN(monthNum) || !Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12) {
        monthError.innerHTML = monthInputError;
        setErrorStyle("#month-input-item");
        return false;
    }
    else {
        monthError.innerHTML = '';
        resetErrorStyle("#month-input-item");
        return true;
    }
}


function checkYearInput(yearNumString) {
    let currentYear = new Date().getFullYear();

    if (yearNumString == '') {
        yearError.innerHTML = inputRequiredError;
        setErrorStyle("#year-input-item");
        return false;
    }

    let yearNum = Number(yearNumString);

    if (isNaN(yearNum) || !Number.isInteger(yearNum) || yearNum > currentYear) {
        yearError.innerHTML = yearInputError;
        setErrorStyle("#year-input-item");
        return false;
    }
    else {
        yearError.innerHTML = '';
        resetErrorStyle("#year-input-item");
        return true;
    }
}


function calculateAge(birthday) {
    let birthDate = new Date(birthday);
    let today = new Date();

    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    if (ageMonths < 0 || (ageMonths == 0 && ageDays < 0)) {
        ageYears--;
        if (ageYears < 0) {
            dateError.innerHTML = invalidDateError;
            return;
        }

        if (ageMonths == 0) {
            ageMonths = 11;
            ageDays = 30 + ageDays;
        }
        else {
            ageMonths = 12 + ageMonths;
            if (ageDays < 0)
                ageDays = 30 + ageDays;
            else
                ageDays = 31 - ageDays;
        }
    }

    return [ageDays, ageMonths, ageYears];
}


function setCorrectPlural(day, month, year) {
    const dayPlural = document.querySelector("#day-plural");
    const monthPlural = document.querySelector("#month-plural");
    const yearPlural = document.querySelector("#year-plural");

    if (day > 1 || day == 0)
        dayPlural.style.visibility = "visible";
    else
        dayPlural.style.visibility = "hidden";

    if (month > 1 || month == 0)
        monthPlural.style.visibility = "visible";
    else
        monthPlural.style.visibility = "hidden";

    if (year > 1 || year == 0)
        yearPlural.style.visibility = "visible";
    else
        yearPlural.style.visibility = "hidden";
}


function clearResult() {
    dayResult.innerHTML = "- -";
    monthResult.innerHTML = "- -";
    yearResult.innerHTML = "- -";
}


function displayResult() {
    clearResult();

    const dayNumString = dayInput.value;
    const monthNumString = monthInput.value;
    const yearNumString = yearInput.value;

    const isCorrectDay = checkDayInput(dayNumString);
    const isCorrectMonth = checkMonthInput(monthNumString);
    const isCorrectYear = checkYearInput(yearNumString);

    if (isCorrectDay && isCorrectMonth && isCorrectYear) {
        let dayNum = Number(dayNumString);
        let monthNum = Number(monthNumString);
        let yearNum = Number(yearNumString);

        if (checkValidDate(dayNum, monthNum, yearNum)) {
            let birthday = `${monthNum}/${dayNum}/${yearNum}`
            let [ageDay, ageMonth, ageYear] = calculateAge(birthday);

            setCorrectPlural(ageDay, ageMonth, ageYear);

            yearResult.innerHTML = ageYear;
            monthResult.innerHTML = ageMonth;
            dayResult.innerHTML = ageDay;
        }
    }
}

arrowButton.addEventListener('click', displayResult);
