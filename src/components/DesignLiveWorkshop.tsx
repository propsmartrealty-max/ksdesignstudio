import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { Mic, MicOff, X, Sparkles, Volume2, Loader2 } from 'lucide-react';

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
  return bytes;
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
  }
  return buffer;
}

function createBlob(data: Float32Array): any {
  const int16 = new Int16Array(data.length);
  for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
  return { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' };
}

export default function DesignLiveWorkshop({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentTranscription, setCurrentTranscription] = useState("");
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true); setIsConnecting(false);
            const source = audioContextRef.current!.createMediaStreamSource(streamRef.current!);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const pcmBlob = createBlob(e.inputBuffer.getChannelData(0));
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const b64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (b64 && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(b64), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer; source.connect(ctx.destination);
              source.addEventListener('ended', () => sourcesRef.current.delete(source));
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }
            if (message.serverContent?.outputTranscription) {
              setCurrentTranscription(prev => (prev + " " + message.serverContent!.outputTranscription!.text).slice(-150));
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear(); 
              nextStartTimeRef.current = 0;
            }
          },
          onclose: () => stopSession(),
          onerror: (e) => { console.error(e); stopSession(); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          systemInstruction: 'You are the Virtual Architect for KS Design Studio Pune. You are professional, visionary, and expert in modern Pune residential architecture. Guide the user through spatial challenges and material choices.'
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) { 
      console.error(err);
      setIsConnecting(false); 
    }
  };

  const stopSession = () => {
    setIsActive(false); setIsConnecting(false);
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (sessionRef.current) try { sessionRef.current.close(); } catch(e) {}
    sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
    sourcesRef.current.clear();
    setCurrentTranscription("");
  };

  useEffect(() => { if (!isOpen && isActive) stopSession(); }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-white/90 backdrop-blur-xl">
      <div className="bg-white w-full max-w-4xl h-[80vh] rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] flex flex-col animate-fade-in-up border border-slate-100">
        <div className="p-8 bg-white text-charcoal flex justify-between items-center border-b border-slate-50">
          <div className="flex items-center space-x-4">
            <div className={`p-4 rounded-xl ${isActive ? 'bg-brass animate-pulse' : 'bg-slate-50'}`}><Sparkles size={24} className={isActive ? 'text-white' : 'text-brass'} /></div>
            <div><h3 className="text-2xl font-bold">Design Live <span className="text-brass">Workshop</span></h3><p className="text-[10px] uppercase tracking-[0.3em] text-charcoal/30 font-black">Architectural Native AI v2.5</p></div>
          </div>
          <button onClick={onClose} className="p-3 text-charcoal/20 hover:text-charcoal transition-colors"><X size={28} /></button>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center p-12 text-center">
          {isActive ? (
            <div className="space-y-12 w-full max-w-2xl animate-fade-in">
              <div className="flex items-end space-x-2 h-20 justify-center">
                 {[...Array(16)].map((_, i) => (<div key={i} className="w-2 bg-brass rounded-full animate-bounce" style={{ height: `${20 + Math.random() * 80}%`, animationDelay: `${i * 0.05}s` }}></div>))}
              </div>
              <p className="text-charcoal text-2xl  italic">"Virtual Architect is listening..."</p>
              <div className="bg-white/50 p-8 rounded-[2rem] min-h-[120px] text-left italic font-light text-stone-500 shadow-inner border border-stone-100 overflow-y-auto max-h-[200px]">
                {currentTranscription || "The stream is established. Speak freely about your spatial vision..."}
              </div>
              <button onClick={stopSession} className="bg-red-500 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-[11px] shadow-xl hover:bg-red-600 transition-colors">Terminate Session</button>
            </div>
          ) : (
            <div className="max-w-md space-y-10">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Volume2 className="text-brass" size={48} />
              </div>
              <div>
                <h2 className="text-4xl  font-bold mb-4 text-charcoal">Acoustic <span className="italic">Ideation</span></h2>
                <p className="text-stone-500 leading-relaxed font-light text-lg">Enter a low-latency voice environment to discuss layouts, material longevity, and architectural vision in real-time.</p>
              </div>
              <button 
                onClick={startSession} 
                disabled={isConnecting} 
                className="bg-charcoal text-white px-12 py-6 rounded-full font-bold uppercase tracking-widest text-[11px] flex items-center space-x-4 mx-auto disabled:opacity-50 hover:bg-brass transition-all shadow-xl"
              >
                {isConnecting ? <Loader2 className="animate-spin text-white" /> : <Mic size={20} />}
                <span>{isConnecting ? 'Establishing Stream...' : 'Open Creative Stream'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}