import EmailService from "../../../shared/middleware/sendMail";
import { sharedServices } from "../../../shared/services";
import { hmacProcess } from "../../../shared/utils";
import { userRepository } from "../repository/user.repository";

export class loginUserService {
    static async loginOrRegisterByEmail(email: string, isAdmin: boolean) {
        const user = await sharedServices.existUserByEmail(email);
        const code = Math.floor(100000 + Math.random() * 900000)
        console.log(`code: ${code}, email: ${email}, isAdmin: ${isAdmin}`);

        const emailSent = await new EmailService(code).sendEmail(email, "Your Nova Store Verification Code");
        const hashedCode = hmacProcess(code)
        if (!user) {
            await userRepository.create({ email, isAdmin, verificationCode: hashedCode })
        } else {
            await userRepository.updateById(user._id, { isAdmin, verificationCode: hashedCode })
        }
        return "success";
    }
}