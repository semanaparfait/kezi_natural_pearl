import { useState, useEffect } from 'react'
import { useGetCurrentUserQuery } from '@/features/auth/authApi';
import { FaMicrophone } from 'react-icons/fa'
import {  X, Send } from 'lucide-react'
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import toast from 'react-hot-toast'
import { products } from '@/components/products' // your products

function Voice() {
    const { data: currentUser } = useGetCurrentUserQuery(undefined);

    const [isRecording, setIsRecording] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [timer, setTimer] = useState(0)
    const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
        useSpeechRecognition();
    useEffect(() => {
        let interval:any;
        if (isRecording) {
            interval = setInterval(() => setTimer(prev => prev + 1), 1000);
        } else {
            setTimer(0);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRecording]);

    const formatTime = (seconds:number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    const startRecording = () => {
        if (!browserSupportsSpeechRecognition) {
            toast.error("Browser not supported");
            return;
        }

        resetTranscript();
        setIsRecording(true);
        setIsPlaying(true);

        SpeechRecognition.startListening({
            continuous: true,
            language: "en-US"
        });
    };
    const stopRecording = () => {
        SpeechRecognition.stopListening();
        setIsPlaying(false);
    };

    const handleSend = () => {
        stopRecording();
        setIsRecording(false);

        if (!transcript) {
            toast.error("We didn't hear any product");
            return;
        }

        console.log("Hidden script:", transcript); 

        const found = products.filter(p =>
            transcript.toLowerCase().includes(p.name.toLowerCase()) ||
            transcript.toLowerCase().includes(p.category.toLowerCase())
        );

        if (found.length > 0) {
            toast.success(`We found ${found.length} product(s) 🎉`);
            
            // 👉 here you can redirect to filtered shop
            // or auto add first product
            console.log("Found products:", found);

        } else {
            toast.error("We looked in our database but found nothing");
        }
    };

    return (
        <div className="fixed md:right-8 right-4 md:bottom-8 bottom-4 z-[100] flex flex-col items-end">

            {/* floating mic */}
            {!isRecording && (
                <button
                    onClick={startRecording}
                    className="group relative flex items-center justify-center w-16 h-16 rounded-full bg-[var(--primary)] shadow-2xl transition-all duration-500 hover:scale-110 active:scale-95"
                >
                    <span className="absolute inset-0 rounded-full bg-[var(--gold-color)] opacity-20 animate-ping"></span>
                    <FaMicrophone className="text-[var(--gold-color)] text-2xl z-10" />
                </button>
            )}

            {/* recording panel */}
            {isRecording && (
                <div className="w-80 p-8 bg-white rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-6">

                    <div className="w-full flex justify-between items-center">
                        <span className="text-[10px] font-bold text-[var(--gold-color)]">Voice AI</span>
                        <X onClick={()=>setIsRecording(false)} className="cursor-pointer"/>
                    </div>

                    <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                        <FaMicrophone size={30} className={isPlaying ? "text-red-500" : "text-black"} />
                    </div>

                    <p className="text-sm">
                        Hello {currentUser ? currentUser.email.split("@")[0] : "Guest"}
                    </p>

                    <h1 className="text-2xl font-bold">{formatTime(timer)}</h1>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="flex-1 py-3 bg-black text-white rounded-xl"
                        >
                            {isPlaying ? "Pause" : "Resume"}
                        </button>

                        <button
                            onClick={handleSend}
                            className="w-14 h-14 bg-[var(--primary)] text-white rounded-full flex items-center justify-center"
                        >
                            <Send size={18}/>
                        </button>
                    </div>

                    <button
                        onClick={()=>setIsRecording(false)}
                        className="text-xs text-red-400"
                    >
                        Cancel
                    </button>
                </div>
            )}
        </div>
    )
}

export default Voice;
