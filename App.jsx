import React, { useState, useRef } from 'react';
import { Play, Pause, Upload, Mic, Download, Trash2, Settings, Info, Volume2, Languages, Clock, Shield } from 'lucide-react';

const TranscriptionLanding = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  const demoAudioUrl = 'https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg.wav';

  const supportedLanguages = [
    'English', 'Spanish', 'French', 'German', 'Italian',
    'Portuguese', 'Russian', 'Japanese', 'Korean', 'Chinese'
  ];

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-blue-600 mb-4" />,
      title: "Lightning-Fast Processing",
      description: "Get your transcription in minutes with our optimized AI engine. Process files up to 25MB in size with exceptional speed and accuracy."
    },
    {
      icon: <Languages className="w-8 h-8 text-blue-600 mb-4" />,
      title: "Multilingual Support",
      description: "Support for 50+ languages with automatic language detection. Seamlessly transcribe content in multiple languages with dialect recognition."
    },
    {
      icon: <Volume2 className="w-8 h-8 text-blue-600 mb-4" />,
      title: "Superior Accuracy",
      description: "Industry-leading 99% accuracy for clear audio. Advanced noise reduction and speaker diarization for optimal results."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600 mb-4" />,
      title: "Privacy Focused",
      description: "Enterprise-grade security with end-to-end encryption. Your audio files are automatically deleted after processing."
    }
  ];

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!['audio/mp3', 'audio/wav', 'audio/m4a'].includes(file.type)) {
      setError('Unsupported file format. Please use MP3, WAV, or M4A.');
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      setError('File too large. Maximum size is 25MB.');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setError('');

    try {
      const interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 10, 90));
      }, 500);

      setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setTranscription("This is a sample transcription of the Gettysburg Address. In a real application, this would be the actual transcribed text from your audio file, complete with timestamps and speaker identification.\n\n[00:00] Speaker 1: Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.\n\n[00:15] Speaker 1: Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure.");
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Transcription failed:', error);
      setError('Failed to process the file. Please try again.');
      setIsLoading(false);
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadTranscription = () => {
    const blob = new Blob([transcription], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'transcription.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const clearTranscription = () => {
    setTranscription('');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <audio
        ref={audioRef}
        src={demoAudioUrl}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />

      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm fixed w-full z-10`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mic className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold">VoiceScribe</span>
            </div>
            <div className="flex items-center space-x-8">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-200"
                aria-label="Toggle theme"
              >
                {isDarkMode ? '🌙' : '☀️'}
              </button>
              <div className="hidden md:flex space-x-8">
                <a href="#features" className="hover:text-blue-600">Features</a>
                <a href="#demo" className="hover:text-blue-600">Try Now</a>
                <a href="#pricing" className="hover:text-blue-600">Pricing</a>
                <select 
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className={`bg-transparent border-none ${isDarkMode ? 'text-white' : 'text-gray-900'} cursor-pointer`}
                >
                  {supportedLanguages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className={`pt-32 pb-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            Powered by Advanced AI
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transform Speech into Text
            <span className="block text-blue-600">With Enterprise-Grade Accuracy</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional audio transcription powered by cutting-edge AI technology.
            Get precise results in minutes with no sign-up required. Perfect for podcasts,
            interviews, meetings, and more.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={togglePlay}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              aria-label={isPlaying ? "Pause demo" : "Play demo"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause Demo
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Listen to Demo
                </>
              )}
            </button>
            <a 
              href="#demo" 
              className="inline-flex items-center px-6 py-3 rounded-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Try Now
            </a>
          </div>
        </div>
      </section>

      <section id="features" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Advanced Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className={`p-6 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Experience VoiceScribe</h2>
          <div className={`rounded-lg shadow-sm p-8 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className={`border-2 border-dashed rounded-lg p-6 text-center ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="mb-4">Upload MP3, WAV, or M4A (max 25MB)</p>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            {isLoading && (
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Processing audio...</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {transcription && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Transcription Result</h3>
                <div className={`rounded-lg p-6 shadow-sm ${isDarkMode ? 'bg-gray-600' : 'bg-white'}`}>
                  <pre className="whitespace-pre-wrap text-sm">
                    {transcription}
                  </pre>
                  <div className="flex justify-end space-x-4 mt-4">
                    <button
                      onClick={downloadTranscription}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      aria-label="Download transcription"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download
                    </button>
                    <button
                      onClick={clearTranscription}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                      aria-label="Clear transcription"
                    >
                      <Trash2 className="w-5 h-5 mr-2" />
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="pricing" className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className={`p-8 rounded-lg shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                Free Tier
              </div>
              <h3 className="text-2xl font-bold mb-4">Basic</h3>
              <p className="text-4xl font-bold mb-6">$0<span className="text-lg font-normal text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Up to 10 minutes per file
                </li>
                <li className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Basic transcription
                </li>
                <li className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  2 languages
                </li>
                <li className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Standard support
                </li>
              </ul>
              <button className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Start Free
              </button>
            </div>
            <div className={`p-8 rounded-lg shadow-sm border-2 border-blue-500 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional</h3>
              <p className="text-4xl font-bold mb-6">$19<span className="text-lg font-normal text-gray-500">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Unlimited minutes
                </li>
                <li className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Advanced transcription with timestamps
                </li>
                <li className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  All 50+ languages
                </li>
                <li className="flex items-center">
                  <Info className="w-5 h-5 mr-2 text-blue-600" />
                  Priority support
                </li>
              </ul>
              <button className="w-full px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                Get Pro
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-900 text-white'}`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Mic className="h-6 w-6" />
                <span className="text-xl font-bold">VoiceScribe</span>
              </div>
              <p className="text-gray-400">
                Professional audio transcription powered by cutting-edge AI technology.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#demo" className="text-gray-400 hover:text-white">Try Now</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 VoiceScribe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TranscriptionLanding;
