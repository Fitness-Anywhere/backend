export const getDate = date => {
    const dateFormat = new Date(date);
    const day = dateFormat.getDate();
    const year = dateFormat.getFullYear();

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dateFormat.getMonth()];
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dateFormat.getDay()];

    return `${month}/${(day < 10 && '0') + day}/${year} - ${weekDay}`;
}

export const getTime = date => {
    const dateFormat = new Date(date);
    const hour = dateFormat.getHours();
    const min = dateFormat.getMinutes();

    return `${(hour < 10 && '0') + hour}:${(min < 10 && '0') + min}`;
}