function getCurrentMonth(requiredMonth){
    requiredMonth = requiredMonth === undefined ? (new Date().getMonth() + 1) : requiredMonth;
    switch((requiredMonth)){
        case 1: return 'January';
        case 2: return 'February';
        case 3: return 'March';
        case 4: return 'April';
        case 5: return 'May';
        case 6: return 'June';
        case 7: return 'July';
        case 8: return 'August';
        case 9: return 'September';
        case 10: return 'Octomber';
        case 11: return 'November';
        case 12: return 'December';
        default: return 'Error';
    }
}

function monthLength(month = new Date().getMonth() + 1){
    let currentMonthLength;
    switch(month){
        case 1: currentMonthLength = 31; break;
        case 2: currentMonthLength = new Date().getFullYear() % 4 === 0 ? 29 : 28; break;
        case 3: currentMonthLength = 31; break;
        case 4: currentMonthLength = 30; break;
        case 5: currentMonthLength = 31; break;
        case 6: currentMonthLength = 30; break;
        case 7: currentMonthLength = 31; break;
        case 8: currentMonthLength = 31; break;
        case 9: currentMonthLength = 30; break;
        case 10: currentMonthLength = 31; break;
        case 11: currentMonthLength = 30; break;
        case 12: currentMonthLength = 31; break;
        default: currentMonthLength = -1; break;
    }
    return currentMonthLength;
}

function calculateDayName(requiredDay = new Date()){
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[requiredDay.getDay()];
}

export function addDaysToTheCurrentDate(addDays = 0){
    let day;
    let month;
    let dayNumber;
    //getting the month ending dates
    const currentMonthLength = monthLength();

    //if the adding value is between the currentMonth
    if((new Date().getDate() + addDays) <= currentMonthLength){
        day = calculateDayName(new Date(`${new Date().getMonth() + 1}/${new Date().getDate() + addDays}/${new Date().getFullYear()}`));
        month = getCurrentMonth();
        dayNumber = new Date().getDate() + addDays;
    }
    //if the adding value extend the currentMonth
    else{
        day = calculateDayName(new Date(`${new Date().getMonth() + 1 === 12 ? 1 : new Date().getMonth() + 2}/${(new Date().getDate() + addDays) - currentMonthLength}/${new Date().getMonth() + 1 === 12 ? new Date().getFullYear() + 1 : new Date().getFullYear()}`));

        console.log();

        month = getCurrentMonth(new Date().getMonth() + 1 === 12 ? 1 : new Date().getMonth() + 2);
        dayNumber = (new Date().getDate() + addDays) - currentMonthLength;
    }
    return `${day}, ${month} ${dayNumber}`;
}

//get the year, month, day seperately
export function getMonth(month = 1){
    return getCurrentMonth(month);
}

export function getDay(day = new Date().getDate(), addDays = 0, consideringMonth = new Date().getMonth() + 1){
    const consideringMonthLength = monthLength(consideringMonth);

    //if the provided date is less than the current month
    if((day + addDays) <= consideringMonthLength){
        return (day + addDays);
    }
    else{
        return (day + addDays) - consideringMonthLength;
    }
}

export function getMonthDate(date = new Date(), addDays = 0){
    const currentMonthLength = monthLength(date.getMonth() + 1);
    //if adding days exceed the limit of the monthlength
    if((date.getDate() + addDays) > currentMonthLength){
        return `${getCurrentMonth(date.getMonth() + 2)} ${(date.getDate() + addDays) - currentMonthLength}`;
    }
    else{
        return `${getCurrentMonth(date.getMonth() + 1)} ${date.getDate() + addDays}`;
    }
}
