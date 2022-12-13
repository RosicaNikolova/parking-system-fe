export default function Validation(values) {
    let error = {}
    const email_pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
    const licensePlate_pattern = /(\w{2}-\d{2}-\d{2})|(\d{2}-\d{2}-\w{2})|(\d{2}-\w{2}-\d{2})|(\w{2}-\d{2}-\w{2})|(\w{2}-\w{2}-\d{2})|(\d{2}-\w{2}-\w{2})|(\d{2}-\w{3}-\d{1})|(\d{1}-\w{3}-\d{2})|(\w{2}-\d{3}-\w{1})|(\w{1}-\d{3}-\w{2})|(\w{3}-\d{2}-\w{1})|(\d{1}-\w{2}-\d{3})/
    const phoneNumber_pattern = /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    if (!email_pattern.test(values.email)) {
        error.email = "Email is not in the right format";
    }
    else {
        error.email = "";

    }
    if (!phoneNumber_pattern.test(values.phone)) {
        error.phoneNumber = "Phone number is not in the right format";
    }
    else {
        error.phoneNumber = "";

    }
    // if (checked) {
    //     if (!licensePlate_pattern.test(values.licensePlate)) {
    //         error.licensePlate = "Wrong format of license plate";
    //     }
    //     else {
    //         error.licensePlate = "";
    //     }
    // } else {
    //     error.licensePlate = "";
    // }

    return error;
}