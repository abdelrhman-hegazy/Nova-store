
class AppError extends Error {
    constructor(message: string, public status: number, public errorType: string) {
        super(message)
        Error.captureStackTrace(this, this.constructor)
    }
}
export default AppError

