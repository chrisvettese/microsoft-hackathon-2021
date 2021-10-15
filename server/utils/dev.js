
function assert(value, error_message) {
    if (value) {
        return;
    } else {
        throw new Error(error_message);
    }
}

export default assert;