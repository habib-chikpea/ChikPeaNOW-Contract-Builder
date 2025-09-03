# **⚖️ AI-Powered Contract Builder**

A sophisticated, single-page web application designed for creating, customizing, and managing legal contracts in real-time. It leverages a modern user interface and AI assistance (powered by the Google Gemini API) to streamline the contract creation process.

## **✨ Key Features**

* **📝 Real-Time Editor**: A dynamic, single-pane interface that allows users to build and edit the contract live. What you see is what you get.  
* **🤏 Drag-and-Drop Reordering**: Intuitively reorganize clauses and sub-clauses by dragging them. The entire document's numbering automatically updates in real-time.  
* **🗂️ Full Clause Management**:  
  * **Add/Remove**: Dynamically add new clauses and sub-clauses at any level.  
  * **Edit Titles**: Click directly on any clause title to rename it.  
  * **Expand/Collapse**: View the contract at a high level or dive into the details. Each clause can be toggled, and a global "Expand/Collapse All" button is available.  
* **🤖 AI-Powered Assistance**:  
  * **AI Content Generation**: Instantly populate clauses with high-quality, standard legal text using mock data for speed.  
  * **AI Document Filling**: A one-click feature to intelligently fill all empty clauses in the entire document.  
  * **AI Contract Summarization**: (Live Gemini API) Generate a simple, easy-to-understand summary of the final contract.  
  * **AI Clause Review**: (Live Gemini API) Get AI-powered feedback on any clause for clarity, completeness, and potential ambiguities.  
* **💾 Template Management**:  
  * **Save & Load**: Save complex contract structures and content as templates in the browser's local storage.  
  * **Quick Start**: Load saved templates to quickly start new documents.  
* **🎨 Modern UI/UX**:  
  * **Dark/Light Mode**: Switch between themes for user comfort.  
  * **Responsive Design**: A clean, full-width layout that works well on various screen sizes.  
  * **Actionable Feedback**: Non-intrusive toast notifications for user actions.

## **🚀 How to Run Locally**

1. Clone the Repository (or Create a Project Folder):  
   Make a new directory on your local machine.  
2. Create the Project Files:  
   Inside the new folder, create three empty files. You can use the following commands in your terminal:  
   touch index.html style.css script.js

3. Copy the Code:  
   Copy the content from the corresponding files provided in this project into your newly created files.  
4. Open in Browser:  
   Open the index.html file in any modern web browser (like Chrome, Firefox, or Edge).

## **💻 Technologies Used**

* **Frontend**: HTML5, CSS3, JavaScript (ES6+)  
* **AI**: Google Gemini API for advanced features like summarization and review.  
* **Icons**: Font Awesome for a clean and modern icon set.  
* **Storage**: Browser Local Storage for saving and loading user-created templates.

## **📂 File Structure**

| File | Description |
| :---- | :---- |
| index.html | Contains the core HTML structure, the layout skeleton, and links to the CSS and JavaScript files. |
| style.css | Defines all styling rules, including layout, typography, themes (dark/light mode), and animations. |
| script.js | The application's engine. It handles all logic, including rendering the dynamic editor, managing state, handling events, and API integration. |

