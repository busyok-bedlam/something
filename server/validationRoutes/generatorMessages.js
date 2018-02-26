export default function generatorMessages(data) {
    let errMsg = '';
    const errors = {};
    data.forEach(err => {
        let field = Object.keys(err)[0];
        errors[field] = err[field];
        errMsg += `${field}: ${err[field]};`;
    });
    return errMsg;
}