export const takeDateFrom = (date) => {
    if (date)
        return date.substr(0, date.indexOf('T'));
}

export const makeDataFormatFrom = date => {
    if (date) {
        const today = new Date();
        let todayDay = today.getDate();
        if (todayDay < 10)
            todayDay = '0' + todayDate;
        let todayMonth = today.getMonth() + 1;
        if (todayMonth < 10)
            todayMonth = '0' + todayMonth;
        const todayDate = todayDay + '.' + todayMonth + '.' + today.getFullYear();

        const dateAndTime = date.split('T');

        const dateArray = dateAndTime[0].split('-');
        let formatedDate = dateArray[2] + '.' + dateArray[1] + '.' + dateArray[0];
        if (formatedDate === todayDate) formatedDate = 'Сегодня';

        const timeZoneOffset = today.getTimezoneOffset();
        const time = (dateAndTime[1].split('.'))[0].split(':');
        const UTCtime = parseInt(time[0]) * 60 + parseInt(time[1]);
        const localTime = UTCtime - timeZoneOffset;
        let formatedMinutes = localTime % 60;
        if (formatedMinutes < 10)
            formatedMinutes = '0' + formatedMinutes;
        let formatedHours = parseInt(localTime / 60);
        if (formatedHours >= 24) {
            formatedHours = formatedHours - 24;
            let newDate = new Date(dateArray[0], dateArray[1], dateArray[2]);
            newDate.setDate(newDate.getDate() + 1);

            let newDay = newDate.getDate();
            if (newDay < 10)
                newDay = '0' + newDay;
            let newMonth = newDate.getMonth();
            if (newMonth < 10)
                newMonth = '0' + newMonth;
            formatedDate = newDay + '.' + newMonth + '.' + newDate.getFullYear();
            if (formatedDate === todayDate) formatedDate = 'Сегодня';
        }
        const formatedTime = formatedHours + ':' + formatedMinutes;

        const finalFormat = formatedDate + ' ' + formatedTime;

        return finalFormat;
    }
}

export const makeDateFromNow = () => {
    const now = new Date();
    let minutes = now.getMinutes();
    if (minutes < 10)
        minutes = '0' + minutes;
    let hours = now.getHours();
    if (hours < 10)
        hours = '0' + hours;

    const finalFormat = 'Сегодня ' + hours + ':' + minutes;

    return finalFormat;
}