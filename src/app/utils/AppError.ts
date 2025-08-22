
class AppError extends Error{
    constructor(message:string, public statusCode:number, public errorType:string){
        super(message)
        Error.captureStackTrace(this, this.constructor)
    }
}
export default AppError

