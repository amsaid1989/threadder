function checkCharType(regex, sentence) {
    return regex.test(sentence);
}

const charCheck = {
    isAlphaNumeric: (senetence) => {
        return (
            checkCharType(/^[a-zA-Z0-9]/, senetence) ||
            checkCharType(/[a-zA-Z0-9]$/, senetence)
        );
    },

    isNonWordWithoutSpaceBefore: (senetence) => {
        return (
            checkCharType(/^\S\W/, senetence) ||
            checkCharType(/\S\W$/, senetence)
        );
    },

    isNonWordWithSpaceBefore: (senetence) => {
        return (
            checkCharType(/^\s\W/, senetence) ||
            checkCharType(/\s\W$/, senetence)
        );
    },
};

export default charCheck;
