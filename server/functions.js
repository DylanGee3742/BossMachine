const isMinionValid = (minion) => {
    let isValid;
    if  ((minion.name && typeof minion.name === 'string') &&
        (minion.title && typeof minion.title === 'string') &&
        (minion.weaknesses && typeof minion.weaknesses === 'string') &&
        (minion.salary && typeof minion.salary === 'number'))
     {
         isValid = true;
    } else {
         isValid = false
    }
    return isValid
};

module.exports = { isMinionValid }