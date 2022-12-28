const getCurrentDate = () => {
    let dateNow = new Date();
    return dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
}

const getDateInOneMonth = () => {
    let dateNow = new Date();
    let nextMonth, year;
    if (dateNow.getMonth() == 11) {
        nextMonth = 1;
        year = dateNow.getFullYear() + 1;
    } else {
        nextMonth = dateNow.getMonth() + 1;
        year = dateNow.getFullYear()
    }
    return year + '-' + nextMonth + '-' + dateNow.getDate();
}

module.exports = {
    getCurrentDate,
    getDateInOneMonth
}