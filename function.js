document.addEventListener('DOMContentLoaded', () => {
    // Update time and greeting
    function updateTime() {
      const now = new Date();
      const hours = now.getHours();
      const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      document.getElementById('current-time').textContent = timeString;
  
      let greeting;
      if (hours < 12) greeting = 'Good Morning';
      else if (hours < 18) greeting = 'Good Afternoon';
      else greeting = 'Good Evening';
      document.getElementById('greeting').textContent = `${greeting}, Stan 👋`;
    }
    updateTime();
    setInterval(updateTime, 60000);
  
    // Set current year
    document.getElementById('year').textContent = new Date().getFullYear();
  
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      themeToggle.querySelector('i').classList.toggle('fa-moon');
      themeToggle.querySelector('i').classList.toggle('fa-sun');
      localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
  
    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-theme');
      themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
  
    // Fetch quote from local JSON with fallback
    async function fetchQuote() {
      try {
        const response = await fetch('quotes.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const quotes = await response.json();
        if (!Array.isArray(quotes) || quotes.length === 0) {
          throw new Error('Quotes JSON is empty or not an array');
        }
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        if (!randomQuote.text || !randomQuote.author) {
          throw new Error('Quote object missing text or author field');
        }
        document.getElementById('quote').textContent = randomQuote.text;
        document.getElementById('quote-author').textContent = `— ${randomQuote.author}`;
      } catch (error) {
        console.error('Error fetching quote:', error.message);
        // Fallback quote if fetch fails
        document.getElementById('quote').textContent = 'The only way to do great work is to love what you do.';
        document.getElementById('quote-author').textContent = '— Steve Jobs';
      }
    }
    fetchQuote();
    document.getElementById('refresh-quote').addEventListener('click', fetchQuote);
  
    // Fetch Bible verse
    async function fetchVerse() {
      try {
        const response = await fetch('https://bible-api.com/?random=verse');
        const data = await response.json();
        document.getElementById('verse').textContent = data.verses[0].text;
        document.getElementById('verse-ref').textContent = `${data.reference}`;
      } catch (error) {
        document.getElementById('verse').textContent = 'Failed to load verse.';
      }
    }
    fetchVerse();
    document.getElementById('refresh-verse').addEventListener('click', fetchVerse);
  
    // Weather
    async function fetchWeather() {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const apiKey = 'f26833d504f57297e862a1f97c48b192'; // Replace with your API key
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
            );
            const data = await response.json();
            document.getElementById('location').textContent = `${data.name}, ${data.sys.country}`;
            document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weather-description').textContent = data.weather[0].description;
            document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
          });
        } else {
          document.getElementById('location').textContent = 'Geolocation not supported';
        }
      } catch (error) {
        document.getElementById('location').textContent = 'Failed to load weather';
      }
    }
    fetchWeather();
  
    // To-Do List
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task');
    const clearCompletedBtn = document.getElementById('clear-completed');
    const taskCount = document.getElementById('task-count');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function updateTaskCount() {
      const count = tasks.filter(task => !task.completed).length;
      taskCount.textContent = `${count} task${count !== 1 ? 's' : ''}`;
    }
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      updateTaskCount();
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
          <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
          <span>${task.text}</span>
          <button class="delete-task" data-index="${index}"><i class="fas fa-trash"></i></button>
        `;
        taskList.appendChild(li);
      });
    }
  
    addTaskBtn.addEventListener('click', () => {
      const text = newTaskInput.value.trim();
      if (text) {
        tasks.push({ text, completed: false });
        newTaskInput.value = '';
        saveTasks();
        renderTasks();
      }
    });
  
    newTaskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTaskBtn.click();
    });
  
    taskList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const index = e.target.dataset.index;
        tasks[index].completed = e.target.checked;
        saveTasks();
        renderTasks();
      }
    });
  
    taskList.addEventListener('click', (e) => {
      if (e.target.closest('.delete-task')) {
        const index = e.target.closest('.delete-task').dataset.index;
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    });
  
    clearCompletedBtn.addEventListener('click', () => {
      tasks = tasks.filter(task => !task.completed);
      saveTasks();
      renderTasks();
    });
  
    renderTasks();
    updateTaskCount();
  });