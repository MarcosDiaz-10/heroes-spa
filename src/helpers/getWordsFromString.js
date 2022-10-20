
export const getWordsFromString = ( string = '', number = 1 ) => {
    const stringValueArr = string.split(' ', number);
    const wordsOfString = stringValueArr.join();
    return wordsOfString;
};