function getErrors(error) {
    let errorArray = [];
    let result = {
        status: 400,
        type: error?._message,
        message: {},
    }
    if (error) {

        if (!error.errors) {
            if (error.code === 11000 && error.keyPattern.email > 0)
                result.message = "Email already exists, try a diffrent value!"

        }
        else {
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
        }
    } else {
        result.status = 200;
        result.type = "Successful";
        result.message = 'No Errors found, Saved Successfully'
    }
    return result
}
export default getErrors;