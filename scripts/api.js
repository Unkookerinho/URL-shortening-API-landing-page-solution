// Api request
const shortenUrl = async (url) => {
  const apiUrl = 'https://api.tinyurl.com/create';
  const apiKey = 'xxOlNvW6I3aJSqZ5ZSGyg4WUGuz23wIx9bkAGE28AM8a5S5Ex7nOLh4psC2x';
  const requestData = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_token: apiKey,
      url: url,
    }),
  };

  // Loading state on button
  const submitButton = document.querySelector('#submitButton');
  submitButton.classList.toggle('btn__loading');
  submitButton.innerText = 'Loading...';

  try {
    const res = await fetch(apiUrl, requestData);
    const data = await res.json();
    //Resetting button state
    submitButton.classList.toggle('btn__loading');
    submitButton.innerText = 'Shorten it!';
    return data.data.tiny_url;
  } catch (e) {
    // Resetting button state
    submitButton.classList.toggle('btn__loading');
    submitButton.innerText = 'Shorten it!';
  }
};

// Initializing request
const urlForm = document.querySelector('#urlForm');

urlForm.addEventListener('submit', async (e) => {
  let inputUrl = document.querySelector('#inputUrl').value;
  const inputWindow = document.querySelector('#inputUrl');
  const errorMessage = document.querySelector('.errorMessage');
  const linksList = document.querySelector('.linksList');

  e.preventDefault();

  const shortenedUrl = await shortenUrl(inputUrl);

  // Creating li element on page
  if (shortenedUrl) {
    // Removing error message every time you successfully shorten url
    inputWindow.classList.remove('error');
    errorMessage.classList.remove('error');

    const li = document.createElement('li');

    const p1 = document.createElement('p');
    p1.innerText = inputUrl;
    p1.classList.add('input');
    li.appendChild(p1);

    const div = document.createElement('div');
    div.classList.add('output-and-button');

    const p2 = document.createElement('p');
    p2.innerText = shortenedUrl;
    p2.classList.add('output');
    div.appendChild(p2);

    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn__square', 'btn__copy');
    btn.innerText = 'Copy';
    div.appendChild(btn);

    li.appendChild(div);
    li.classList.add('liOutput');
    linksList.appendChild(li);
  } else {
    // Displaying error message on input window
    inputWindow.classList.add('error');
    errorMessage.classList.add('error');
  }

  urlForm.reset();
});

// Copying link
const linksList = document.querySelector('.linksList');

// Event listener on parent that works on every added button
linksList.addEventListener('click', (e) => {
  // Checking if clicked element is copy button
  if (e.target.classList.contains('btn__copy')) {
    const btn = e.target;

    // Removing copied state on all other buttons
    const allBtns = document.querySelectorAll('.btn__copy');
    allBtns.forEach((btn) => {
      btn.classList.remove('btn__copied');
      btn.innerText = 'Copy';
    });

    // Button copied state on clicked button
    btn.classList.add('btn__copied');
    btn.innerText = 'Copied!';

    // Copy function
    const li = btn.closest('.liOutput');
    const urlToCopy = li.querySelector('.output').innerText;
    navigator.clipboard.writeText(urlToCopy);
  }
});
