// Initialize the dashboard when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    updateDateTime();
    loadQuote();
    loadVerse();
    loadWeather();
    initTodoList();
    initThemeToggle();
  
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
  
    // Add event listeners for refresh buttons
    document.getElementById('refresh-quote').addEventListener('click', loadQuote);
    document.getElementById('refresh-verse').addEventListener('click', loadVerse);
  });
  
  // Update greeting based on time of day
  function updateGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById('greeting');
    const userName = 'Stan'; // Could be made dynamic with localStorage
  
    let greetingText;
    if (hour < 12) {
      greetingText = 'Good Morning';
    } else if (hour < 18) {
      greetingText = 'Good Afternoon';
    } else {
      greetingText = 'Good Evening';
    }
  
    greeting.textContent = `${greetingText}, ${userName}!`;
  }
  
  // Update date and time display
  function updateDateTime() {
    const timeElement = document.getElementById('time');
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
  
    const updateTime = () => {
      const now = new Date();
      timeElement.textContent = now.toLocaleDateString('en-US', options);
    };
  
    updateTime();
    setInterval(updateTime, 60000); // Update every minute
  }
  
  // Load and display motivational quote
  function loadQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('quote-author');
  
    quoteElement.textContent = 'Loading motivational magic...';
    authorElement.textContent = '';
  
    // Simulating API call with some sample quotes
    const quotes = [
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
      { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
      { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
      { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" }
    ];
  
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      quoteElement.textContent = `"${randomQuote.text}"`;
      authorElement.textContent = randomQuote.author;
  
      // Add fade-in animation
      quoteElement.style.opacity = 0;
      authorElement.style.opacity = 0;
  
      setTimeout(() => {
        quoteElement.style.transition = 'opacity 1s ease';
        authorElement.style.transition = 'opacity 1s ease';
        quoteElement.style.opacity = 1;
        authorElement.style.opacity = 1;
      }, 100);
    }, 1000);
  }
  
  // Load and display Bible verse
  function loadVerse() {
    const verseElement = document.getElementById('verse');
    const referenceElement = document.getElementById('verse-reference');
  
    verseElement.textContent = 'Bringing heavenly vibes...';
    referenceElement.textContent = '';
  
    // Simulating API call with some sample verses
    const verses = [
      { text: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.", reference: "Jeremiah 29:11" },
      { text: "I can do all things through Christ who strengthens me.", reference: "Philippians 4:13" },
      { text: "Trust in the LORD with all your heart and lean not on your own understanding.", reference: "Proverbs 3:5" },
      { text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.", reference: "Joshua 1:9" },
      { text: "The LORD is my shepherd, I lack nothing.", reference: "Psalm 23:1" }
    ];
  
    setTimeout(() => {
      const randomVerse = verses[Math.floor(Math.random() * verses.length)];
      verseElement.textContent = randomVerse.text;
      referenceElement.textContent = randomVerse.reference;
  
      // Add fade-in animation
      verseElement.style.opacity = 0;
      referenceElement.style.opacity = 0;
  
      setTimeout(() => {
        verseElement.style.transition = 'opacity 1s ease';
        referenceElement.style.transition = 'opacity 1s ease';
        verseElement.style.opacity = 1;
        referenceElement.style.opacity = 1;
      }, 100);
    }, 1000);
  }
  
  // Load and display weather information
  function loadWeather() {
    const locationElement = document.getElementById('location');
    const temperatureElement = document.getElementById('temperature');
    const weatherIconElement = document.getElementById('weather-icon');
    const weatherDescElement = document.getElementById('weather-description');
  
    // Simulating weather data for demo purposes
    setTimeout(() => {
      locationElement.textContent = 'San Francisco, CA';
      temperatureElement.textContent = '72°F';
      weatherDescElement.textContent = 'Partly Cloudy';
  
      // Display weather icon
      weatherIconElement.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163661.png';
      weatherIconElement.style.display = 'block';
    }, 1000);
  
    // In a real app, you would use geolocation and a weather API:
    /*
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
  
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=YOUR_API_KEY&units=imperial`)
          .then(response => response.json())
          .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°F`;
            weatherDescElement.textContent = data.weather[0].description;
            weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            weatherIconElement.style.display = 'block';
          })
          .catch(error => {
            console.error('Error fetching weather:', error);
            locationElement.textContent = 'Could not load weather. Please try again later.';
          });
      });
    }
    */
  }
  
  // To-Do List functionality
  function initTodoList() {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    // Function to render tasks
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
  
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
          tasks[index].completed = checkbox.checked;
          saveTasks();
          renderTasks();
        });
  
        const span = document.createElement('span');
        span.textContent = task.text;
        if (task.completed) {
          span.style.textDecoration = 'line-through';
        }
  
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-task';
        deleteBtn.addEventListener('click', () => {
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });
  
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
      });
    }
  
    // Function to save tasks to localStorage
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    // Add new task
    addTaskButton.addEventListener('click', () => {
      const taskText = newTaskInput.value.trim();
      if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        newTaskInput.value = '';
      }
    });
  
    // Allow adding task with Enter key
    newTaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTaskButton.click();
      }
    });
  
    // Initial render
    renderTasks();
  }
  
  // Theme toggle functionality
  function initThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
  
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.className = savedTheme;
    }
  
    toggleButton.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
      } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
      }
    });
  }
  