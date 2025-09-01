document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---
    const legalClauses = [
        { id: "1", title: "Introduction", subClauses: [ { id: "1.1", title: "Parties Involved" }, { id: "1.2", title: "Purpose of Agreement" }, { id: "1.3", title: "Definitions" } ] },
        { id: "2", title: "Scope of Work", subClauses: [ { id: "2.1", title: "Project Description" }, { id: "2.2", title: "Deliverables" }, { id: "2.3", title: "Timeline and Milestones" }, { id: "2.4", title: "Changes to Scope" } ] },
        { id: "3", title: "Responsibilities", subClauses: [ { id: "3.1", title: "Responsibilities of the Contractor" }, { id: "3.2", title: "Responsibilities of the Client" }, { id: "3.3", title: "Communication Protocols" } ] },
        { id: "4", title: "Compensation", subClauses: [ { id: "4.1", title: "Payment Terms" }, { id: "4.2", title: "Expenses" }, { id: "4.3", title: "Invoicing Process" } ] },
        { id: "5", title: "Performance Standards", subClauses: [ { id: "5.1", title: "Quality Assurance" }, { id: "5.2", title: "Performance Metrics" }, { id: "5.3", title: "Review and Acceptance Process" } ] },
        { id: "6", title: "Confidentiality", subClauses: [ { id: "6.1", title: "Definition of Confidential Information" }, { id: "6.2", title: "Obligations of Confidentiality" }, { id: "6.3", title: "Exceptions" } ] },
        { id: "7", title: "Intellectual Property", subClauses: [ { id: "7.1", title: "Ownership of Work Product" }, { id: "7.2", title: "Licensing Rights" }, { id: "7.3", title: "Use of Pre-existing Materials" } ] },
        { id: "8", title: "Term and Termination", subClauses: [ { id: "8.1", title: "Contract Duration" }, { id: "8.2", title: "Termination for Cause" }, { id: "8.3", title: "Termination for Convenience" } ] },
        { id: "9", title: "Liability and Indemnification", subClauses: [ { id: "9.1", title: "Limitation of Liability" }, { id: "9.2", title: "Indemnification Obligations" } ] },
        { id: "10", title: "Dispute Resolution", subClauses: [ { id: "10.1", title: "Governing Law" }, { id: "10.2", title: "Mediation and Arbitration" }, { id: "10.3", title: "Jurisdiction" } ] },
        { id: "11", title: "Miscellaneous", subClauses: [ { id: "11.1", title: "Force Majeure" }, { id: "11.2", title: "Amendments" }, { id: "11.3", title: "Severability" }, { id: "11.4", title: "Entire Agreement" } ] },
        { id: "12", title: "Signatures", subClauses: [ { id: "12.1", title: "Execution of Agreement" }, { id: "12.2", title: "Witnesses (if applicable)" } ] }
    ];
    
    // NOTE: The static aiVerbiage object is no longer needed and has been removed.

    // --- STATE MANAGEMENT ---
    let state = {
        selectedClauses: {},
        customVerbiage: {},
        addendum: "",
        templates: JSON.parse(localStorage.getItem('legalTemplates')) || {},
        darkMode: localStorage.getItem('darkMode') === 'true'
    };

    // --- DOM ELEMENTS ---
    const clauseList = document.getElementById('clauseList');
    const addendum = document.getElementById('addendum');
    const output = document.getElementById('output');
    const generateBtn = document.getElementById('generateBtn');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const copyBtn = document.getElementById('copyBtn');
    const exportBtn = document.getElementById('exportBtn');
    const templateSelect = document.getElementById('templateSelect');
    const saveTemplateBtn = document.getElementById('saveTemplateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const selectAll = document.getElementById('selectAll');
    const addendumToggle = document.getElementById('addendumToggle');
    const themeToggle = document.getElementById('themeToggle');
    const toastContainer = document.getElementById('toastContainer');
    const generateProgress = document.getElementById('generateProgress');
    const selectedCount = document.getElementById('selectedCount');
    const addendumContent = document.getElementById('addendumContent');


    // --- GEMINI API INTEGRATION ---
    const API_KEY = ""; // Leave blank. Handled by the environment.
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
    
    async function callGeminiApi(prompt, systemInstruction = null) {
        let payload = {
            contents: [{ parts: [{ text: prompt }] }],
        };
        if (systemInstruction) {
            payload.systemInstruction = { parts: [{ text: systemInstruction }] };
        }

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorBody = await response.json();
                console.error("API Error Response:", errorBody);
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

            if (!text) {
                console.error("No text found in API response:", result);
                throw new Error("Invalid API response format.");
            }
            return text;
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            showToast("AI generation failed. Please try again.", "error");
            return null;
        }
    }


    // --- INITIALIZATION ---
    function init() {
        renderClauses();
        setupEventListeners();
        updateTemplateDropdown();
        updateSelectedCount();
        if (state.darkMode) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // --- RENDER FUNCTIONS ---
    function renderClauses() {
        clauseList.innerHTML = '';
        legalClauses.forEach(clause => {
            const clauseCategory = document.createElement('div');
            clauseCategory.className = 'clause-category fade-in';
            const clauseHeader = document.createElement('div');
            clauseHeader.className = 'clause-header';
            clauseHeader.innerHTML = `<h3>${clause.id}. ${clause.title}</h3><i class="fas fa-chevron-down"></i>`;
            const subClausesContainer = document.createElement('div');
            subClausesContainer.className = 'sub-clauses';

            clause.subClauses.forEach(subClause => {
                const clauseItem = document.createElement('div');
                clauseItem.className = 'clause-item';
                clauseItem.innerHTML = `
                    <input type="checkbox" id="clause-${subClause.id}" data-id="${subClause.id}" data-title="${subClause.title}">
                    <div class="clause-content">
                        <label class="clause-label" for="clause-${subClause.id}">
                            <strong>${subClause.id}</strong> ${subClause.title}
                        </label>
                        <textarea class="custom-verbiage hidden" data-id="${subClause.id}" placeholder="Enter custom verbiage or click '✨ AI Generate' for content."></textarea>
                        <div class="clause-actions hidden">
                            <button class="btn-secondary ai-generate" data-id="${subClause.id}" data-title="${subClause.title}"><i class="fas fa-wand-magic-sparkles"></i> ✨ AI Generate</button>
                            <button class="btn-secondary clear-text" data-id="${subClause.id}"><i class="fas fa-trash"></i> Clear</button>
                        </div>
                    </div>`;
                subClausesContainer.appendChild(clauseItem);
            });
            clauseCategory.appendChild(clauseHeader);
            clauseCategory.appendChild(subClausesContainer);
            clauseHeader.addEventListener('click', () => {
                const icon = clauseHeader.querySelector('i');
                const isCollapsed = subClausesContainer.style.display === 'none';
                subClausesContainer.style.display = isCollapsed ? 'block' : 'none';
                icon.className = isCollapsed ? 'fas fa-chevron-down' : 'fas fa-chevron-right';
            });
        });
    }

    // --- EVENT LISTENERS ---
    function setupEventListeners() {
        clauseList.addEventListener('change', handleClauseSelection);
        clauseList.addEventListener('input', handleCustomVerbiageInput);
        clauseList.addEventListener('click', handleClauseActions);
        addendum.addEventListener('input', e => { state.addendum = e.target.value; });
        addendumToggle.addEventListener('change', e => { addendumContent.classList.toggle('hidden', !e.target.checked); });
        generateBtn.addEventListener('click', generateOutput);
        summarizeBtn.addEventListener('click', summarizeContract);
        copyBtn.addEventListener('click', copyToClipboard);
        exportBtn.addEventListener('click', () => showToast('Export functionality is a demo.', 'warning'));
        saveTemplateBtn.addEventListener('click', saveTemplate);
        templateSelect.addEventListener('change', loadTemplate);
        resetBtn.addEventListener('click', resetForm);
        selectAll.addEventListener('change', handleSelectAll);
        themeToggle.addEventListener('click', toggleTheme);
    }

    // --- EVENT HANDLERS ---
    function handleClauseSelection(e) {
        if (e.target.type !== 'checkbox') return;
        const id = e.target.dataset.id;
        const textarea = document.querySelector(`.custom-verbiage[data-id="${id}"]`);
        const actions = textarea.nextElementSibling;

        if (e.target.checked) {
            textarea.classList.remove('hidden');
            actions.classList.remove('hidden');
            state.selectedClauses[id] = true;
        } else {
            textarea.classList.add('hidden');
            actions.classList.add('hidden');
            delete state.selectedClauses[id];
            delete state.customVerbiage[id];
        }
        updateSelectedCount();
        updateSelectAllCheckbox();
    }

    function handleCustomVerbiageInput(e) {
        if (e.target.classList.contains('custom-verbiage')) {
            state.customVerbiage[e.target.dataset.id] = e.target.value;
        }
    }

    async function handleClauseActions(e) {
        const button = e.target.closest('button');
        if (!button) return;
        const id = button.dataset.id;
        const title = button.dataset.title;
        const textarea = document.querySelector(`.custom-verbiage[data-id="${id}"]`);

        if (button.classList.contains('ai-generate')) {
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...';
            const prompt = `Generate a standard legal clause for a contract on the topic of "${title}". The clause should be professional, clear, and comprehensive.`;
            const systemInstruction = "You are a legal assistant AI specializing in drafting clear and standard contract clauses.";
            const generatedText = await callGeminiApi(prompt, systemInstruction);
            
            if (generatedText) {
                textarea.value = generatedText;
                state.customVerbiage[id] = generatedText;
                showToast(`AI content generated for clause ${id}`, 'success');
            }
            button.disabled = false;
            button.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> ✨ AI Generate';
        } else if (button.classList.contains('clear-text')) {
            textarea.value = "";
            delete state.customVerbiage[id];
        }
    }
    
    function handleSelectAll(e) {
        document.querySelectorAll('.clause-item input[type="checkbox"]').forEach(checkbox => {
            if (checkbox.checked !== e.target.checked) {
                checkbox.checked = e.target.checked;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            }
        });
    }

    // --- CORE LOGIC ---
    async function generateOutput() {
        generateBtn.disabled = true;
        summarizeBtn.disabled = true;
        generateBtn.innerHTML = '<i class="fas fa-cog fa-spin"></i> Generating...';
        let progress = 0;
        const interval = setInterval(() => {
            progress = Math.min(progress + Math.random() * 10, 100);
            generateProgress.style.width = `${progress}%`;
            if (progress === 100) clearInterval(interval);
        }, 100);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            let outputHtml = "<div id='contract-content'><h2>CONTRACT AGREEMENT</h2><p>This Agreement is made and entered into as of [Date], by and between [Party A] and [Party B].</p>";
            let lastMainClauseNumber = 0;

            legalClauses.forEach(mainClause => {
                const selectedSubClauses = mainClause.subClauses.filter(sc => state.selectedClauses[sc.id]);
                if (selectedSubClauses.length > 0) {
                    lastMainClauseNumber = parseInt(mainClause.id);
                    outputHtml += `<h3>${mainClause.id}. ${mainClause.title}</h3>`;
                    selectedSubClauses.forEach((subClause, index) => {
                        const newId = `${mainClause.id}.${index + 1}`;
                        const verbiage = state.customVerbiage[subClause.id]?.trim() || `[Standard legal verbiage for ${subClause.title}]`;
                        const sanitizedVerbiage = verbiage.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br>');
                        outputHtml += `<div class="sub-clause"><strong>${newId} ${subClause.title}</strong><p>${sanitizedVerbiage}</p></div>`;
                    });
                }
            });

            if (state.addendum.trim()) {
                const addendumNumber = lastMainClauseNumber + 1;
                const sanitizedAddendum = state.addendum.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, '<br>');
                outputHtml += `<h3>${addendumNumber}. ADDENDUM</h3><p>${sanitizedAddendum}</p>`;
            }
            outputHtml += "<br><p><strong>IN WITNESS WHEREOF,</strong> the parties have executed this Agreement as of the date first above written.</p>";
            outputHtml += "<div style='margin-top: 30px; display: flex; justify-content: space-between;'><p>[Party A Signature]<br>___________________________</p><p>[Party B Signature]<br>___________________________</p></div></div>";
            
            output.innerHTML = outputHtml;
            copyBtn.disabled = false;
            exportBtn.disabled = false;
            summarizeBtn.disabled = false;
            showToast('Contract generated successfully!', 'success');
        } catch (error) {
            showToast('Error generating contract.', 'error');
            console.error('Generation error:', error);
        } finally {
            generateBtn.disabled = false;
            generateBtn.innerHTML = '<i class="fas fa-bolt"></i> Generate Contract';
            generateProgress.style.width = '0%';
        }
    }
    
    async function summarizeContract() {
        const contractContent = document.getElementById('contract-content');
        if (!contractContent) {
            showToast("Please generate a contract first.", "warning");
            return;
        }

        summarizeBtn.disabled = true;
        summarizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Summarizing...';

        const prompt = `Summarize the following legal contract in simple, plain language. Focus on the key obligations, rights, and terms for both parties. Present the summary in a few clear paragraphs. Here is the contract:\n\n${contractContent.innerText}`;
        const systemInstruction = "You are an AI assistant that simplifies complex legal documents into easy-to-understand summaries.";
        
        const summaryText = await callGeminiApi(prompt, systemInstruction);

        if (summaryText) {
            const existingSummary = output.querySelector('.summary-section');
            if(existingSummary) existingSummary.remove();

            const summaryDiv = document.createElement('div');
            summaryDiv.className = 'summary-section';
            summaryDiv.innerHTML = `<h3><i class="fas fa-wand-magic-sparkles"></i> AI-Generated Summary</h3><p>${summaryText.replace(/\n/g, '<br>')}</p>`;
            output.prepend(summaryDiv);
            showToast("Summary generated successfully!", "success");
        }
        
        summarizeBtn.disabled = false;
        summarizeBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> ✨ Summarize with AI';
    }

    // --- UTILITY FUNCTIONS ---
    function updateSelectedCount() {
        selectedCount.textContent = Object.keys(state.selectedClauses).length;
    }

    function updateSelectAllCheckbox() {
        const checkboxes = [...document.querySelectorAll('.clause-item input[type="checkbox"]')];
        const total = checkboxes.length;
        const checkedCount = checkboxes.filter(cb => cb.checked).length;
        selectAll.checked = total > 0 && total === checkedCount;
        selectAll.indeterminate = checkedCount > 0 && checkedCount < total;
    }

    function copyToClipboard() {
        const contractContent = document.getElementById('contract-content');
        if(!contractContent) return;

        const textToCopy = contractContent.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(err => {
            showToast('Failed to copy.', 'error');
            console.error('Copy error:', err);
        });
    }

    function saveTemplate() {
        const name = prompt('Enter a name for this template:');
        if (!name || !name.trim()) return;
        state.templates[name] = {
            selectedClauses: state.selectedClauses,
            customVerbiage: state.customVerbiage,
            addendum: state.addendum
        };
        localStorage.setItem('legalTemplates', JSON.stringify(state.templates));
        updateTemplateDropdown();
        showToast(`Template "${name}" saved!`, 'success');
    }

    function loadTemplate() {
        const name = templateSelect.value;
        if (!name) return;
        const template = state.templates[name];
        if (!template) return;
        resetForm(false); // Reset without confirmation
        state.selectedClauses = template.selectedClauses || {};
        state.customVerbiage = template.customVerbiage || {};
        state.addendum = template.addendum || "";
        applyStateToUI();
        showToast(`Template "${name}" loaded!`, 'success');
    }

    function resetForm(confirmReset = true) {
        if (confirmReset && !confirm('Are you sure you want to reset the form?')) return;
        state.selectedClauses = {};
        state.customVerbiage = {};
        state.addendum = "";
        applyStateToUI();
        output.innerHTML = "Your generated legal clauses will appear here after you click the 'Generate' button.";
        copyBtn.disabled = true;
        exportBtn.disabled = true;
        summarizeBtn.disabled = true;
        if (confirmReset) showToast('Form has been reset.', 'success');
    }
    
    function applyStateToUI() {
        addendum.value = state.addendum;
        document.querySelectorAll('.clause-item input[type="checkbox"]').forEach(cb => {
            const id = cb.dataset.id;
            cb.checked = !!state.selectedClauses[id];
            const textarea = document.querySelector(`.custom-verbiage[data-id="${id}"]`);
            const actions = textarea.nextElementSibling;
            textarea.value = state.customVerbiage[id] || "";
            textarea.classList.toggle('hidden', !cb.checked);
            actions.classList.toggle('hidden', !cb.checked);
        });
        updateSelectedCount();
        updateSelectAllCheckbox();
    }
    
    function updateTemplateDropdown() {
        const names = Object.keys(state.templates);
        templateSelect.innerHTML = '<option value="">Load a saved template...</option>';
        names.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            templateSelect.appendChild(option);
        });
    }

    function toggleTheme() {
        state.darkMode = !state.darkMode;
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', state.darkMode);
        themeToggle.innerHTML = state.darkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    }

    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        const icon = type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'exclamation-triangle';
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${icon}"></i><span>${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
    
    init(); // Start the application
});