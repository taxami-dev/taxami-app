import React, { useState, useRef, useEffect } from 'react';
import { Send, Calculator, FileText, User, Brain, Database, LogOut, Crown, MessageSquare } from 'lucide-react';

// 🏆 KNOWLEDGE BASE ESTENSIVA (300+ normative)
import { miglioraRispostaAvanzata as miglioraRisposta, ricercaAvanzata as ricercaDiretta } from './normativeEstese.js';

const Taxami = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '', name: '' });
  const [isRegistering, setIsRegistering] = useState(false);
  const [apiStatus, setApiStatus] = useState({ backend: false, ai: false });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 🌐 API BASE - PRODUZIONE READY
  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  
  // 🔍 DEBUG INFO (solo in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.log('🌐 API Base:', API_BASE);
      console.log('🔧 Environment:', process.env.NODE_ENV);
      console.log('📦 Build Mode:', process.env.REACT_APP_ENV || 'development');
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    checkAuthStatus();
    checkApiHealth();
  }, []);

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('taxami_token');
    if (token) {
      try {
        const response = await fetch(`${API_BASE}/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setIsLoggedIn(true);
          setShowLogin(false);
          
          // Messaggio di benvenuto semplice e diretto
          const welcomeMessage = userData.onboarding_completed
            ? `Ciao ${userData.name || 'e benvenuto su Taxami'}! 🎉\n\nSono il tuo consulente fiscale AI con knowledge base di oltre 300 normative italiane integrate.\n\nPosso aiutarti con qualsiasi domanda fiscale: partita IVA, regimi, detrazioni, scadenze e molto altro!\n\nCosa ti serve oggi?`
            : `Benvenuto su Taxami, ${userData.name}! 🚀\n\nHai attivato il trial gratuito di 7 giorni. Sono il tuo consulente fiscale AI con knowledge base completo di normative italiane.\n\nParlami della tua situazione fiscale e ti aiuterò a trovare le soluzioni migliori!\n\nDa dove iniziamo?`;

          setMessages([{
            id: 1,
            type: 'bot',
            content: welcomeMessage,
            timestamp: new Date(),
            confidence: 0.95
          }]);
        } else {
          localStorage.removeItem('taxami_token');
        }
      } catch (error) {
        console.error('Errore verifica auth:', error);
        localStorage.removeItem('taxami_token');
      }
    }
  };

  const checkApiHealth = async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      if (response.ok) {
        const health = await response.json();
        console.log('🔍 Health response:', health);
        setApiStatus({
          backend: true,
          ai: health.services?.openai === 'configured' || health.openai_configured === true
        });
      }
    } catch (error) {
      console.error('❌ Health check error:', error);
      setApiStatus({ backend: false, ai: false });
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const endpoint = isRegistering ? '/register' : '/login';
      const body = isRegistering 
        ? { email: loginForm.email, password: loginForm.password, name: loginForm.name }
        : { email: loginForm.email, password: loginForm.password };

      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('taxami_token', data.token);
        setUser(data.user);
        setIsLoggedIn(true);
        setShowLogin(false);
        
        const welcomeMessage = isRegistering 
          ? `Benvenuto su Taxami, ${data.user.name}! 🚀\n\nHai attivato il trial gratuito di 7 giorni. Sono il tuo consulente fiscale AI con knowledge base completo.\n\nDimmi pure di cosa hai bisogno: partita IVA, regimi fiscali, detrazioni, scadenze... sono qui per aiutarti!`
          : `Bentornato, ${data.user.name}! 👋\n\nSono pronto a rispondere a tutte le tue domande fiscali con il supporto di oltre 300 normative aggiornate.\n\nCosa posso fare per te oggi?`;

        setMessages([{
          id: 1,
          type: 'bot',
          content: welcomeMessage,
          timestamp: new Date(),
          confidence: 0.95
        }]);

        setLoginForm({ email: '', password: '', name: '' });
      } else {
        alert(data.error || 'Errore durante l\'autenticazione');
      }
    } catch (error) {
      console.error('Errore auth:', error);
      alert('Errore di connessione. Riprova più tardi.');
    }
    
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('taxami_token');
    setUser(null);
    setIsLoggedIn(false);
    setShowLogin(true);
    setMessages([]);
  };

  const quickActions = [
    { icon: Calculator, text: "Calcolo tasse", action: "calculate", premium: false },
    { icon: Database, text: "Cerca normative", action: "search", premium: false },
    { icon: FileText, text: "Scadenze fiscali", action: "deadlines", premium: false },
    { icon: Brain, text: "Confronto regimi", action: "compare", premium: true }
  ];

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || !isLoggedIn) return;

    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    try {
      const token = localStorage.getItem('taxami_token');
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: currentInput })
      });

      const data = await response.json();

      if (response.ok) {
        // 🚀 INTEGRAZIONE KNOWLEDGE BASE
        const rispostaArricchita = await miglioraRisposta(currentInput, data.response);
        
        const botResponse = {
          id: messages.length + 2,
          type: 'bot',
          content: rispostaArricchita,
          timestamp: new Date(),
          confidence: data.confidence,
          suggestions: data.suggestions || ['📄 Genera report PDF', '🔍 Cerca altre normative', '📊 Confronto dettagliato', '💡 Ottimizzazioni fiscali'],
          cost: data.cost,
          tokens_used: data.tokens_used
        };
        
        setMessages(prev => [...prev, botResponse]);

        if (data.profile_updated) {
          checkAuthStatus();
        }
      } else {
        let errorContent = `Mi dispiace, si è verificato un errore: ${data.error}\n\nRiprova o contatta il supporto se il problema persiste. 🔧`;
        
        // FALLBACK CON KNOWLEDGE BASE
        if (!apiStatus.ai && currentInput) {
          const normativeLocal = ricercaDiretta(currentInput);
          if (normativeLocal.length > 0) {
            errorContent = `🔄 AI temporaneamente non disponibile, ma ho trovato queste informazioni per te:\n\n`;
            normativeLocal.slice(0, 2).forEach(norm => {
              errorContent += `**${norm.titolo}**\n${norm.contenuto}\n*Fonte: ${norm.fonte}*\n\n`;
            });
            errorContent += `💡 Appena l'AI torna online, avremo conversazioni ancora più dettagliate!`;
          }
        }
        
        const errorMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: errorContent,
          timestamp: new Date(),
          confidence: 0.5
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Errore invio messaggio:', error);
      
      // FALLBACK INTELLIGENTE
      let fallbackContent = "Errore di connessione al server. Riprova più tardi. 🌐";
      
      if (currentInput) {
        const normativeOffline = ricercaDiretta(currentInput);
        if (normativeOffline.length > 0) {
          fallbackContent = `🔄 Connessione assente, ma ho trovato queste informazioni offline:\n\n`;
          normativeOffline.slice(0, 2).forEach(norm => {
            fallbackContent += `**${norm.titolo}**\n${norm.contenuto}\n*Fonte: ${norm.fonte}*\n\n`;
          });
          fallbackContent += `⚡ Appena la connessione torna, avremo chat complete!`;
        }
      }
      
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: fallbackContent,
        timestamp: new Date(),
        confidence: 0.3
      };
      setMessages(prev => [...prev, errorMessage]);
    }

    setIsTyping(false);
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      calculate: "Fammi un calcolo delle mie tasse ottimizzato",
      search: "Cercami le normative più importanti per la mia situazione",
      deadlines: "Quali sono le scadenze fiscali più importanti del 2024?", 
      compare: "Mostrami un confronto dettagliato tra regime forfettario e ordinario"
    };

    setInputMessage(actionMessages[action]);
  };

  const handleSuggestion = (suggestion) => {
    if (suggestion === '📄 Genera report PDF') {
      handleGeneratePDF();
      return;
    }
    if (suggestion === '📊 Confronto dettagliato') {
      setInputMessage('Mostrami un confronto completo tra tutti i regimi fiscali disponibili');
      return;
    }
    if (suggestion === '🔍 Cerca altre normative') {
      setInputMessage('Mostrami altre normative correlate alla mia domanda');
      return;
    }
    if (suggestion === '💡 Ottimizzazioni fiscali') {
      setInputMessage('Quali sono le migliori strategie per ottimizzare la mia situazione fiscale?');
      return;
    }
    
    setInputMessage(suggestion);
  };

  const handleGeneratePDF = async () => {
    const conversationData = {
      utente: user?.name || 'Utente',
      data: new Date().toLocaleDateString('it-IT'),
      conversazione: messages.map(msg => ({
        tipo: msg.type === 'user' ? 'Tu' : 'Taxami',
        messaggio: msg.content,
        orario: msg.timestamp.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
      }))
    };

    const htmlContent = generatePrintHTML(conversationData);
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    const exportMessage = {
      id: messages.length + 1,
      type: 'bot',
      content: `📄 **Report Conversazione Generato!**\n\nHo creato una versione stampabile della nostra conversazione con:\n\n✅ Tutte le domande e risposte\n✅ Normative ufficiali citate\n✅ Fonti e riferimenti\n✅ Formato professionale\n\n🖨️ **Usa Ctrl+P per stampare o salvare come PDF**\n\n💡 *Il browser può salvare direttamente come PDF dalla finestra di stampa!*`,
      timestamp: new Date(),
      confidence: 0.95,
      suggestions: ['🔍 Cerca altre normative', '💡 Ottimizzazioni fiscali', '📊 Confronto dettagliato']
    };
    
    setMessages(prev => [...prev, exportMessage]);
  };

  const generatePrintHTML = (data) => {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Taxami - Consulenza Fiscale AI - ${data.utente}</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
        .header { border-bottom: 3px solid #8B5CF6; padding-bottom: 15px; margin-bottom: 20px; }
        .logo { font-size: 28px; font-weight: bold; color: #8B5CF6; }
        .subtitle { color: #666; margin-top: 5px; }
        .conversation { margin-top: 20px; }
        .message { margin: 15px 0; padding: 12px; border-radius: 8px; }
        .user-message { background: #8B5CF6; color: white; text-align: right; }
        .bot-message { background: #f1f5f9; border-left: 4px solid #8B5CF6; }
        .timestamp { font-size: 11px; opacity: 0.7; margin-top: 5px; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; border-top: 1px solid #eee; padding-top: 15px; }
        @media print { body { margin: 0; } }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo">🧠 TAXAMI</div>
        <div class="subtitle">Consulenza Fiscale AI con Knowledge Base Normativo - ${data.data}</div>
    </div>
    
    <div class="conversation">
        <h3>💬 Consulenza Fiscale per ${data.utente}</h3>
        ${data.conversazione.map(msg => `
            <div class="message ${msg.tipo === 'Tu' ? 'user-message' : 'bot-message'}">
                <strong>${msg.tipo}:</strong><br>
                ${msg.messaggio.replace(/\n/g, '<br>')}
                <div class="timestamp">${msg.orario}</div>
            </div>
        `).join('')}
    </div>
    
    <div class="footer">
        <p><strong>📞 Taxami</strong> - Consulente fiscale AI con knowledge base di 300+ normative italiane</p>
        <p>Report generato il ${data.data} • Consulenza basata su normative aggiornate 2024</p>
        <p>Per consulenze specifiche e personalizzate, considera sempre un commercialista qualificato</p>
    </div>
</body>
</html>`;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 🎨 ENVIRONMENT BANNER (solo in development)
  const EnvBanner = () => {
    if (process.env.NODE_ENV === 'production') return null;
    
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-2 text-sm">
        🔧 <strong>Development Mode</strong> - API: {API_BASE}
      </div>
    );
  };

  // Login/Register Form
  if (showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
        <EnvBanner />
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-full w-16 h-16 mx-auto mb-4">
              <Brain className="h-8 w-8 text-white mx-auto mt-1" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Taxami
            </h1>
            <p className="text-gray-600">Il tuo consulente fiscale AI</p>
            <p className="text-xs text-purple-600 mt-1">✨ Con Knowledge Base di 300+ normative!</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isRegistering && (
              <input
                type="text"
                placeholder="Nome completo"
                value={loginForm.name}
                onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            )}
            
            <input
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
            
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium disabled:opacity-50"
            >
              {loading ? 'Caricamento...' : (isRegistering ? 'Registrati (Trial 7 giorni)' : 'Accedi')}
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-purple-600 hover:text-purple-800 text-sm"
            >
              {isRegistering ? 'Hai già un account? Accedi' : 'Non hai un account? Registrati'}
            </button>
          </div>

          {/* Status API */}
          <div className="mt-6 p-3 bg-gray-100 rounded-lg">
            <div className="flex items-center justify-between text-xs">
              <span>Backend:</span>
              <span className={`px-2 py-1 rounded ${apiStatus.backend ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {apiStatus.backend ? 'Online' : 'Offline'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span>AI Service:</span>
              <span className={`px-2 py-1 rounded ${apiStatus.ai ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                {apiStatus.ai ? 'Attivo' : 'Base Mode'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span>📚 Knowledge Base:</span>
              <span className="px-2 py-1 rounded bg-blue-100 text-blue-800">300+ Normative</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main App - INTERFACCIA PULITA SENZA SIDEBAR
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <EnvBanner />
      
      {/* Header */}
      <div className="bg-white shadow-lg border-b-4 border-purple-500">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-3 rounded-full">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Taxami
                </h1>
                <p className="text-gray-600">
                  Ciao {user?.name || 'Utente'}! 
                  <span className="text-xs text-purple-600 ml-2">✨ 300+ Normative Fiscali</span>
                </p>
              </div>
            </div>
            
            {/* Status Dashboard Compatto */}
            <div className="flex items-center space-x-2">
              {/* Status Indicators */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <div className={`w-2 h-2 rounded-full ${apiStatus.backend ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <span className="text-xs">{apiStatus.backend ? 'Online' : 'Offline'}</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-2 bg-blue-100 rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <span className="text-xs">KB Attivo</span>
              </div>
              
              {/* Trial Badge */}
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full px-4 py-2">
                <Crown className="h-4 w-4" />
                <span className="text-sm font-medium">Trial • {user?.subscription_days_left || 7}gg</span>
              </div>
              
              {/* Logout */}
              <button
                onClick={handleLogout}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                title="Logout"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container - SINGLE COLUMN LAYOUT */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          
          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.action)}
                  className="relative bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 rounded-xl p-3 text-white text-center group"
                >
                  {action.premium && (
                    <Crown className="absolute top-1 right-1 h-3 w-3 text-yellow-300" />
                  )}
                  <action.icon className="h-6 w-6 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{action.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div key={message.id}>
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-3xl ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start space-x-3`}>
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      message.type === 'user' 
                        ? 'bg-purple-500 ml-3' 
                        : 'bg-gradient-to-r from-purple-400 to-blue-500 mr-3'
                    }`}>
                      {message.type === 'user' ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Brain className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-purple-500 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-800 rounded-bl-md'
                    }`}>
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className={`text-xs ${
                          message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString('it-IT', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                        {message.confidence && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            AI: {Math.round(message.confidence * 100)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* AI Suggestions */}
                {message.suggestions && message.type === 'bot' && (
                  <div className="ml-16 mt-3 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestion(suggestion)}
                        className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-full transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center mr-3">
                    <Brain className="h-5 w-5 text-white animate-pulse" />
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">Taxami sta analizzando...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t bg-gray-50 p-4">
            <div className="flex space-x-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Chiedi qualsiasi cosa sulla tua situazione fiscale... (ora con 300+ normative!)"
                  className="w-full border border-gray-300 rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <MessageSquare className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === '' || !isLoggedIn}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>🔒 Taxami utilizza AI avanzata con Knowledge Base di 300+ normative fiscali italiane • Dati protetti GDPR</p>
          <p className="mt-1">Per consulenze legali specifiche, contatta sempre un commercialista qualificato</p>
        </div>
      </div>
    </div>
  );
};

export default Taxami;