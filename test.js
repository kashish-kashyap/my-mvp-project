// Added for Gemini API
import { GoogleGenerativeAI } from "@google/generative-ai";

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const loginBtn = document.getElementById("loginBtn");
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");
  const showSignup = document.getElementById("showSignup");
  const closeButtons = document.querySelectorAll(".close");
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll(
    ".nav-links button:not(#loginBtn)"
  );

  // Hospital data
  const hospitals = [
    {
      name: "City General Hospital",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "Salt Lake",
      phone: "+91 234 567 8901",
    },
    {
      name: "Sunshine Medical Center",
      image:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "Bidhannagar, North 24 Parganas",
      phone: "+91 345 678 9012",
    },
    {
      name: "Green Valley Clinic",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
      address: "Imphal, Manipur",
      phone: "+91 456 789 0123",
    },
  ];

  //Added for Gemini API
  //IMPORTANT: Replace with your actual API
  const GEMINI_API_KEY = "AIzaSyDVLxgMq4-hpFMSFB8DCbTeqYwpRSjVHOg"; // <-- REPLACE THIS
  let genAI;
  let model;

  if (GEMINI_API_KEY && GEMINI_API_KEY !== "YOUR_GEMINI_API_KEY") {
    try {
      genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
      // Using a simpler model appropriate for quick chat
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
      console.log("Gemini AI Initialized (minimal).");
    } catch (error) {
      console.error("Failed to initialize Gemini AI:", error);
      genAI = null; // Indicate failure
    }
  } else {
    console.warn(
      "Gemini API Key not provided or is placeholder. AI Chatbot may not function."
    );
    genAI = null;
  }

  // Initialize the page
  function init() {
    // Load home page by default
    showPage("homePage");

    // Populate hospitals
    renderHospitals();

    // Set up event listeners
    setupEventListeners();
  }

  // Render hospitals on home page
  function renderHospitals() {
    const hospitalsGrid = document.querySelector(".hospitals-grid");
    hospitalsGrid.innerHTML = "";

    hospitals.forEach((hospital) => {
      const hospitalCard = document.createElement("div");
      hospitalCard.className = "hospital-card";

      hospitalCard.innerHTML = `
                <img src="${hospital.image}" alt="${hospital.name}" class="hospital-img">
                <div class="hospital-info">
                    <h3>${hospital.name}</h3>
                    <p>${hospital.address}</p>
                    <a href="tel:${hospital.phone}" class="contact-btn">Contact Us</a>
                </div>
            `;

      hospitalsGrid.appendChild(hospitalCard);
    });
  }

  // Set up all event listeners
  function setupEventListeners() {
    // Login button
    loginBtn.addEventListener("click", () => {
      loginModal.style.display = "block";
    });

    // Show signup form
    showSignup.addEventListener("click", (e) => {
      e.preventDefault();
      loginModal.style.display = "none";
      signupModal.style.display = "block";
    });

    // Close modals
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        loginModal.style.display = "none";
        signupModal.style.display = "none";
      });
    });

    // Close modals when clicking outside
    window.addEventListener("click", (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = "none";
      }
      if (e.target === signupModal) {
        signupModal.style.display = "none";
      }
    });

    // Navigation buttons
    navButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const pageId = button.id.replace("Btn", "Page");
        showPage(pageId);

        // Update active state
        navButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      });
    });

    // Availability options
    document.getElementById("medicineBtn").addEventListener("click", () => {
      showAvailabilityResults("Medicine");
    });

    document.getElementById("bedBtn").addEventListener("click", () => {
      showAvailabilityResults("Beds");
    });

    document.getElementById("injectionBtn").addEventListener("click", () => {
      showAvailabilityResults("Injections");
    });

    document.getElementById("doctorBtn").addEventListener("click", () => {
      showAvailabilityResults("Doctors");
    });

    // Settings options
    document.getElementById("languageBtn").addEventListener("click", () => {
      showSettingsContent("Language");
    });

    document.getElementById("profileBtn").addEventListener("click", () => {
      showSettingsContent("Profile");
    });

    document
      .getElementById("notificationsBtn")
      .addEventListener("click", () => {
        showSettingsContent("Notifications");
      });

    document.getElementById("privacyBtn").addEventListener("click", () => {
      showSettingsContent("Privacy");
    });

    // AI Chat
    document
      .getElementById("sendMessageBtn")
      .addEventListener("click", sendMessage);
    document.getElementById("userMessage").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Show a specific page
  function showPage(pageId) {
    pages.forEach((page) => {
      page.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active");
  }

  // Show availability results
  function showAvailabilityResults(type) {
    const resultsContainer = document.getElementById("availabilityResults");
    let resultsHTML = "";

    switch (type) {
      case "Medicine":
        resultsHTML = `
                    <h3>Available Medicines</h3>
                    <ul>
                        <li>Paracetamol - In stock</li>
                        <li>Ibuprofen - In stock</li>
                        <li>Amoxicillin - Limited stock</li>
                        <li>Omeprazole - Out of stock</li>
                    </ul>
                `;
        break;
      case "Beds":
        resultsHTML = `
                    <h3>Bed Availability</h3>
                    <ul>
                        <li>General Ward - 5 available</li>
                        <li>ICU - 2 available</li>
                        <li>Pediatric Ward - 3 available</li>
                        <li>Maternity Ward - Full</li>
                    </ul>
                `;
        break;
      case "Injections":
        resultsHTML = `
                    <h3>Available Injections</h3>
                    <ul>
                        <li>Vaccines - Available</li>
                        <li>Antibiotics - Available</li>
                        <li>Pain Relief - Available</li>
                        <li>Specialty Medications - Consultation required</li>
                    </ul>
                `;
        break;
      case "Doctors":
        resultsHTML = `
                    <h3>Available Doctors</h3>
                    <div class="doctors-grid">
                        <div class="doctor-card">
                            <h4>Dr. Smith (Cardiologist)</h4>
                            <p>Available: Monday, Wednesday, Friday</p>
                        </div>
                        <div class="doctor-card">
                            <h4>Dr. Johnson (Pediatrician)</h4>
                            <p>Available: Tuesday, Thursday</p>
                        </div>
                        <div class="doctor-card">
                            <h4>Dr. Lee (General Physician)</h4>
                            <p>Available: Daily</p>
                        </div>
                    </div>
                `;
        break;
    }

    resultsContainer.innerHTML = resultsHTML;
  }

  // Show settings content
  function showSettingsContent(type) {
    const settingsContent = document.getElementById("settingsContent");
    let contentHTML = "";

    switch (type) {
      case "Language":
        contentHTML = `
                    <h3>Language Settings</h3>
                    <select>
                        <option>English</option>
                        <option>हिन्दी</option>
                    </select>
                    <button>Save</button>
                `;
        break;
      case "Profile":
        contentHTML = `
                    <h3>Profile Settings</h3>
                    <form>
                        <input type="text" placeholder="Full Name">
                        <input type="email" placeholder="Email">
                        <input type="tel" placeholder="Phone Number">
                        <button>Update Profile</button>
                    </form>
                `;
        break;
      case "Notifications":
        contentHTML = `
                    <h3>Notification Settings</h3>
                    <div>
                        <label>
                            <input type="checkbox" checked> Appointment Reminders
                        </label>
                        <label>
                            <input type="checkbox" checked> Medicine Alerts
                        </label>
                        <label>
                            <input type="checkbox"> Promotional Offers
                        </label>
                    </div>
                    <button>Save Preferences</button>
                `;
        break;
      case "Privacy":
        contentHTML = `
                    <h3>Privacy Settings</h3>
                    <div>
                        <label>
                            <input type="checkbox" checked> Share data for research
                        </label>
                        <label>
                            <input type="checkbox"> Allow personalized ads
                        </label>
                    </div>
                    <button>Update Privacy Settings</button>
                `;
        break;
    }

    settingsContent.innerHTML = contentHTML;
  }

  async function sendMessage() {
    // <--- Made async
    const userMessageInput = document.getElementById("userMessage");
    const userMessage = userMessageInput.value;
    if (!userMessage.trim()) return;

    const chatMessages = document.getElementById("chatMessages");

    // Add user message
    chatMessages.innerHTML += `
            <div class="message user-message">
                <p>${userMessage
                  .replace(/</g, "<")
                  .replace(/>/g, ">")}</p> <!-- Basic sanitize -->
            </div>
        `;

    // Clear input
    userMessageInput.value = "";

    // --- Get AI response using Gemini ---
    let aiResponseText = "Sorry, I couldn't get a response."; // Default fallback

    if (genAI && model) {
      // Check if Gemini was initialized
      try {
        // Optional: Add context/priming here if desired, e.g.,
        const prompt = `You are a helpful assistant for a health website. Keep answers concise and informative. Do not give medical diagnoses. User asked: ${userMessage}`;

        // Use generateContent for a single turn
        const result = await model.generateContent(prompt); // Or just userMessage
        const response = await result.response;
        aiResponseText = await response.text();
      } catch (error) {
        console.error("Error calling Gemini API:", error);
        aiResponseText =
          "Sorry, an error occurred while contacting the AI. Please try again later.";
      }
    } else {
      // Fallback if Gemini isn't initialized (e.g., missing API key)
      aiResponseText =
        "AI Assistant is not configured correctly. Using fallback response for: " +
        userMessage;
      console.warn("Gemini not initialized, providing fallback AI response.");
      // Optionally, add a small delay even for fallback to mimic processing
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    // Add AI response to chat
    chatMessages.innerHTML += `
            <div class="message ai-message">
                <p>${aiResponseText
                  .replace(/</g, "<")
                  .replace(/>/g, ">")}</p> <!-- Basic sanitize -->
            </div>
        `;

    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Initialize the application
  init();
});
