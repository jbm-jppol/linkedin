document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('utm-form');
    const resetBtn = document.getElementById('reset-btn');
    const copyBtn = document.getElementById('copy-btn');
    const baseUrlInput = document.getElementById('base-url');
    const resultContainer = document.getElementById('result-container');
    const resultUrl = document.getElementById('result-url');
    const copyMessage = document.getElementById('copy-message');
    
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
            throw new Error('Ugyldig URL. Sørg for at URL\'en starter med http:// eller https://');
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
        copyMessage.classList.add('hidden');
        baseUrlInput.focus();
    });
    
    // Copy URL to clipboard
    copyBtn.addEventListener('click', function() {
        if (copyBtn.disabled || !resultUrl.value) {
            return;
        }
        
        resultUrl.select();
        resultUrl.setSelectionRange(0, 99999); // For mobile devices
        
        try {
            navigator.clipboard.writeText(resultUrl.value).then(function() {
                copyMessage.classList.remove('hidden');
                setTimeout(function() {
                    copyMessage.classList.add('hidden');
                }, 2000);
            });
        } catch (err) {
            // Fallback for older browsers
            document.execCommand('copy');
            copyMessage.classList.remove('hidden');
            setTimeout(function() {
                copyMessage.classList.add('hidden');
            }, 2000);
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
    
    // Language selector buttons
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            langButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
        });
    });
});

