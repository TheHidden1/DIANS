import { useState } from "react";
import logoUrl from "../assets/images/logo.png"
import axios from "axios";
import qs from "qs";
import Cookies from 'js-cookie';

export default function Login() {
  const [username, setUsername] = useState(Cookies.get("username"))
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const doLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const data = qs.stringify({
        'username': username,
        'password': password
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://mht-back-end-deployment.azurewebsites.net/api/v1/auth/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
        withCredentials: true,
      };

      const response = await axios.request(config);
      console.log(response)

      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set('token', token);
        Cookies.set('username', response.data.username)
        setError("");
        window.location.pathname = '/map';
      } else {
        console.error('Login failed:', response.data.message);
        setError(`Login failed: ${response.data.message}`);
      }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      setError(error.response.data.message);
    }
  }
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
            Log in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  required
                  value={username}
                  onChange={(e) => { setUsername(e.target.value) }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value) }}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={doLogin}
                className="flex w-full justify-center rounded-md bg-yellow-800 mb-3 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800"
              >
                Log in
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/register"
              className="font-semibold leading-6 text-yellow-800 hover:text-yellow-700"
            >
              Register Now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
