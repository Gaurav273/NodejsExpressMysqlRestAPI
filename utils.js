function createResponse(error,result){
    const response = {
        status: 'success',
        data: result
    };

    if(error != null){
        response.status = 'error';
        response.data = error;
    }

    return response;
}

module.exports = {
    createResponse: createResponse
};


