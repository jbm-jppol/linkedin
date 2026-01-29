document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('utm-form');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');
    const baseUrlInput = document.getElementById('base-url');
    const resultContainer = document.getElementById('result-container');
    const resultUrl = document.getElementById('result-url');
    const copyMessage = document.getElementById('copy-message');
    
    // Translations object
    const translations = {
        da: {
            url_label: "URL",
            post_type_label: "Opslagstype:",
            post_type_editorial: "Redaktionelt opslag",
            post_type_personal: "Personligt opslag",
            post_type_newsletter: "LinkedIn-nyhedsbrev",
            reset_button: "Nulstil",
            result_label: "Din taggede URL:",
            result_placeholder: "Indtast URL øverst for at generere taggede URL",
            copy_button_title: "Kopier URL",
            copy_message: "Tagget link kopieret",
            info_text: "Indtast URL'en for at generere en taggede URL",
            explanation_title: "Forklaring af opslagstyper",
            explanation_editorial_title: "Redaktionelt opslag:",
            explanation_editorial_text: "Brug denne type til almindelige redaktionelle opslag fra mediet. Dette er den standardtype, du skal bruge, når du deler artikler eller indhold fra din redaktion på LinkedIn.",
            explanation_personal_title: "Personligt opslag:",
            explanation_personal_text: "Vælg denne type, når du deler indhold fra dit personlige LinkedIn-opslag. Dette bruges typisk, når du som journalist deler artikler eller indhold i dit eget navn, uden for det redaktionelle format.",
            explanation_newsletter_title: "LinkedIn-nyhedsbrev:",
            explanation_newsletter_text: "Brug denne type, når du deler links fra LinkedIn's nyhedsbrev-funktion. Dette er specifikt til indhold, der er delt gennem LinkedIn's nyhedsbrev-system."
        },
        no: {
            url_label: "URL",
            post_type_label: "Innleggstype:",
            post_type_editorial: "Redaksjonelt innlegg",
            post_type_personal: "Personlig innlegg",
            post_type_newsletter: "LinkedIn-nyhetsbrev",
            reset_button: "Nullstill",
            result_label: "Din merket URL:",
            result_placeholder: "Skriv inn URL øverst for å generere merket URL",
            copy_button_title: "Kopier URL",
            copy_message: "Tagget lenke kopiert",
            info_text: "Skriv inn URL-en for å generere en merket URL",
            explanation_title: "Forklaring av innleggstyper",
            explanation_editorial_title: "Redaksjonelt innlegg:",
            explanation_editorial_text: "Bruk denne typen til vanlige redaksjonelle innlegg fra mediet. Dette er standardtypen du skal bruke når du deler artikler eller innhold fra din redaksjon på LinkedIn.",
            explanation_personal_title: "Personlig innlegg:",
            explanation_personal_text: "Velg denne typen når du deler innhold fra ditt personlige LinkedIn-innlegg. Dette brukes typisk når du som journalist deler artikler eller innhold i ditt eget navn, utenfor det redaksjonelle formatet.",
            explanation_newsletter_title: "LinkedIn-nyhetsbrev:",
            explanation_newsletter_text: "Bruk denne typen når du deler lenker fra LinkedIn's nyhetsbrev-funksjon. Dette er spesifikt for innhold som er delt gjennom LinkedIn's nyhetsbrev-system."
        },
        se: {
            url_label: "URL",
            post_type_label: "Inläggstyp:",
            post_type_editorial: "Redaktionellt inlägg",
            post_type_personal: "Personligt inlägg",
            post_type_newsletter: "LinkedIn-nyhetsbrev",
            reset_button: "Återställ",
            result_label: "Din taggade URL:",
            result_placeholder: "Ange URL överst för att generera taggad URL",
            copy_button_title: "Kopiera URL",
            copy_message: "Taggad länk kopierad",
            info_text: "Ange URL:en för att generera en taggad URL",
            explanation_title: "Förklaring av inläggstyper",
            explanation_editorial_title: "Redaktionellt inlägg:",
            explanation_editorial_text: "Använd denna typ för vanliga redaktionella inlägg från mediet. Detta är standardtypen du ska använda när du delar artiklar eller innehåll från din redaktion på LinkedIn.",
            explanation_personal_title: "Personligt inlägg:",
            explanation_personal_text: "Välj denna typ när du delar innehåll från ditt personliga LinkedIn-inlägg. Detta används typiskt när du som journalist delar artiklar eller innehåll i ditt eget namn, utanför det redaktionella formatet.",
            explanation_newsletter_title: "LinkedIn-nyhetsbrev:",
            explanation_newsletter_text: "Använd denna typ när du delar länkar från LinkedIn's nyhetsbrev-funktion. Detta är specifikt för innehåll som delats genom LinkedIn's nyhetsbrev-system."
        },
        de: {
            url_label: "URL",
            post_type_label: "Beitragstyp:",
            post_type_editorial: "Redaktioneller Beitrag",
            post_type_personal: "Persönlicher Beitrag",
            post_type_newsletter: "LinkedIn-Newsletter",
            reset_button: "Zurücksetzen",
            result_label: "Ihre markierte URL:",
            result_placeholder: "Geben Sie oben die URL ein, um eine markierte URL zu generieren",
            copy_button_title: "URL kopieren",
            copy_message: "Getaggter Link kopiert",
            info_text: "Geben Sie die URL ein, um eine markierte URL zu generieren",
            explanation_title: "Erklärung der Beitragstypen",
            explanation_editorial_title: "Redaktioneller Beitrag:",
            explanation_editorial_text: "Verwenden Sie diesen Typ für normale redaktionelle Beiträge vom Medium. Dies ist der Standardtyp, den Sie verwenden sollten, wenn Sie Artikel oder Inhalte von Ihrer Redaktion auf LinkedIn teilen.",
            explanation_personal_title: "Persönlicher Beitrag:",
            explanation_personal_text: "Wählen Sie diesen Typ, wenn Sie Inhalte von Ihrem persönlichen LinkedIn-Beitrag teilen. Dies wird typischerweise verwendet, wenn Sie als Journalist Artikel oder Inhalte in Ihrem eigenen Namen außerhalb des redaktionellen Formats teilen.",
            explanation_newsletter_title: "LinkedIn-Newsletter:",
            explanation_newsletter_text: "Verwenden Sie diesen Typ, wenn Sie Links von LinkedIn's Newsletter-Funktion teilen. Dies ist spezifisch für Inhalte, die über LinkedIn's Newsletter-System geteilt wurden."
        },
        en: {
            url_label: "URL",
            post_type_label: "Post type:",
            post_type_editorial: "Editorial post",
            post_type_personal: "Personal post",
            post_type_newsletter: "LinkedIn newsletter",
            reset_button: "Reset",
            result_label: "Your tagged URL:",
            result_placeholder: "Enter URL above to generate tagged URL",
            copy_button_title: "Copy URL",
            copy_message: "Tagged link copied",
            info_text: "Enter the URL to generate a tagged URL",
            explanation_title: "Explanation of post types",
            explanation_editorial_title: "Editorial post:",
            explanation_editorial_text: "Use this type for regular editorial posts from the media outlet. This is the standard type you should use when sharing articles or content from your editorial team on LinkedIn.",
            explanation_personal_title: "Personal post:",
            explanation_personal_text: "Choose this type when sharing content from your personal LinkedIn post. This is typically used when you, as a journalist, share articles or content in your own name, outside the editorial format.",
            explanation_newsletter_title: "LinkedIn newsletter:",
            explanation_newsletter_text: "Use this type when sharing links from LinkedIn's newsletter feature. This is specific to content shared through LinkedIn's newsletter system."
        }
    };
    
    // Function to translate the page
    function translatePage(lang) {
        const langData = translations[lang] || translations.da;
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (langData[key]) {
                element.textContent = langData[key];
            }
        });
        
        // Update placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (langData[key]) {
                element.placeholder = langData[key];
            }
        });
        
        // Update title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (langData[key]) {
                element.title = langData[key];
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
    
    // Validate URL - no spaces allowed
    function isValidUrl(url) {
        if (!url || !url.trim()) {
            return false;
        }
        // Check for spaces
        if (url.includes(' ')) {
            return false;
        }
        // Try to create URL object
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    }
    
    // Generate tagged URL with li_origin
    function generateTaggedUrl(baseUrl, liOrigin) {
        try {
            const url = new URL(baseUrl);
            
            // Add li_origin parameter
            if (liOrigin && liOrigin.trim()) {
                url.searchParams.set('li_origin', liOrigin);
            }
            
            return url.toString();
        } catch (error) {
            const currentLang = getCookie('selectedLanguage') || 'da';
            const errorMessages = {
                da: 'Ugyldig URL. Sørg for at URL\'en starter med http:// eller https://',
                no: 'Ugyldig URL. Sørg for at URL-en starter med http:// eller https://',
                se: 'Ogiltig URL. Se till att URL:en börjar med http:// eller https://',
                de: 'Ungültige URL. Stellen Sie sicher, dass die URL mit http:// oder https:// beginnt',
                en: 'Invalid URL. Make sure the URL starts with http:// or https://'
            };
            throw new Error(errorMessages[currentLang] || errorMessages.da);
        }
    }
    
    // Get selected post type
    function getPostType() {
        const selectedRadio = document.querySelector('input[name="post-type"]:checked');
        return selectedRadio ? selectedRadio.value : 'redaktionelt';
    }
    
    // Map post type to li_origin value
    function getLiOriginValue(postType) {
        const liOriginMap = {
            'personligt': 'personal_profile',
            'redaktionelt': 'editorial_post',
            'linkedin-nyhedsbrev': 'newsletter'
        };
        return liOriginMap[postType] || 'editorial_post';
    }
    
    // Update result URL in real-time
    function updateResultUrl() {
        const baseUrl = baseUrlInput.value.trim();
        
        if (isValidUrl(baseUrl)) {
            try {
                const postType = getPostType();
                const liOrigin = getLiOriginValue(postType);
                
                const taggedUrl = generateTaggedUrl(baseUrl, liOrigin);
                resultUrl.value = taggedUrl;
                copyBtn.disabled = false;
            } catch (error) {
                resultUrl.value = '';
                copyBtn.disabled = true;
            }
        } else {
            resultUrl.value = '';
            copyBtn.disabled = true;
        }
    }
    
    // Listen for input changes in base URL field
    baseUrlInput.addEventListener('input', updateResultUrl);
    baseUrlInput.addEventListener('paste', function() {
        setTimeout(updateResultUrl, 10);
    });
    
    // Listen for changes in radio buttons
    const radioButtons = document.querySelectorAll('input[name="post-type"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', updateResultUrl);
    });
    
    // Reset form
    resetBtn.addEventListener('click', function() {
        form.reset();
        // Ensure redaktionelt is selected after reset
        document.getElementById('post-type-redaktionelt').checked = true;
        resultUrl.value = '';
        copyBtn.disabled = true;
        copyBtn.classList.remove('success');
        copyMessage.classList.add('hidden');
        // Restore original icon if it was changed
        const svg = copyBtn.querySelector('svg');
        if (svg) {
            svg.innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
        }
        const ariaLive = document.getElementById('copy-aria-live');
        if (ariaLive) {
            ariaLive.textContent = '';
        }
        baseUrlInput.focus();
    });
    
    // Copy URL to clipboard
    copyBtn.addEventListener('click', function() {
        if (copyBtn.disabled || !resultUrl.value) {
            return;
        }
        
        resultUrl.select();
        resultUrl.setSelectionRange(0, 99999); // For mobile devices
        
        const currentLang = getCookie('selectedLanguage') || 'da';
        const langData = translations[currentLang] || translations.da;
        const successMessage = langData.copy_message || 'Tagged link copied';
        
        const handleCopySuccess = function() {
            // Add success state to button
            copyBtn.classList.add('success');
            
            // Change icon to checkmark
            const svg = copyBtn.querySelector('svg');
            if (svg) {
                svg.innerHTML = '<path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
            }
            
            // Update and show toast message
            copyMessage.textContent = successMessage;
            copyMessage.classList.remove('hidden');
            
            // Announce to screen readers
            const ariaLive = document.getElementById('copy-aria-live');
            if (ariaLive) {
                ariaLive.textContent = successMessage;
            }
            
            // Reset after 1.8 seconds
            setTimeout(function() {
                copyBtn.classList.remove('success');
                // Restore original icon
                if (svg) {
                    svg.innerHTML = '<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>';
                }
                copyMessage.classList.add('hidden');
                if (ariaLive) {
                    ariaLive.textContent = '';
                }
            }, 1800);
        };
        
        try {
            navigator.clipboard.writeText(resultUrl.value).then(handleCopySuccess);
        } catch (err) {
            // Fallback for older browsers
            document.execCommand('copy');
            handleCopySuccess();
        }
    });
    
    // Initialize - disable copy button on load
    copyBtn.disabled = true;
    
    // Expandable explanation section
    const explanationToggle = document.getElementById('explanation-toggle');
    const explanationContent = document.getElementById('explanation-content');
    
    explanationToggle.addEventListener('click', function() {
        explanationContent.classList.toggle('collapsed');
        explanationToggle.classList.toggle('expanded');
    });
    
    // Cookie functions
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    // Language selector buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    
    // Load saved language from cookie on page load
    const savedLang = getCookie('selectedLanguage') || 'da';
    
    // Set active button and translate page
    langButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === savedLang) {
            btn.classList.add('active');
        }
    });
    
    // Translate page with saved language
    translatePage(savedLang);
    
    // Handle language button clicks
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Save selected language to cookie (expires in 365 days)
            setCookie('selectedLanguage', selectedLang, 365);
            
            // Translate the page
            translatePage(selectedLang);
        });
    });
});

