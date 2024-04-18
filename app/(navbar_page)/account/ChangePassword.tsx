import { apiBase } from "@/api";
import BaseInputText from "@/components/shares/inputs/BaseInputTextProfile";
import { useAuth } from "@/contexts";
import { useInput } from "@/hooks/useInput";
import { Button, Checkbox } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ChangePassword = ()=>{

    const {user} = useAuth()

    const [newPassword,setNewPassword] = useInput("")
    const [confirmPassword,setConfirmPassword] = useInput("")

    const [minCharPass,setMinCharPass] = useState(false)
    const [passwordMatch,setPasswordMatch] = useState(false)


    useEffect(()=>{
        if(newPassword.length >= 8){
            setMinCharPass(true)
        }else{
            setMinCharPass(false)
        }
    },[newPassword])

    useEffect(()=>{
        if(confirmPassword){
            if(confirmPassword === newPassword){
                setPasswordMatch(true)
            }else{
                setPasswordMatch(false)
            }
        }else{
            setPasswordMatch(false)
        }
    },[confirmPassword])


    const resetPassword = async ()=>{
        if(minCharPass && passwordMatch){
            try {
                const res = await apiBase().user().resetPassword(newPassword);
                setNewPassword("");
                setConfirmPassword("");
                toast.success("Password changed")
                
            } catch (error) {
                
                toast.error("Request Failed")
            }
        }
    }
    return(
        <div className="w-full h-fit flex flex-col items-center font-mono">
            <div className="p-10 flex flex-col rounded-lg">
                <h1 className="text-4xl font-black text-[--kinerja-gold] mb-8">
                    Reset Password
                </h1>

                <div className="">
                    <h4 className="text-gray-500">
                        New Password
                    </h4>
                    <BaseInputText type="password" id="1" label="" value={newPassword} setValue={setNewPassword} error=""></BaseInputText>
                </div>

                <div className="">
                    <h4 className="text-gray-500">
                        Confirm Password
                    </h4>
                    <BaseInputText type="password" id="2" label="" value={confirmPassword} setValue={setConfirmPassword}></BaseInputText>
                </div>

                {
                    <div className="mt-2 mb-6 flex flex-col gap-1">
                        <Checkbox isDisabled defaultSelected={minCharPass} isSelected={minCharPass} size="sm">8 characters minimum</Checkbox>
                        <Checkbox isDisabled defaultSelected={passwordMatch} isSelected={passwordMatch} size="sm">Password matched</Checkbox>
                    </div>
                }
                <div className="flex gap-2 justify-end">
                    <Button className="bg-[--kinerja-gold] text-white" onClick={resetPassword}>
                        Save
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default ChangePassword;