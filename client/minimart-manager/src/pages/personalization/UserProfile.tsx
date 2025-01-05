import Avatar from "../../components/Avatar";
import RoundedButton from "../../components/Button/RoundedButton";
import TextField from "../../components/InputField/TextField";
import { LoadingScreen } from "../../components/Loading/LoadingScreen";
import DatePicker from "../../components/Picker/DatePicker";
import { useAuth } from "../../providers/AuthProvider";
import { updateUserProfile } from "../../services/api/UserApi";
import { User } from "../../data/Entities/User";
import toast from "react-hot-toast";
import SuccessToast from "../../components/Toast/SuccessToast";
import ErrorToast from "../../components/Toast/ErrorToast";
import PasswordField from "../../components/InputField/PasswordField";
import { updatePassword } from "../../services/api/AuthApi";
import { useState } from "react";
import ValidationUtil from "../../utils/ValidationUtil";

function UserProfile() {
    const auth = useAuth();
    const user = auth.user;
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordLoading, setPasswordLoading] = useState<boolean>(false);
    const [infomationLoading, setInformationLoading] = useState<boolean>(false);
    const [imageBase64, setImageBase64] = useState<string | null>(null);    

    if (!user) {
        return <LoadingScreen />;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdateProfile = async (id: string, formData: FormData) => {
      setInformationLoading(true)

        try {
            const data: User = {
                _id: user._id,
                username: user.username,
                role: user.role,
                status: user.status,
                firstname: formData.get('firstname') as string,
                lastname: formData.get('lastname') as string,
                dateOfBirth: formData.get('dateOfBirth') ? new Date(formData.get('dateOfBirth') as string).toISOString() : '',
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                address: formData.get('address') as string,
                image: imageBase64 || user.image,
            }

            const updatedUser =  await updateUserProfile(id, data);

            localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.custom((t) => (
                <SuccessToast
                    message={"User profile updated successfully"}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));

        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast
                    message={error || ''}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } finally {
            setInformationLoading(false);
        }
    }

    const handleUpdatePassword = async (id: string, formData: FormData) => {
        setPasswordLoading(true);
        try {
            const currentPassword = formData.get('currentPassword') as string;
            const newPassword = formData.get('newPassword') as string;

            const message = await updatePassword(id, currentPassword, newPassword);

            toast.custom((t) => (
                <SuccessToast
                    message={message}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));

        } catch (error: any) {
            toast.custom((t) => (
                <ErrorToast
                    message={error || ''}
                    onDismiss={() => toast.dismiss(t.id)}
                />
            ));
        } finally {
            setPasswordLoading(false)
        }
    }

    return (
        <div className="flex flex-col w-full h-full rounded-lg gap-4" >
            <p className="text-2xl ms-4 font-medium">User Setting</p>
            <div className="flex m-4 rounded-lg h-full gap-x-4">
                <div className="flex flex-col w-1/3  h-full gap-y-4">
                    <div className="grid grid-cols-2 gap-y-4  shadow-lg bg-white p-4 rounded-lg">
                        <Avatar style="rounded-lg row-span-3" size="150px" src={user?.image} />
                        <p className="text-2xl font-medium">{user?.username}</p>
                        <p className="text-xl text-gray-500 font-medium">{user?.role}</p>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>

                    <form onSubmit={(e)=> {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        if (user._id) {
                            handleUpdatePassword(user._id, formData);
                        }
                    }} className="grid grid-cols-1 gap-y-4 shadow-lg bg-white h-full p-4 rounded-lg">
                        <p className="text-2xl font-medium">Password Information</p>
                        <PasswordField validations={[ValidationUtil.validatePassword]} placeholder="******" name="currentPassword" label="Current Password" />
                        <PasswordField validations={[ValidationUtil.validatePassword]} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="******" name="newPassword" label="New Password" />
                        <PasswordField validations={[ValidationUtil.validatePassword]} isConfirmField={true} confirmValue={confirmPassword} placeholder="******" name="confirmPassword" label="Confirm Password" />
                        <RoundedButton loading={passwordLoading} type="submit" label="Save changes" />
                    </form>
                </div>
                <form onSubmit={(e) => {
                     e.preventDefault();
                     const formData = new FormData(e.currentTarget);
                     if (user._id) {
                         handleUpdateProfile(user._id, formData);
                     }
                }} className="grid grid-cols-2 gap-x-8 w-2/3 h-full shadow-lg bg-white p-8 rounded-lg">
                    <p className="col-span-2 text-2xl font-medium">Personal Information</p>
                    <TextField name="firstname" initialValue={user?.firstname} label="Frist Name" />
                    <TextField name="lastname" initialValue={user?.lastname} label="Last Name" />
                    <DatePicker name="dateOfBirth" value={user?.dateOfBirth ? new Date(user.dateOfBirth) : undefined} label="Date of Birth" />
                    <TextField name="email" initialValue={user?.email} label="Email" />
                    <TextField name="phone" initialValue={user?.phone} label="Phone Number" />
                    <TextField name="address" initialValue={user?.address} label="Address" />
                    <div className="flex justify-center col-span-2">
                        <RoundedButton loading={infomationLoading} type="submit" width="60%" label="Save changes" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserProfile;