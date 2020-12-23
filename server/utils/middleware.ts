export const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    response.status(400).send({ error: `there was an error: ${error}` }) 
  }
