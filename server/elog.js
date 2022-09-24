function getErrors(error) {
    let errorArray = [];
    let result = {
        status: 400,
        type: error?._message,
        message: {},
    }
    if (error) {
        Object.keys(error.errors).forEach(k => {
            let eTemp = {
                name: '',
                message: ''
            }
            eTemp.name = k;
            eTemp.message = error.errors[k].message;
            errorArray.push(eTemp)
        })
        result.message = errorArray
    } else {
        result.status=200;
        result.type="Successful";
        result.message='No Errors found, Saved Successfully'
    }
    return result
}
export default getErrors;