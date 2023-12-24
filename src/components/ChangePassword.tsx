import { useState } from "react";
import logoUrl from "../assets/images/logo.png";
import axios from "axios";
import Cookies from 'js-cookie';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");

    const changePassword = async () => {
        try {
            if (newPassword !== confirmNewPassword) {
                setError("New passwords do not match.");
                return;
            }

            // Make a request to changePassword API
            const changePasswordData = {
                username: Cookies.get("username"),
                oldPassword: oldPassword,
                newPassword: newPassword,
                repeatPassword: confirmNewPassword,
            };

            const changePasswordResponse = await axios.post(`http://13.53.87.95:9090/api/v1/user/changePassword?username=${changePasswordData.username}&oldPassword=${changePasswordData.oldPassword}&newPassword=${changePasswordData.newPassword}&repeatPassword=${changePasswordData.repeatPassword}`);

            if (changePasswordResponse.status === 200) {
                setError("");
                console.log("Password changed successfully!");
                window.location.href = '/viewprofile';
            } else {
                setError(`Password change failed: ${changePasswordResponse.data.message}`);
            }
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={logoUrl}
                        alt="MHT"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Change Your Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label
                                htmlFor="oldPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Old Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="oldPassword"
                                    name="oldPassword"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="newPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="confirmNewPassword"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Confirm New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmNewPassword"
                                    name="confirmNewPassword"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="button"
                                onClick={changePassword}
                                className="flex w-full justify-center rounded-md bg-yellow-800 mb-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800"
                            >
                                Change Password
                            </button>
                        </div>
                    </form>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </div>
        </>
    );
}
