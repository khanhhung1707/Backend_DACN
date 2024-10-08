export const responseData = (response, status, message, data) => {
    response.status(status).json({
        statusCode: status,
        message,
        content: data,
        date: new Date()
    });
};