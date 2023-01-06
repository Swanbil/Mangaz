const getCurrentDate = () => {
    let dateNow = new Date();
    return dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate();
}

const getDateInOneMonth = () => {
    let dateNow = new Date();
    let nextMonth, year;
    if (dateNow.getMonth() == 11) {
        nextMonth = '01'
        year = dateNow.getFullYear() + 1;
    } else {
        nextMonth = ('0' + (dateNow.getMonth() + 2)).slice(-2)
        year = dateNow.getFullYear()
    }
    return year + '-' + nextMonth + '-' + (dateNow.getDate() <= 9 ? ('0' + dateNow.getDate()) : dateNow.getDate());
}

module.exports = {
    getCurrentDate,
    getDateInOneMonth
}