import {instance} from "./api";



export type GetCaptchaUrlResponseType = {
    url: string
}



export const securityAPI = {

    getCaptchaUrl(){
        return (
            instance.get<GetCaptchaUrlResponseType>(`security/get-captcha-url`)
                .then(response => {
                    return response.data.url
                })
        )
    }

}
