// Simulated Data
const data = {
    bedAvailability: 50,
    medicines: ["Paracetamol", "Aspirin", "Amoxicillin"],
    bloodDonation: { "A+": 10, "B+": 8, "O+": 15, "AB+": 5 }
  };
  
  // Language Toggle (English and Hindi)
  let currentLanguage = "en";
  
  const translations = {
    en: {
      dashboard: "Dashboard",
      buyMedicines: "Buy Medicines",
      checkBed: "Check Bed Availability",
      connectDoctor: "Chat with Doctor",
      aiAssistant: "AI Assistant",
    },
    hi: {
      dashboard: "डैशबोर्ड",
      buyMedicines: "दवाइयाँ खरीदें",
      checkBed: "बेड की उपलब्धता जांचें",
      connectDoctor: "डॉक्टर से चैट करें",
      aiAssistant: "AI सहायक",
    }
  };
  
  function toggleLanguage() {
    currentLanguage = currentLanguage === "en" ? "hi" : "en";
    document.getElementById("language-toggle").textContent = currentLanguage === "en" ? "EN / हिंदी" : "EN / हिंदी";
  }
  
  // Functions to Handle Dashboard Actions
  function checkBedAvailability() {
    alert(`Beds available: ${data.bedAvailability}`);
  }
  
  function buyMedicines() {
    alert('Available Medicines: ' + data.medicines.join(", "));
  }
  
  function openAIChat() {
    const symptoms = prompt("Describe your symptoms:");
    alert(`AI suggests you may have a common cold. Please consult a doctor.`);
  }
  
  function connectDoctor() {
    alert("You are connected to a doctor. Please wait for a response.");
  }
  
  // Voice Assistant
  function startVoiceAssistant() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.start();
  
    recognition.onresult = function(event) {
      const command = event.results[0][0].transcript;
      alert(`You said: ${command}`);
    };
  }
  