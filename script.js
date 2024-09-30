const inputRequiredError = "This field is required";
const dayInputError = "Must be a valid day";
const monthInputError = "Must be a valid month";
const yearInputError = "Must be in the past";
const invalidDateError = "Must be a valid date";

function setErrorStyle(selector) {
    const container = $(selector);

    container.find("label").css("color", "hsl(0, 100%, 67%)");
    container.find("input").css("border-color", "hsl(0, 100%, 67%)");
}

function resetErrorStyle(selector) {
    const container = $(selector);

    container.find("label").css("color", "hsl(0, 1%, 44%)");
    container.find("input").css("border-color", "hsl(0, 0%, 86%)");
}

function checkLeapYear(year) {
    return (!(year % 4) && year % 100) || !(year % 400);
}

function checkValidDate(day, month, year) {
    let listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let result = false;

    if (day <= listOfDays[month - 1]) {
        result = true;
    }

    if (month == 2 && day == 29) {
        result = checkLeapYear(year);
    }

    if (result) {
        $(".date-error").html("");
        resetErrorStyle("#day-input-item");
        resetErrorStyle("#month-input-item");
        resetErrorStyle("#year-input-item");
    } else {
        $(".date-error").html(invalidDateError);
        setErrorStyle("#day-input-item");
        setErrorStyle("#month-input-item");
        setErrorStyle("#year-input-item");
    }

    return result;
}

function checkDayInput(dayNumString) {
    if (dayNumString == '') {
        $(".day-error").html(inputRequiredError);
        setErrorStyle("#day-input-item");
        return false;
    }

    let dayNum = Number(dayNumString);

    if (isNaN(dayNum) || !Number.isInteger(dayNum) || dayNum < 1 || dayNum > 31) {
        $(".day-error").html(dayInputError);
        setErrorStyle("#day-input-item");
        return false;
    } else {
        $(".day-error").html('');
        resetErrorStyle("#day-input-item");
        return true;
    }
}

function checkMonthInput(monthNumString) {
    if (monthNumString == '') {
        $(".month-error").html(inputRequiredError);
        setErrorStyle("#month-input-item");
        return false;
    }

    let monthNum = Number(monthNumString);

    if (isNaN(monthNum) || !Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12) {
        $(".month-error").html(monthInputError);
        setErrorStyle("#month-input-item");
        return false;
    } else {
        $(".month-error").html('');
        resetErrorStyle("#month-input-item");
        return true;
    }
}

function checkYearInput(yearNumString) {
    let currentYear = new Date().getFullYear();

    if (yearNumString == '') {
        $(".year-error").html(inputRequiredError);
        setErrorStyle("#year-input-item");
        return false;
    }

    let yearNum = Number(yearNumString);

    if (isNaN(yearNum) || !Number.isInteger(yearNum) || yearNum > currentYear) {
        $(".year-error").html(yearInputError);
        setErrorStyle("#year-input-item");
        return false;
    } else {
        $(".year-error").html('');
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
            $(".date-error").html(invalidDateError);
            return;
        }

        if (ageMonths == 0) {
            ageMonths = 11;
            ageDays = 30 + ageDays;
        } else {
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
    if (day > 1 || day == 0)
        $("#day-plural").css("visibility", "visible");
    else
        $("#day-plural").css("visibility", "hidden");

    if (month > 1 || month == 0)
        $("#month-plural").css("visibility", "visible");
    else
        $("#month-plural").css("visibility", "hidden");

    if (year > 1 || year == 0)
        $("#year-plural").css("visibility", "visible");
    else
        $("#year-plural").css("visibility", "hidden");
}

function clearResult() {
    $(".day-result").html("- -");
    $(".month-result").html("- -");
    $(".year-result").html("- -");
}

function displayResult() {
    clearResult();

    const dayNumString = $("#day").val();
    const monthNumString = $("#month").val();
    const yearNumString = $("#year").val();

    const isCorrectDay = checkDayInput(dayNumString);
    const isCorrectMonth = checkMonthInput(monthNumString);
    const isCorrectYear = checkYearInput(yearNumString);

    if (isCorrectDay && isCorrectMonth && isCorrectYear) {
        let dayNum = Number(dayNumString);
        let monthNum = Number(monthNumString);
        let yearNum = Number(yearNumString);

        if (checkValidDate(dayNum, monthNum, yearNum)) {
            let birthday = `${monthNum}/${dayNum}/${yearNum}`;
            let [ageDay, ageMonth, ageYear] = calculateAge(birthday);

            setCorrectPlural(ageDay, ageMonth, ageYear);

            $(".year-result").html(ageYear);
            $(".month-result").html(ageMonth);
            $(".day-result").html(ageDay);
        }
    }
}

$(".arrow-button").on('click', displayResult);
