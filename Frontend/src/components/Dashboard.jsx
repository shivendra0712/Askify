import React, { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Editor from 'react-simple-code-editor'
import axiosInstance from '../config/axios'
import ReactMarkdown from 'react-markdown'
import Navber from './Navber'

const Dashboard = () => {
    const [review, setReview] = useState('');
    const [code, setCode] = useState('Ask anything');

    useEffect(() => {
        prism.highlightAll();
    }, [code]);

    useEffect(() => {
        axiosInstance.get("/auth/user")
            .then(res => console.log("Dashboard user:", res.data))
            .catch(err => console.error("Dashboard error:", err));
    }, []);

    async function codeReview() {
        try {
            const response = await axiosInstance.post('/ai/get-review', { code });
            setReview(response.data);
        } catch (err) {
            console.error("Review error", err);
        }
    }

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
            <Navber />

            <div className="w-full h-[90%] flex flex-col md:flex-row items-center gap-6 p-4 md:p-6">
                <div className="relative w-full md:w-1/2 h-[40vh] md:h-full bg-white/5 backdrop-blur-md rounded-2xl p-6 overflow-y-auto border border-white/10 shadow-lg scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    <Editor
                        value={code}
                        onValueChange={setCode}
                        highlight={(code) =>
                            prism.highlight(code, prism.languages.javascript, "javascript")
                        }
                        padding={12}
                        className="font-mono text-[15px] text-white h-full w-full outline-none bg-transparent"
                    />
                    <button
                        onClick={codeReview}
                        className="absolute bottom-4 right-4 bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-full text-sm font-medium shadow-md backdrop-blur-sm transition"
                    >
                        Review
                    </button>
                </div>

                <div className="w-full md:w-1/2 h-[40vh] md:h-full bg-white/5 backdrop-blur-md rounded-2xl p-6 overflow-y-auto border border-white/10 shadow-lg scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                    <ReactMarkdown>{review}</ReactMarkdown>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;
