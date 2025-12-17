import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, CheckCircle, Clock, FileText, Shield, TrendingUp, Download, AlertCircle, Activity, Users, DollarSign, Zap } from 'lucide-react';

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
  const [activeAgent, setActiveAgent] = useState('Sales Agent');
  const [loanData, setLoanData] = useState({
    amount: '',
    tenure: '',
    name: '',
    pan: '',
    aadhaar: '',
    creditScore: 0,
    status: 'pending'
  });
  const [steps, setSteps] = useState([
    { label: 'Loan Discussion', icon: TrendingUp, status: 'active' },
    { label: 'KYC Verification', icon: Shield, status: 'pending' },
    { label: 'Credit Check', icon: CheckCircle, status: 'pending' },
    { label: 'Sanction Letter', icon: FileText, status: 'pending' }
  ]);
  const [showPdfButton, setShowPdfButton] = useState(false);
  const [metrics, setMetrics] = useState({
    loansProcessed: 1247,
    avgProcessingTime: '8.5 min',
    conversionRate: '78%',
    activeUsers: 34
  });
  const [showConsole, setShowConsole] = useState(true);
  const [agentLogs, setAgentLogs] = useState([
    { time: '14:20:15', agent: 'System', action: 'Master Agent initialized', status: 'success' }
  ]);
  const messagesEndRef = useRef(null);
  const consoleEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollConsoleToBottom = () => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addAgentLog = (agent, action, status = 'info') => {
    const newLog = {
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      agent,
      action,
      status
    };
    setAgentLogs(prev => [...prev, newLog]);
    setTimeout(scrollConsoleToBottom, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate live metrics
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeUsers: Math.floor(Math.random() * 20) + 25
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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

  const generatePDF = () => {
    const { name, amount, tenure, creditScore, pan } = loanData;
    const emi = Math.round((parseInt(amount) * 1.1) / parseInt(tenure));
    const today = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
    .header { text-align: center; border-bottom: 3px solid #4F46E5; padding-bottom: 20px; margin-bottom: 30px; }
    .header h1 { color: #4F46E5; margin: 0; }
    .header p { color: #666; margin: 5px 0; }
    .content { margin: 20px 0; }
    .loan-details { background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #ddd; }
    .detail-label { font-weight: bold; color: #374151; }
    .detail-value { color: #1F2937; }
    .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #E5E7EB; font-size: 12px; color: #6B7280; }
    .approved { color: #059669; font-size: 24px; font-weight: bold; text-align: center; margin: 20px 0; }
    .signature { margin-top: 60px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>TATA CAPITAL</h1>
    <p>Financial Services Limited</p>
    <p>11th Floor, Tower A, Peninsula Business Park, Ganpatrao Kadam Marg, Lower Parel, Mumbai - 400013</p>
  </div>
  
  <h2 style="color: #4F46E5;">LOAN SANCTION LETTER</h2>
  <p><strong>Date:</strong> ${today}</p>
  <p><strong>Sanction ID:</strong> TC${Date.now().toString().slice(-8)}</p>
  
  <div class="approved">✓ LOAN APPROVED</div>
  
  <p>Dear <strong>${name}</strong>,</p>
  
  <p>We are pleased to inform you that your personal loan application has been <strong>approved</strong> by Tata Capital Financial Services Limited.</p>
  
  <div class="loan-details">
    <h3 style="margin-top: 0; color: #4F46E5;">Loan Details</h3>
    <div class="detail-row">
      <span class="detail-label">Applicant Name:</span>
      <span class="detail-value">${name}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">PAN Number:</span>
      <span class="detail-value">${pan}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Sanctioned Amount:</span>
      <span class="detail-value">₹${parseInt(amount).toLocaleString('en-IN')}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Loan Tenure:</span>
      <span class="detail-value">${tenure} months</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Interest Rate:</span>
      <span class="detail-value">10.5% per annum</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Monthly EMI:</span>
      <span class="detail-value">₹${emi.toLocaleString('en-IN')}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Total Payable:</span>
      <span class="detail-value">₹${(emi * tenure).toLocaleString('en-IN')}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Credit Score:</span>
      <span class="detail-value">${creditScore}</span>
    </div>
    <div class="detail-row">
      <span class="detail-label">Processing Time:</span>
      <span class="detail-value">&lt;10 minutes</span>
    </div>
  </div>
  
  <h3>Terms & Conditions</h3>
  <ul>
    <li>This sanction is valid for 30 days from the date of issue</li>
    <li>Loan disbursal subject to final documentation and verification</li>
    <li>Pre-payment charges: 4% on outstanding principal (first year), 3% thereafter</li>
    <li>Processing fee: 2.5% of loan amount + GST</li>
    <li>Late payment charges: 2% per month on overdue amount</li>
  </ul>
  
  <p>Please proceed with e-signature and documentation to complete the disbursal process. Funds will be credited to your registered bank account within 24-48 hours.</p>
  
  <div class="signature">
    <p><strong>Authorized Signatory</strong></p>
    <p>Tata Capital Financial Services Ltd.</p>
    <p style="font-style: italic; color: #6B7280;">Digitally processed via AI-powered loan system</p>
  </div>
  
  <div class="footer">
    <p><strong>Important:</strong> This is a system-generated document processed by our AI-powered loan assistant. For queries, contact us at loans@tatacapital.com or call 1800-209-9090.</p>
    <p>© ${new Date().getFullYear()} Tata Capital Financial Services Limited. All rights reserved. | CIN: U65990MH1991PLC060670</p>
  </div>
</body>
</html>`;

    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Tata_Capital_Sanction_Letter_${name.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const simulateAgentResponse = async (userMessage) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsTyping(false);

    // Step 0: Loan Amount
    if (currentStep === 0 && userMessage.match(/\d+/)) {
      const amount = userMessage.match(/\d+/)[0];
      addAgentLog('Master Agent', '📥 Received loan inquiry request', 'info');
      addAgentLog('Master Agent', `💰 Loan amount detected: ₹${parseInt(amount).toLocaleString('en-IN')}`, 'info');
      addAgentLog('Master Agent', '🔀 Routing to Sales Agent for qualification', 'routing');
      setLoanData(prev => ({ ...prev, amount }));
      setActiveAgent('Sales Agent');
      addAgentLog('Sales Agent', '✅ Agent activated - Qualifying customer', 'success');
      addAgentLog('Sales Agent', '📋 Requesting tenure information', 'info');
      addMessage(`Great! You're looking for ₹${parseInt(amount).toLocaleString('en-IN')}. What tenure would you prefer? (e.g., 12, 24, 36 months)`, 'bot', 'Sales Agent');
      setCurrentStep(1);
    }
    // Step 1: Tenure
    else if (currentStep === 1 && userMessage.match(/\d+/)) {
      const tenure = userMessage.match(/\d+/)[0];
      setLoanData(prev => ({ ...prev, tenure }));
      const emi = Math.round((parseInt(loanData.amount) * 1.1) / parseInt(tenure));
      addAgentLog('Sales Agent', `📅 Tenure selected: ${tenure} months`, 'info');
      addAgentLog('Sales Agent', `🧮 EMI calculated: ₹${emi.toLocaleString('en-IN')}/month`, 'success');
      addAgentLog('Sales Agent', '✅ Qualification complete - Customer ready for KYC', 'success');
      addAgentLog('Master Agent', '🔀 Preparing handoff to Verification Agent', 'routing');
      setActiveAgent('Sales Agent');
      addMessage(`Perfect! For ₹${parseInt(loanData.amount).toLocaleString('en-IN')} over ${tenure} months at 10.5% interest:\n\n💰 EMI: ₹${emi.toLocaleString('en-IN')}/month\n📊 Total Amount: ₹${(emi * tenure).toLocaleString('en-IN')}\n\nShall we proceed with KYC verification?`, 'bot', 'Sales Agent');
      setCurrentStep(2);
      updateStepStatus(0, 'completed');
    }
    // Step 2: Start KYC
    else if (currentStep === 2 && userMessage.toLowerCase().includes('yes')) {
      updateStepStatus(1, 'active');
      addAgentLog('Master Agent', '🔀 Routing to Verification Agent', 'routing');
      setActiveAgent('Verification Agent');
      addAgentLog('Verification Agent', '✅ Agent activated - Starting KYC workflow', 'success');
      addAgentLog('Verification Agent', '📝 Initiating identity verification process', 'info');
      addMessage("Let's verify your identity. Please provide your full name:", 'bot', 'Verification Agent');
      setCurrentStep(3);
    }
    // Step 3: Name
    else if (currentStep === 3 && userMessage.length > 2) {
      setLoanData(prev => ({ ...prev, name: userMessage }));
      addAgentLog('Verification Agent', `👤 Name captured: ${userMessage}`, 'info');
      addAgentLog('Verification Agent', '🔍 Requesting PAN for verification', 'info');
      setActiveAgent('Verification Agent');
      addMessage(`Thank you, ${userMessage}. Please enter your PAN number:`, 'bot', 'Verification Agent');
      setCurrentStep(4);
    }
    // Step 4: PAN
    else if (currentStep === 4 && userMessage.length >= 10) {
      setLoanData(prev => ({ ...prev, pan: userMessage.toUpperCase() }));
      addAgentLog('Verification Agent', `🔐 PAN received: ${userMessage.toUpperCase()}`, 'info');
      addAgentLog('Verification Agent', '🔍 Validating PAN with Income Tax database...', 'processing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      addAgentLog('Verification Agent', '✅ PAN validated successfully', 'success');
      addAgentLog('Verification Agent', '📝 Requesting Aadhaar number', 'info');
      setActiveAgent('Verification Agent');
      addMessage("✅ PAN verified successfully!\n\nPlease provide your Aadhaar number (12 digits):", 'bot', 'Verification Agent');
      setCurrentStep(5);
    }
    // Step 5: Aadhaar & Credit Check
    else if (currentStep === 5 && userMessage.match(/\d{12}/)) {
      setLoanData(prev => ({ ...prev, aadhaar: userMessage }));
      addAgentLog('Verification Agent', `🔐 Aadhaar received: ****${userMessage.slice(-4)}`, 'info');
      addAgentLog('Verification Agent', '🔍 Validating Aadhaar with UIDAI...', 'processing');
      updateStepStatus(1, 'completed');
      updateStepStatus(2, 'active');
      setActiveAgent('Verification Agent');
      
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      addAgentLog('Verification Agent', '✅ Aadhaar validated successfully', 'success');
      addAgentLog('Verification Agent', '🔗 Checking PAN-Aadhaar linkage...', 'processing');
      await new Promise(resolve => setTimeout(resolve, 1000));
      addAgentLog('Verification Agent', '✅ PAN-Aadhaar linkage confirmed', 'success');
      addAgentLog('Verification Agent', '✅ KYC verification complete', 'success');
      setIsTyping(false);
      
      addMessage("✅ KYC Verification Complete!\n✅ Aadhaar validated\n✅ PAN-Aadhaar linked verified\n\n🔍 Fetching credit score from CIBIL...", 'bot', 'Verification Agent');
      
      addAgentLog('Master Agent', '🔀 KYC complete - Routing to Underwriting Agent', 'routing');
      setActiveAgent('Underwriting Agent');
      addAgentLog('Underwriting Agent', '✅ Agent activated - Starting credit assessment', 'success');
      addAgentLog('Underwriting Agent', '📊 Fetching CIBIL credit score...', 'processing');
      
      setIsTyping(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsTyping(false);
      
      // Simulate credit score (random between 650-800)
      const creditScore = Math.floor(Math.random() * 150) + 650;
      setLoanData(prev => ({ ...prev, creditScore }));
      
      addAgentLog('Underwriting Agent', `📊 CIBIL score retrieved: ${creditScore}`, 'success');
      addAgentLog('Underwriting Agent', '🔍 Analyzing credit history...', 'processing');
      await new Promise(resolve => setTimeout(resolve, 800));
      addAgentLog('Underwriting Agent', '🔍 Calculating debt-to-income ratio...', 'processing');
      await new Promise(resolve => setTimeout(resolve, 800));
      addAgentLog('Underwriting Agent', '🔍 Evaluating repayment capacity...', 'processing');
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (creditScore >= 700) {
        // APPROVED SCENARIO
        addAgentLog('Underwriting Agent', `✅ Credit score ${creditScore} meets threshold (≥700)`, 'success');
        addAgentLog('Underwriting Agent', '✅ All eligibility criteria satisfied', 'success');
        addAgentLog('Underwriting Agent', '🎯 Decision: LOAN APPROVED', 'success');
        addAgentLog('Master Agent', '🔀 Approval confirmed - Routing to Sanction Agent', 'routing');
        
        addMessage(`🎯 Credit Assessment Complete!\n\n📊 Credit Score: ${creditScore} (${creditScore >= 750 ? 'Excellent' : 'Good'})\n✅ Debt-to-Income Ratio: Healthy\n✅ Credit History: Strong\n✅ Eligibility: APPROVED\n\n⚡ Generating sanction letter...`, 'bot', 'Underwriting Agent');
        updateStepStatus(2, 'completed');
        updateStepStatus(3, 'active');
        setActiveAgent('Sanction Agent');
        
        addAgentLog('Sanction Agent', '✅ Agent activated - Generating sanction letter', 'success');
        addAgentLog('Sanction Agent', '📄 Compiling loan terms and conditions...', 'processing');
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        addAgentLog('Sanction Agent', '🔐 Applying digital signature...', 'processing');
        await new Promise(resolve => setTimeout(resolve, 500));
        addAgentLog('Sanction Agent', '🔒 Encrypting document with 256-bit encryption...', 'processing');
        await new Promise(resolve => setTimeout(resolve, 500));
        addAgentLog('Sanction Agent', '✅ Sanction letter generated successfully', 'success');
        addAgentLog('Sanction Agent', '📤 Ready for customer download', 'success');
        setIsTyping(false);
        
        addMessage(`🎉 Congratulations ${loanData.name}!\n\nYour loan of ₹${parseInt(loanData.amount).toLocaleString('en-IN')} has been APPROVED!\n\n📄 Sanction Letter Generated\n⏱️ Processing Time: <10 minutes\n💳 Disbursal Timeline: 24-48 hours\n🔐 Digitally Signed & Encrypted\n\nYour sanction letter is ready for download. Click the button below to save your official approval document.`, 'bot', 'Sanction Agent');
        updateStepStatus(3, 'completed');
        setShowPdfButton(true);
        setLoanData(prev => ({ ...prev, status: 'approved' }));
        setCurrentStep(6);
        
        addAgentLog('Master Agent', '🎉 Workflow complete - Loan approved and sanctioned', 'success');
        addAgentLog('System', '📊 Updating metrics dashboard...', 'info');
        
        // Update metrics
        setMetrics(prev => ({
          loansProcessed: prev.loansProcessed + 1,
          avgProcessingTime: '8.5 min',
          conversionRate: '78%',
          activeUsers: prev.activeUsers
        }));
      } else {
        // REJECTED SCENARIO
        addAgentLog('Underwriting Agent', `⚠️ Credit score ${creditScore} below threshold (<700)`, 'warning');
        addAgentLog('Underwriting Agent', '❌ Eligibility criteria not met', 'error');
        addAgentLog('Underwriting Agent', '🎯 Decision: LOAN DECLINED', 'error');
        addAgentLog('Master Agent', '📋 Generating rejection notice with recommendations', 'info');
        
        addMessage(`📊 Credit Assessment Complete\n\n⚠️ Credit Score: ${creditScore} (Below Threshold)\n❌ Eligibility Status: DECLINED\n\nWe're sorry, but we cannot approve your loan application at this time due to:\n• Credit score below minimum requirement (700)\n• Recent credit inquiries detected\n\n💡 Recommendations:\n1. Improve credit score over next 3-6 months\n2. Clear existing dues\n3. Consider a co-applicant with better credit\n\nWould you like to:\n→ Speak with a loan officer for alternatives\n→ Apply for a smaller loan amount\n→ Get personalized credit improvement tips`, 'bot', 'Underwriting Agent');
        updateStepStatus(2, 'completed');
        updateStepStatus(3, 'pending');
        setLoanData(prev => ({ ...prev, status: 'rejected' }));
        setCurrentStep(6);
        addAgentLog('Master Agent', '✅ Workflow complete - Application processed', 'info');
      }
    }
    else {
      addAgentLog('Master Agent', '⚠️ Invalid input detected', 'warning');
      addMessage("I didn't quite catch that. Could you please rephrase or provide the requested information?", 'bot');
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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 p-4 overflow-hidden">
      {/* Main Container */}
      <div className="flex w-full h-full max-w-7xl mx-auto gap-4">
        
        {/* Agent Console - NEW */}
        {showConsole && (
          <div className="w-96 bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 flex items-center justify-between">
              <div>
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Activity size={20} className="animate-pulse" />
                  Agent Orchestration Console
                </h3>
                <p className="text-indigo-200 text-xs mt-1">Real-time AI Decision Flow</p>
              </div>
              <button
                onClick={() => setShowConsole(false)}
                className="text-white hover:text-indigo-200 text-xl"
              >
                ×
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2 font-mono text-xs">
              {agentLogs.map((log, index) => (
                <div key={index} className={`p-2 rounded border-l-4 ${
                  log.status === 'success' ? 'bg-green-900/30 border-green-500 text-green-300' :
                  log.status === 'error' ? 'bg-red-900/30 border-red-500 text-red-300' :
                  log.status === 'warning' ? 'bg-yellow-900/30 border-yellow-500 text-yellow-300' :
                  log.status === 'processing' ? 'bg-blue-900/30 border-blue-500 text-blue-300' :
                  log.status === 'routing' ? 'bg-purple-900/30 border-purple-500 text-purple-300' :
                  'bg-gray-800 border-gray-600 text-gray-300'
                } animate-fadeIn`}>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500 shrink-0">{log.time}</span>
                    <div className="flex-1">
                      <span className="font-semibold">[{log.agent}]</span>
                      <p className="mt-1">{log.action}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>
            
            <div className="bg-gray-800 p-3 border-t border-gray-700">
              <div className="flex items-center gap-2 text-green-400 text-xs">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>System Active • Agentic AI Enabled</span>
              </div>
            </div>
          </div>
        )}
        
        {/* Show Console Button (when hidden) */}
        {!showConsole && (
          <button
            onClick={() => setShowConsole(true)}
            className="fixed left-4 top-1/2 -translate-y-1/2 bg-gradient-to-b from-purple-600 to-indigo-600 text-white px-3 py-4 rounded-r-xl shadow-lg hover:shadow-xl transition-all z-10 flex flex-col items-center gap-2"
          >
            <Activity size={16} />
            <span className="text-xs font-semibold writing-mode-vertical transform rotate-180">Console</span>
          </button>
        )}
        
      <div className="flex flex-1 bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Sidebar */}
        <div className="w-80 bg-gradient-to-b from-indigo-600 to-indigo-800 p-6 text-white flex flex-col overflow-y-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">Tata Capital</h2>
            <p className="text-indigo-200 text-sm">AI-Powered Loan Assistant</p>
          </div>

          {/* Active Agent Indicator */}
          <div className="mb-6 p-4 bg-indigo-700 rounded-lg border-2 border-indigo-400">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={16} className="animate-pulse" />
              <span className="text-xs font-semibold">Currently Active</span>
            </div>
            <p className="font-bold text-lg">{activeAgent}</p>
            <div className="flex gap-1 mt-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="space-y-5 flex-1">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className={`p-3 rounded-full transition-all duration-500 ${
                    step.status === 'completed' ? 'bg-green-500 scale-110' :
                    step.status === 'active' ? 'bg-white text-indigo-600 animate-pulse' :
                    'bg-indigo-700'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className={`font-semibold transition-all ${
                      step.status === 'pending' ? 'text-indigo-300' : 'text-white'
                    }`}>
                      {step.label}
                    </p>
                    <p className="text-xs text-indigo-300 mt-1">
                      {step.status === 'completed' && '✓ Completed'}
                      {step.status === 'active' && '⟳ Processing...'}
                      {step.status === 'pending' && '○ Pending'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Live Metrics Dashboard */}
          <div className="mt-6 space-y-3">
            <h3 className="font-semibold text-sm mb-3 flex items-center gap-2 border-t border-indigo-500 pt-4">
              <Zap size={14} />
              Live Metrics
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-indigo-700 p-3 rounded-lg">
                <div className="flex items-center gap-1 mb-1">
                  <FileText size={12} />
                  <span className="text-xs text-indigo-300">Processed</span>
                </div>
                <p className="font-bold text-lg">{metrics.loansProcessed}</p>
              </div>
              <div className="bg-indigo-700 p-3 rounded-lg">
                <div className="flex items-center gap-1 mb-1">
                  <Clock size={12} />
                  <span className="text-xs text-indigo-300">Avg Time</span>
                </div>
                <p className="font-bold text-lg">{metrics.avgProcessingTime}</p>
              </div>
              <div className="bg-indigo-700 p-3 rounded-lg">
                <div className="flex items-center gap-1 mb-1">
                  <TrendingUp size={12} />
                  <span className="text-xs text-indigo-300">Conv. Rate</span>
                </div>
                <p className="font-bold text-lg">{metrics.conversionRate}</p>
              </div>
              <div className="bg-indigo-700 p-3 rounded-lg">
                <div className="flex items-center gap-1 mb-1">
                  <Users size={12} />
                  <span className="text-xs text-indigo-300">Active Now</span>
                </div>
                <p className="font-bold text-lg animate-pulse">{metrics.activeUsers}</p>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mt-4 p-4 bg-indigo-700 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm">
              <CheckCircle size={14} />
              Key Benefits
            </h3>
            <ul className="text-xs text-indigo-200 space-y-1.5">
              <li>✓ Instant Approval</li>
              <li>✓ 24/7 Availability</li>
              <li>✓ Paperless Process</li>
              <li>✓ RBI Compliant</li>
            </ul>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <Bot className="text-white" size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">AI Loan Assistant</h3>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span>
                  Online • Processing with AI
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Powered by</p>
              <p className="text-sm font-semibold text-indigo-600">Agentic AI + LangGraph</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 ${msg.type === 'user' ? 'flex-row-reverse' : ''} animate-fadeIn`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.type === 'user' ? 'bg-indigo-600' : 'bg-gradient-to-br from-purple-500 to-indigo-600'
                }`}>
                  {msg.type === 'user' ? <User size={18} className="text-white" /> : <Bot size={18} className="text-white" />}
                </div>
                <div className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'} max-w-xl`}>
                  {msg.agent && (
                    <span className="text-xs text-indigo-600 font-semibold mb-1 flex items-center gap-1">
                      <Activity size={12} />
                      {msg.agent}
                    </span>
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
              <div className="flex gap-3 animate-fadeIn">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-md border border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">{activeAgent} is thinking...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Download PDF Button */}
            {showPdfButton && (
              <div className="flex justify-center animate-fadeIn">
                <button
                  onClick={generatePDF}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Download size={20} />
                  <span className="font-semibold">Download Sanction Letter</span>
                </button>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-3 flex items-center">
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
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Shield size={12} className="text-green-600" />
                RBI Compliant
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <CheckCircle size={12} className="text-green-600" />
                ISO 27001 Certified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <AlertCircle size={12} className="text-blue-600" />
                256-bit Encryption
              </span>
            </div>
          </div>
        </div>
      </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TataCapitalChatbot;