export const responseData = (data, message, status, response) => {
    response.status(status).json({
        statusCode: status,
        message,
        content: data,
        date: new Date()
    })
}