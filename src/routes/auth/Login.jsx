import {auth, FirestoreDB} from "../../../firebase-config.js";
import {
    GoogleAuthProvider,
    signInWithRedirect,
    signInWithEmailAndPassword,
    getRedirectResult
} from "firebase/auth";
import {useState} from "react";
import {redirect, useNavigate} from "react-router";
import {doc, getDoc, query, setDoc, where} from "firebase/firestore";


export default function Login() {
    const navigate = useNavigate();

    //todo fix google authentication to redirect
    async function handleGoogleLogin() {
        await signInWithRedirect(auth, new GoogleAuthProvider());

        navigate('/');
    }


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();

        await signInWithEmailAndPassword(auth, email, password);

    }


    return (
        <div className='w-full h-full bg-deep_bg_color flex items-center'>
            <div className='w-full max-h-fit flex flex-col items-center '>
                <div className='w-1/2'>
                    <h1 className='text-3xl text-white mb-6'>Log in</h1>
                </div>
                <form className='w-1/2' id='userInput' onSubmit={handleSubmit}>
                    <input type="email"
                           name="email"
                           value={email || ""}
                           onChange={(e) => setEmail(e.target.value)}
                           className="
                           my-2
                           bg-form_gray_color
                           text-base
                           rounded
                           text-white
                           w-full
                           h-16
                           placeholder:text-white
                           placeholder:text-opacity-50
                           focus:
                           block
                           p-2.5"
                           placeholder="plz write your email"
                           required
                    />
                    <input type="password"
                           name="password"
                           value={password || ""}
                           onChange={(e) => setPassword(e.target.value)}
                           className="
                           my-2
                           bg-form_gray_color
                           text-base
                           rounded
                           text-white
                           w-full
                           h-16
                           placeholder:text-white
                           placeholder:text-opacity-50
                           focus:
                           block
                           p-2.5"
                           placeholder="plz write your password"
                           required
                    />
                    <div className='w-full text-lg text-form_gray_color'>
                        <a className='hover:cursor-pointer'
                           onClick={() => navigate('/signIn')}>create account</a>
                    </div>

                    <div className='w-full'>
                        <button type='submit' className='text-white w-full'>
                            login
                        </button>
                    </div>
                </form>
                <button
                    onClick={handleGoogleLogin}
                    className='text-white'
                >Sign In with google
                </button>
            </div>
        </div>
    );
}