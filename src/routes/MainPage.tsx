import { useState } from 'react';
import { useNavigate } from 'react-router';

export default function MainPage() {
    // const isAuthenticated = sessionStorage.getItem('isAuthenticated');
    const [isAuthenticated, setIsAuthenticated] =
        useState<string|null>(sessionStorage.getItem('isAuthenticated'));
    const navigate = useNavigate();

    return (
        <>
            <h1>Main Page</h1>
            <div>로그인 여부 상관없이 누구나 접속 가능!</div>
            {
                isAuthenticated === null || isAuthenticated === 'false' ?
                    <button onClick={()=>{
                        navigate("/login");
                }}>로그인</button>
                    :
                    <div>
                        <button onClick={()=>{
                            setIsAuthenticated("false");
                            sessionStorage.setItem('isAuthenticated', "false");
                        }}>로그아웃</button>
                        <button onClick={() => {navigate("/")}}>root 로 이동</button>
                    </div>
            }
        </>
    );
}