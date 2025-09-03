document.addEventListener('DOMContentLoaded', () => {
    // --- MOCK AI DATA & STATE ---
    const mockAiVerbiage = {
        "Introduction": "This Agreement is made and entered into as of [Date], by and between [Party A Name], with a principal place of business at [Address] (hereinafter referred to as 'Party A'), and [Party B Name], with a principal place of business at [Address] (hereinafter referred to as 'Party B').",
        "Parties Involved": "This Agreement is made and entered into by and between [Party A Name] and [Party B Name], collectively referred to as the 'Parties'.",
        "Purpose of Agreement": "The purpose of this Agreement is to set forth the terms and conditions under which Party A will provide [services/goods] to Party B, and Party B will compensate Party A for such [services/goods].",
        "Scope of Work": "Party A shall provide the following services: [detailed description of services]. All services shall be performed in a professional and workmanlike manner, consistent with generally accepted industry standards.",
        "Payment Terms": "Payment for services rendered under this Agreement shall be made according to the following schedule: [payment terms]. Payments shall be made within [number] days of receipt of invoice.",
        "Confidentiality": "'Confidential Information' refers to all proprietary or confidential data, whether written or oral, disclosed by either party to the other. Each party agrees to maintain the confidentiality of all Confidential Information and to use such information solely for the purpose of performing its obligations under this Agreement.",
        "Termination": "Either party may terminate this Agreement for convenience by providing [number] days’ written notice to the other party. Upon termination, Party A shall be entitled to compensation for services rendered up to the effective date of termination.",
        "Governing Law": "This Agreement shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising under this Agreement shall be subject to the exclusive jurisdiction of the courts of [Jurisdiction].",
        "Intellectual Property": "Unless otherwise agreed, Party A shall retain ownership of all Work Product produced in connection with this Agreement. This includes any intellectual property rights therein, such as copyrights, trademarks, and patents.",
        "Liability and Indemnification": "Each party agrees to indemnify and hold harmless the other party from any third-party claims, liabilities, or expenses arising from its own acts or omissions in connection with this Agreement.",
        "Addendum": "This addendum is attached to and made a part of the Agreement. The terms of this addendum shall prevail over any conflicting terms in the Agreement."
    };
    
    // --- INITIAL DATA & STATE ---
    const getInitialData = () => [
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Introduction",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Parties Involved", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Purpose of Agreement", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Definitions", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Scope of Work",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Project Description", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Deliverables", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Timeline and Milestones", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Changes to Scope", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Responsibilities",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Responsibilities of the Contractor", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Responsibilities of the Client", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Communication Protocols", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Compensation",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Payment Terms", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Expenses", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Invoicing Process", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Performance Standards",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Quality Assurance", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Performance Metrics", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Review and Acceptance Process", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Confidentiality",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Definition of Confidential Information", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Obligations of Confidentiality", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Exceptions", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Intellectual Property",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Ownership of Work Product", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Licensing Rights", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Use of Pre-existing Materials", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Term and Termination",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Contract Duration", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Termination for Cause", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Termination for Convenience", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Liability and Indemnification",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Limitation of Liability", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Indemnification Obligations", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Dispute Resolution",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Governing Law", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Mediation and Arbitration", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Jurisdiction", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Miscellaneous",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Force Majeure", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Amendments", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Severability", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Entire Agreement", content: "", subClauses: [] }
            ]
        },
        {
            id: `clause_${Date.now()}_${Math.random()}`,
            title: "Signatures",
            content: "",
            subClauses: [
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Execution of Agreement", content: "", subClauses: [] },
                { id: `clause_${Date.now()}_${Math.random()}`, title: "Witnesses (if applicable)", content: "", subClauses: [] }
            ]
        }
    ];


    let contractData = getInitialData();
    let templates = JSON.parse(localStorage.getItem('legalContractTemplates')) || {};
    let isGloballyCollapsed = true; // For the "Collapse/Expand All" button state

    // --- DOM ELEMENTS ---
    const editor = document.getElementById('contract-editor');
    const output = document.getElementById('output');
    const templateSelect = document.getElementById('templateSelect');
    const saveTemplateBtn = document.getElementById('saveTemplateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const collapseAllBtn = document.getElementById('collapseAllBtn');
    const addClauseBtn = document.getElementById('addClauseBtn');
    const addAddendumBtn = document.getElementById('addAddendumBtn');
    const generateBtn = document.getElementById('generateBtn');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const copyBtn = document.getElementById('copyBtn');
    const generateProgress = document.getElementById('generateProgress');
    const themeToggle = document.getElementById('themeToggle');
    const aiFillBtn = document.getElementById('aiFillBtn');

    // --- GEMINI API (Live for Summarizer & Reviewer) ---
    async function callGeminiApi(prompt, systemInstruction = null) {
        const API_KEY = ""; // Leave blank, handled by environment
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${API_KEY}`;
        const payload = { contents: [{ parts: [{ text: prompt }] }] };
        if (systemInstruction) {
            payload.systemInstruction = { parts: [{ text: systemInstruction }] };
        }
        try {
            const response = await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API Error: ${response.status}`);
            const result = await response.json();
            const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) throw new Error("Invalid API response.");
            return text.replace(/(\*\*|`)/g, ''); // Clean markdown characters
        } catch (error) {
            console.error("Gemini API Error:", error);
            showToast("AI generation failed.", "error");
            return null;
        }
    }

    // --- RENDER & UI ---
    const renderContract = () => {
        editor.innerHTML = '';
        const renumberedData = renumberClauses(JSON.parse(JSON.stringify(contractData)));
        contractData = renumberedData; // Update main state
        contractData.forEach(clause => editor.appendChild(createClauseElement(clause)));
    };

    const createClauseElement = (clause, isSubClause = false) => {
        const clauseEl = document.createElement('div');
        clauseEl.className = isSubClause ? 'sub-clause' : 'clause';
        clauseEl.dataset.id = clause.id;
        clauseEl.draggable = true;
        
        clauseEl.innerHTML = `
            <div class="clause-header">
                <i class="fas fa-grip-vertical drag-handle"></i>
                <strong class="clause-number">${clause.title.match(/^[\d.]+/)?.[0] || ''}</strong>
                <input type="text" class="clause-title" value="${clause.title.replace(/^[\d.]+\s*/, '')}" placeholder="Clause title...">
                <div class="clause-actions">
                    <button class="btn-icon ai-generate-btn" title="Generate with AI (Mock)"><i class="fas fa-magic"></i></button>
                    <button class="btn-icon ai-review-btn" title="Review with AI"><i class="fas fa-tasks"></i></button>
                    <button class="btn-icon add-sub-clause-btn" title="Add Sub-clause"><i class="fas fa-plus"></i></button>
                    <button class="btn-icon remove-clause-btn" title="Remove Clause"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="clause-content" style="display: ${clause.isCollapsed ? 'none' : 'block'};">
                <textarea class="clause-textarea" placeholder="Enter clause content or generate with AI...">${clause.content}</textarea>
                <div class="clause-feedback hidden"></div>
                <div class="sub-clauses-container"></div>
            </div>`;
        
        const subClausesContainer = clauseEl.querySelector('.sub-clauses-container');
        if (clause.subClauses?.length > 0) {
            clause.subClauses.forEach(sub => subClausesContainer.appendChild(createClauseElement(sub, true)));
        }
        return clauseEl;
    };

    const findClause = (id, data = contractData, parent = contractData) => {
        for (const clause of data) {
            if (clause.id === id) return { clause, parent };
            if (clause.subClauses) {
                const found = findClause(id, clause.subClauses, clause.subClauses);
                if (found) return found;
            }
        }
        return null;
    };

    const renumberClauses = (clauses, prefix = "") => {
        return clauses.map((clause, index) => {
            const newNumber = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
            const titleText = clause.title.replace(/^[\d.]+\s*/, '');
            clause.title = `${newNumber} ${titleText}`;
            if (clause.subClauses?.length > 0) {
                clause.subClauses = renumberClauses(clause.subClauses, newNumber);
            }
            return clause;
        });
    };

    // --- OUTPUT GENERATION & AI FILL ---
    const generateFinalDocument = (clauses = contractData) => {
        let finalHtml = `<h2>Contract Document</h2>`;
        const createHtmlForClauses = (clauseList) => {
            clauseList.forEach(clause => {
                finalHtml += `<div><h3>${clause.title}</h3><p>${clause.content.replace(/\n/g, '<br>') || '...'}</p></div>`;
                if (clause.subClauses?.length > 0) {
                    finalHtml += `<div style="margin-left: 20px;">${createHtmlForClauses(clause.subClauses)}</div>`;
                }
            });
        };
        createHtmlForClauses(clauses);
        output.innerHTML = finalHtml;
        summarizeBtn.disabled = false;
        copyBtn.disabled = false;
    };


    const fillEmptyClausesWithAI = (clauses = contractData) => {
        for (const clause of clauses) {
            if (!clause.content.trim()) {
                const title = clause.title.replace(/^[\d.]+\s*/, '');
                clause.content = getMockAiContent(title);
            }
            if (clause.subClauses?.length > 0) {
                fillEmptyClausesWithAI(clause.subClauses);
            }
        }
    };

    const getMockAiContent = (title) => {
        const key = Object.keys(mockAiVerbiage).find(k => title.toLowerCase().includes(k.toLowerCase()));
        return key ? mockAiVerbiage[key] : "Content for this clause could not be found in mock data.";
    };

    // --- EVENT HANDLERS ---
    const handleEditorClick = async (e) => {
        const target = e.target;
        const clauseEl = target.closest('.clause, .sub-clause');
        if (!clauseEl) return;
        const id = clauseEl.dataset.id;
        const result = findClause(id);
        const clause = result ? result.clause : null;

        if (!clause) return;

        if (target.closest('.clause-header') && !target.closest('button, input, .drag-handle')) {
            const content = clauseEl.querySelector('.clause-content');
            clause.isCollapsed = !clause.isCollapsed;
            content.style.display = clause.isCollapsed ? 'none' : 'block';
        }

        if (target.closest('.add-sub-clause-btn')) {
            if (!clause.subClauses) clause.subClauses = [];
            clause.subClauses.push({ id: `clause_${Date.now()}_${Math.random()}`, title: "New Sub-clause", content: "", isCollapsed: false, subClauses: [] });
            clause.isCollapsed = false; // BUG FIX: Ensure parent expands
            renderContract();
        }
        
        if (target.closest('.remove-clause-btn')) {
             if (confirm('Are you sure you want to remove this clause and all its sub-clauses?')) {
                const parent = result.parent;
                const index = parent.findIndex(c => c.id === id);
                if (index > -1) {
                    parent.splice(index, 1);
                    renderContract();
                }
            }
        }

        if (target.closest('.ai-generate-btn')) {
            const title = clause.title.replace(/^[\d.]+\s*/, '');
            clause.content = getMockAiContent(title);
            clauseEl.querySelector('.clause-textarea').value = clause.content;
            showToast("Mock content added.", "success");
        }

        if (target.closest('.ai-review-btn')) {
            const button = target.closest('.ai-review-btn');
            const feedbackEl = clauseEl.querySelector('.clause-feedback');
            button.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
            button.disabled = true;
            const prompt = `Please review the following legal clause for clarity, completeness, and potential ambiguities. Provide brief, actionable feedback. Clause: "${clause.content}"`;
            const feedback = await callGeminiApi(prompt, "You are a helpful legal assistant providing feedback on contract clauses.");
            if (feedback) {
                feedbackEl.innerHTML = `<strong>AI Feedback:</strong> ${feedback}`;
                feedbackEl.classList.remove('hidden');
            }
            button.innerHTML = `<i class="fas fa-tasks"></i>`;
            button.disabled = false;
        }
    };

    const handleEditorInput = (e) => {
        const target = e.target;
        const clauseEl = target.closest('.clause, .sub-clause');
        if (!clauseEl) return;
        const id = clauseEl.dataset.id;
        const { clause } = findClause(id);

        if (target.matches('.clause-title')) {
            const numberMatch = clause.title.match(/^[\d.]+\s*/);
            const numberPrefix = numberMatch ? numberMatch[0] : '';
            clause.title = `${numberPrefix}${target.value}`;
        }
        if (target.matches('.clause-textarea')) {
            clause.content = target.value;
        }
    };

    // --- DRAG & DROP ---
    let draggedElementId = null;
    const handleDragAndDrop = (e) => {
        const target = e.target;
        const clauseEl = target.closest('.clause, .sub-clause');

        if (e.type === 'dragstart' && clauseEl) {
            draggedElementId = clauseEl.dataset.id;
            setTimeout(() => clauseEl.classList.add('dragging'), 0);
        }
        if (e.type === 'dragend' && clauseEl) {
            clauseEl.classList.remove('dragging');
            draggedElementId = null;
        }
        if (e.type === 'dragover') {
            e.preventDefault();
            document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
            if (clauseEl && clauseEl.dataset.id !== draggedElementId) {
                clauseEl.classList.add('drag-over');
            }
        }
        if (e.type === 'drop') {
            e.preventDefault();
            document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
            if (!draggedElementId || !clauseEl || draggedElementId === clauseEl.dataset.id) return;

            const { clause: draggedClause, parent: sourceParent } = findClause(draggedElementId);
            const { parent: targetParent } = findClause(clauseEl.dataset.id);

            if (sourceParent && targetParent) {
                if (sourceParent === targetParent) {
                    const sourceIndex = sourceParent.findIndex(c => c.id === draggedElementId);
                    sourceParent.splice(sourceIndex, 1);
                    const targetIndex = targetParent.findIndex(c => c.id === clauseEl.dataset.id);
                    targetParent.splice(targetIndex, 0, draggedClause);
                    renderContract();
                } else {
                    showToast("Moving clauses between different levels is not yet supported.", "warning");
                }
            }
        }
    };

    // --- TEMPLATES ---
    const saveTemplate = () => {
        const name = prompt("Enter a name for this template:");
        if (!name || !name.trim()) return;
        templates[name] = JSON.parse(JSON.stringify(contractData));
        localStorage.setItem('legalContractTemplates', JSON.stringify(templates));
        updateTemplateDropdown();
        showToast(`Template "${name}" saved!`, 'success');
    };

    const loadTemplate = () => {
        const name = templateSelect.value;
        if (!name) return;
        contractData = JSON.parse(JSON.stringify(templates[name]));
        renderContract();
        showToast(`Template "${name}" loaded!`, 'success');
    };

    const updateTemplateDropdown = () => {
        templateSelect.innerHTML = '<option value="">Load a saved template...</option>';
        Object.keys(templates).forEach(name => {
            templateSelect.innerHTML += `<option value="${name}">${name}</option>`;
        });
    };

    const resetForm = () => {
        if (confirm("Are you sure you want to reset the editor to the default template?")) {
            contractData = getInitialData();
            renderContract();
            output.innerHTML = 'Your generated document will appear here after you click "Generate Document".';
            summarizeBtn.disabled = true;
            copyBtn.disabled = true;
            showToast("Editor has been reset.", "success");
        }
    };

    // --- EVENT LISTENERS & INITIALIZATION ---
    addClauseBtn.addEventListener('click', () => {
        contractData.push({ id: `clause_${Date.now()}_${Math.random()}`, title: "New Clause", content: "", subClauses: [] });
        renderContract();
    });

    addAddendumBtn.addEventListener('click', () => {
        contractData.push({ id: `clause_${Date.now()}_${Math.random()}`, title: "Addendum", content: "This addendum modifies the agreement as follows:", subClauses: [] });
        renderContract();
    });

    collapseAllBtn.addEventListener('click', (e) => {
        isGloballyCollapsed = !isGloballyCollapsed;
        const toggleRecursively = (clauses) => {
            clauses.forEach(c => {
                c.isCollapsed = isGloballyCollapsed;
                if (c.subClauses) toggleRecursively(c.subClauses);
            });
        };
        toggleRecursively(contractData);
        renderContract();
        e.currentTarget.innerHTML = isGloballyCollapsed ? '<i class="fas fa-expand-alt"></i> Expand All' : '<i class="fas fa-compress-alt"></i> Collapse All';
    });

    generateBtn.addEventListener('click', generateFinalDocument);
    summarizeBtn.addEventListener('click', async () => {
        summarizeBtn.disabled = true;
        summarizeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Summarizing...';
        const contractText = output.innerText;
        const prompt = `Summarize the following legal contract in simple language: \n\n${contractText}`;
        const summary = await callGeminiApi(prompt, "You are an AI assistant that simplifies legal documents.");
        if (summary) {
            const summaryEl = document.createElement('div');
            summaryEl.className = 'summary-section';
            summaryEl.innerHTML = `<h3><i class="fas fa-wand-magic-sparkles"></i> AI Summary</h3><p>${summary.replace(/\n/g, '<br>')}</p>`;
            output.prepend(summaryEl);
        }
        summarizeBtn.disabled = false;
        summarizeBtn.innerHTML = '<i class="fas fa-wand-magic-sparkles"></i> ✨ Summarize with AI';
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(output.innerText)
            .then(() => showToast("Copied to clipboard!", "success"))
            .catch(() => showToast("Failed to copy.", "error"));
    });

    saveTemplateBtn.addEventListener('click', saveTemplate);
    templateSelect.addEventListener('change', loadTemplate);
    resetBtn.addEventListener('click', resetForm);

    editor.addEventListener('click', handleEditorClick);
    editor.addEventListener('input', handleEditorInput);
    editor.addEventListener('dragstart', handleDragAndDrop);
    editor.addEventListener('dragend', handleDragAndDrop);
    editor.addEventListener('dragover', handleDragAndDrop);
    editor.addEventListener('drop', handleDragAndDrop);

    aiFillBtn.addEventListener('click', () => {
        if (confirm("This will fill all empty clauses with AI-generated content. Proceed?")) {
            fillEmptyClausesWithAI();
            renderContract();
            showToast("Empty clauses filled with AI content.", "success");
        }
    });
    generateBtn.addEventListener('click', () => {
        generateFinalDocument(contractData);
        showToast("Document generated!", "success");
    });
    init();

    function init() {
        renderContract();
        updateTemplateDropdown();
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
});

