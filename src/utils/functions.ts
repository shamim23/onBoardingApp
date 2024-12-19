import { UserData } from "../store/userStore";

export const validateFields = async (step: number, values: Partial<UserData>) => {
 if(step == 1) {
    //  valdiation
    debugger;
    return true;
 } else if(step ==2){

 }  

 return false;
}