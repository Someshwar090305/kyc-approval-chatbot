import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CheckCircle, Clock, FileText, Shield, TrendingUp } from 'lucide-react';

const TataCapitalChatbot = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! I'm your AI Loan Assistant from Tata Capital. I can help you get a personal loan approved in minutes. What amount are you looking to borrow?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: 'Sales Agent'
    }
  ]);
  const [input, setInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [loanData, setLoanData] = useState({
    amount: '',
    tenure: '',
    name: '',
    pan: '',
    aadhaar: ''
  });
  const [steps, setSteps] = useState([
  { label: 'Loan Discussion', icon: TrendingUp, status: 'active' },
  { label: 'KYC Verification', icon: Shield, status: 'pending' },
  { label: 'Credit Check', icon: CheckCircle, status: 'pending' },
  { label: 'Sanction Letter', icon: FileText, status: 'pending' }
]);
const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateStepStatus = (stepIndex, status) => {
  setSteps(prevSteps => {
    const newSteps = [...prevSteps];
    newSteps[stepIndex].status = status;
    return newSteps;
  });
};

  const addMessage = (text, type, agent = null) => {
    const newMessage = {
      type,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateAgentResponse = async (userMessage) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    // Step 0: Loan Amount
    if (currentStep === 0 && userMessage.match(/\d+/)) {
      const amount = userMessage.match(/\d+/)[0];
      setLoanData(prev => ({ ...prev, amount }));
      addMessage(`Great! You're looking for ₹${amount}. What tenure would you prefer? (e.g., 12, 24, 36 months)`, 'bot', 'Sales Agent');
      setCurrentStep(1);
    }
    // Step 1: Tenure
    else if (currentStep === 1 && userMessage.match(/\d+/)) {
      const tenure = userMessage.match(/\d+/)[0];
      setLoanData(prev => ({ ...prev, tenure }));
      const emi = Math.round((parseInt(loanData.amount) * 1.1) / parseInt(tenure));
      addMessage(`Perfect! For ₹${loanData.amount} over ${tenure} months at 10.5% interest:\n\n💰 EMI: ₹${emi}/month\n📊 Total Amount: ₹${Math.round(emi * tenure)}\n\nShall we proceed with KYC verification?`, 'bot', 'Sales Agent');
      setCurrentStep(2);
      updateStepStatus(0, 'completed');
    }
    // Step 2: Start KYC
    else if (currentStep === 2 && userMessage.toLowerCase().includes('yes')) {
      updateStepStatus(1, 'active');
      addMessage("Let's verify your identity. Please provide your full name:", 'bot', 'Verification Agent');
      setCurrentStep(3);
    }
    // Step 3: Name
    else if (currentStep === 3 && userMessage.length > 2) {
      setLoanData(prev => ({ ...prev, name: userMessage }));
      addMessage(`Thank you, ${userMessage}. Please enter your PAN number:`, 'bot', 'Verification Agent');
      setCurrentStep(4);
    }
    // Step 4: PAN
    else if (currentStep === 4 && userMessage.length >= 10) {
      setLoanData(prev => ({ ...prev, pan: userMessage.toUpperCase() }));
      addMessage("PAN verified ✓\n\nPlease provide your Aadhaar number:", 'bot', 'Verification Agent');
      setCurrentStep(5);
    }
    // Step 5: Aadhaar
    else if (currentStep === 5 && userMessage.match(/\d{12}/)) {
      setLoanData(prev => ({ ...prev, aadhaar: userMessage }));
      updateStepStatus(1, 'completed');
      updateStepStatus(2, 'active');
      
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsTyping(false);
      
      addMessage("✅ KYC Verification Complete!\n\nFetching your credit score...", 'bot', 'Verification Agent');
      
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsTyping(false);
      
      addMessage("🎯 Credit Score: 750 (Excellent)\n✅ Eligibility: Approved\n\nGenerating your sanction letter...", 'bot', 'Underwriting Agent');
      updateStepStatus(2, 'completed');
      updateStepStatus(3, 'active');
      
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsTyping(false);
      
      addMessage(`🎉 Congratulations ${loanData.name}!\n\nYour loan of ₹${loanData.amount} has been approved!\n\n📄 Sanction Letter Generated\n⏱️ Processing Time: <10 minutes\n💳 Disbursal: 24-48 hours\n\nYour sanction letter has been sent to your registered email. Would you like to proceed with e-signature?`, 'bot', 'Sanction Agent');
      updateStepStatus(3, 'completed');
      setCurrentStep(6);
    }
    else {
      addMessage("I didn't quite catch that. Could you please rephrase?", 'bot');
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    addMessage(input, 'user');
    const userMessage = input;
    setInput('');

    await simulateAgentResponse(userMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {/* Main Container */}
      <div className="flex w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Sidebar - Progress Steps */}
        <div className="w-80 bg-gradient-to-b from-indigo-600 to-indigo-800 p-6 text-white">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-2">Tata Capital</h2>
            <p className="text-indigo-200 text-sm">AI-Powered Loan Assistant</p>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'active' ? 'bg-white text-indigo-600' :
                    'bg-indigo-700'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold ${
                      step.status === 'pending' ? 'text-indigo-300' : 'text-white'
                    }`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-indigo-300 mt-1">
                      {step.status === 'completed' && '✓ Completed'}
                      {step.status === 'active' && '⟳ In Progress'}
                      {step.status === 'pending' && '○ Pending'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-4 bg-indigo-700 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Clock size={16} />
              Key Benefits
            </h3>
            <ul className="text-sm text-indigo-200 space-y-2">
              <li>✓ Instant Approval</li>
              <li>✓ 24/7 Availability</li>
              <li>✓ Paperless Process</li>
              <li>✓ Secure & Compliant</li>
            </ul>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">AI Loan Assistant</h3>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                  Online
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Powered by</p>
              <p className="text-sm font-semibold text-indigo-600">Agentic AI</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'user' ? 'bg-indigo-600' : 'bg-gradient-to-br from-purple-500 to-indigo-600'
                }`}>
                  {msg.type === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
                </div>
                <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-xl`}>
                  {msg.agent && (
                    <span className="text-xs text-indigo-600 font-semibold mb-1">{msg.agent}</span>
                  )}
                  <div className={`px-4 py-3 rounded-2xl ${
                    msg.type === 'user' 
                      ? 'bg-indigo-600 text-white rounded-tr-none' 
                      : 'bg-white text-gray-800 shadow-md rounded-tl-none border border-gray-100'
                  }`}>
                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{msg.timestamp}</span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-md border border-gray-100">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2 flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                />
              </div>
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
              🔒 Secure & RBI Compliant | ISO 27001 Certified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TataCapitalChatbot;