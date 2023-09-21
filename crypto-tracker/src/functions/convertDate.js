export const convertDate = (number) => {
    var myData = new Date(number);
    return myData.getDate() + "/" + (myData.getMonth() + 1);
}