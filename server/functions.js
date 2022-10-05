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

const isIdeaValid = (idea) => {
    let isValid;
    if  (
        (idea.name && typeof idea.name === 'string') &&
        (idea.description && typeof idea.description === 'string') &&
        (idea.weeklyRevenue && typeof idea.weeklyRevenue === 'number') &&
        (idea.numWeeks && typeof idea.numWeeks === 'number')
    ) 
     {
         isValid = true;
    } else {
         isValid = false
    }
    return isValid
};

module.exports = { isMinionValid, isIdeaValid }