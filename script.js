// Animate on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

// Chat functionality
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addUserMessage(message);
    input.value = '';
    
    setTimeout(() => {
        startTrainingSimulation(message);
    }, 1000);
}

function sendSuggestion(text) {
    const input = document.getElementById('chatInput');
    input.value = text;
    sendMessage();
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addUserMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-avatar">U</div>
        <div class="message-content glass">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addAssistantMessage(message) {
    const chatMessages = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message assistant';
    messageDiv.innerHTML = `
        <div class="message-avatar">A</div>
        <div class="message-content glass">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function startTrainingSimulation(userMessage) {
    addAssistantMessage("Perfect! I understand you want to build an ML model. Let me analyze your requirements and get started...");
    
    setTimeout(() => {
        document.getElementById('trainingMonitor').style.display = 'block';
        simulateTrainingProgress();
    }, 1500);
}

function simulateTrainingProgress() {
    const steps = ['step1', 'step2', 'step3', 'step4', 'step5'];
    const stepDurations = [2000, 2500, 3000, 8000, 2000];
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    let currentStep = 0;
    let progress = 0;
    let startTime = Date.now();
    
    function updateProgress() {
        const elapsed = Date.now() - startTime;
        const timeElapsed = document.getElementById('timeElapsed');
        timeElapsed.textContent = `${Math.floor(elapsed / 1000)}s`;
        
        if (currentStep < steps.length) {
            document.getElementById(steps[currentStep]).classList.add('active');
        }
        
        progress += 0.5;
        if (progress > 100) progress = 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${Math.floor(progress)}%`;
        
        // Update metrics
        if (currentStep >= 3) {
            const accuracy = Math.min(94, 50 + (progress / 2));
            document.getElementById('accuracy').textContent = `${accuracy.toFixed(1)}%`;
            
            const loss = Math.max(0.15, 2.5 - (progress / 40));
            document.getElementById('loss').textContent = loss.toFixed(2);
            
            const epoch = Math.min(10, Math.floor(progress / 10));
            document.getElementById('epoch').textContent = `${epoch}/10`;
        }
        
        if (progress < 100) {
            requestAnimationFrame(updateProgress);
        } else {
            completeTraining();
        }
    }
    
    // Mark steps as completed
    steps.forEach((stepId, index) => {
        setTimeout(() => {
            document.getElementById(stepId).classList.remove('active');
            document.getElementById(stepId).classList.add('completed');
            currentStep = index + 1;
        }, stepDurations.slice(0, index + 1).reduce((a, b) => a + b, 0));
    });
    
    updateProgress();
}

function completeTraining() {
    document.getElementById('monitorStatus').textContent = 'Completed';
    document.querySelector('.pulse-dot').style.background = '#00ff00';
    
    setTimeout(() => {
        addAssistantMessage(`
            <strong>Training Complete!</strong><br><br>
            Your model has been successfully trained and deployed.<br><br>
            <strong>Results:</strong><br>
            • Accuracy: 94.2%<br>
            • Model: BERT-base fine-tuned<br>
            • Dataset: 160,000 samples<br>
            • Training time: 3 minutes 24 seconds<br><br>
            <strong>API Endpoint:</strong> https://api.addy.ai/models/your-model-id<br><br>
            Your model is now ready to use in production!
        `);
    }, 1000);
}

function handleWaitlist(event) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const email = input.value;
    
    // Simulate API call
    const button = event.target.querySelector('button');
    button.textContent = 'Joining...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = 'You\'re on the list!';
        button.style.background = '#00ff00';
        button.style.color = '#000000';
        input.value = '';
        
        setTimeout(() => {
            button.textContent = 'Join Waitlist';
            button.disabled = false;
            button.style.background = '';
            button.style.color = '';
        }, 3000);
    }, 1500);
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize animations on load
window.addEventListener('load', () => {
    animateOnScroll();
});

// Add scroll reveal effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
    }
});