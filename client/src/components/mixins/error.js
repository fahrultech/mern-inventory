export const errorMessage = (error,name) => {
    if (error.length > 0) return error.filter(item => item.param === name)[0] !== undefined ?
        error.filter(item => item.param === name)[0].msg :
        ''
}
export const errorStatus = (error,name) => {
    return error.some(item => item.param === name)
}
