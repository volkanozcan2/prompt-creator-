import React, { useState, useEffect } from 'react';
import { PromptState } from '../types';
import { Clipboard, Check, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';

interface JsonPreviewProps {
  data: PromptState;
  onGenerateImage: () => void;
  isGenerating: boolean;
  generatedImage: string | null;
  error: string | null;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ 
  data, 
  onGenerateImage, 
  isGenerating, 
  generatedImage,
  error 
}) => {
  const [copied, setCopied] = useState(false);
  const [jsonOutput, setJsonOutput] = useState('');
  const [activeTab, setActiveTab] = useState<'json' | 'image'>('json');

  // Auto-switch to image tab when generation completes
  useEffect(() => {
    if (generatedImage) {
      setActiveTab('image');
    }
  }, [generatedImage]);

  // Construct JSON
  useEffect(() => {
    const constructedJson = {
      subject: {
        description: data.description || `A ${data.age.toLowerCase()} ${data.gender.toLowerCase()} portrait`,
        age: data.age.toLowerCase(),
        gender: data.gender.toLowerCase(),
        expression: data.expression.toLowerCase(),
        hair: {
          color: data.hairColor.toLowerCase(),
          style: data.hairStyle.toLowerCase()
        },
        clothing: {
          top: {
            type: data.clothingType.toLowerCase(),
            color: data.clothingColor.toLowerCase(),
            details: data.clothingDetails
          }
        },
        face: {
          preserve_original: data.preserveOriginal,
          makeup: data.makeup
        },
        accessories: {
          eyewear: data.eyewearType === 'None' ? null : data.eyewearType.toLowerCase(),
          earrings: data.earringsType === 'None' ? null : data.earringsType.toLowerCase(),
          necklace: data.jewelryType === 'None' ? null : data.jewelryType.toLowerCase(),
        },
        photography: {
          camera_style: data.cameraStyle,
          angle: data.angle.toLowerCase(),
          aspect_ratio: data.aspectRatio.split(' ')[0], 
        },
        background: {
          setting: data.setting,
          atmosphere: data.atmosphere,
          lighting: data.lighting.toLowerCase()
        }
      }
    };
    setJsonOutput(JSON.stringify(constructedJson, null, 2));
  }, [data]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="sticky top-24 space-y-4">
      
      {/* Tab Switcher / Header */}
      <div className="bg-[#1a1a1a] rounded-t-3xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex bg-black/30 rounded-lg p-1">
             <button 
                onClick={() => setActiveTab('json')}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md transition-all ${activeTab === 'json' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
             >
               JSON
             </button>
             <button 
                onClick={() => setActiveTab('image')}
                className={`px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-md transition-all ${activeTab === 'image' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/70'}`}
             >
               Preview
             </button>
          </div>
      </div>

      <div className="bg-[#1a1a1a] rounded-b-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 flex flex-col -mt-4 min-h-[500px]">
        
        {activeTab === 'json' && (
          <div className="relative h-full flex-1">
            <textarea
              readOnly
              value={jsonOutput}
              className="w-full h-[500px] bg-[#1a1a1a] text-gray-300 p-6 font-mono text-sm leading-relaxed resize-none focus:outline-none scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
              spellCheck={false}
            />
          </div>
        )}

        {activeTab === 'image' && (
           <div className="relative h-[500px] bg-[#0f0f0f] flex items-center justify-center p-4">
              {isGenerating ? (
                  <div className="flex flex-col items-center gap-4 text-white/50 animate-pulse">
                     <Sparkles size={48} className="animate-spin duration-[3000ms]" />
                     <span className="text-xs font-mono uppercase tracking-widest">Generating Image...</span>
                  </div>
              ) : generatedImage ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img src={generatedImage} alt="Generated result" className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" />
                    <a href={generatedImage} download="generated-prompt.png" className="absolute bottom-4 right-4 bg-black/60 hover:bg-black text-white px-3 py-1.5 rounded-lg text-xs font-medium backdrop-blur-md border border-white/10 transition-colors">
                      Download
                    </a>
                  </div>
              ) : error ? (
                 <div className="flex flex-col items-center gap-2 text-red-400 max-w-xs text-center">
                    <AlertCircle size={32} />
                    <p className="text-sm">{error}</p>
                 </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-white/20">
                   <ImageIcon size={64} strokeWidth={1} />
                   <p className="text-sm font-mono uppercase tracking-widest">No image generated</p>
                </div>
              )}
           </div>
        )}

      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Copy Button */}
        <button 
          onClick={copyToClipboard}
          className={`py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-sm transition-all transform active:scale-[0.98] shadow-lg border ${
            copied 
              ? 'bg-green-500 text-white border-green-500' 
              : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
          }`}
        >
          {copied ? <Check size={18} /> : <Clipboard size={18} />}
          {copied ? 'Copied' : 'Copy JSON'}
        </button>

        {/* Generate Button */}
        <button 
          onClick={() => { setActiveTab('image'); onGenerateImage(); }}
          disabled={isGenerating}
          className="py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold text-sm transition-all transform active:scale-[0.98] shadow-lg bg-black text-white hover:bg-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
        >
           {isGenerating ? <Sparkles size={18} className="animate-spin" /> : <Sparkles size={18} />}
           {isGenerating ? 'Dreaming...' : 'Generate Image'}
        </button>
      </div>
      
    </div>
  );
};