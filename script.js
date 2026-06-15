
const btn = document.querySelector('.btn');

const msg = document.querySelector('.msg');

const copyBtn = document.querySelector('#copy');

async function generateQuote() {

  
  const originalText = btn.textContent;
  btn.disabled = true;
  btn.textContent = 'Generating…';

  try {
    const res = await fetch('https://dummyjson.com/quotes/random');
    if (!res.ok) throw new Error('Network response was not ok: ' + res.status);
    const data = await res.json();
    msg.textContent = `"${data.quote}" — ${data.author}`;
  } catch (err) {

    console.error(err);
    msg.textContent = 'Oops! Something went wrong. Please try again later.';
  } finally {
    btn.disabled = false;
    btn.textContent = originalText;
  }
}

btn.addEventListener('click', generateQuote);

function copyQuote() {
  const quoteText = msg.textContent;
  if (quoteText.trim()) {
    navigator.clipboard.writeText(quoteText)
      .then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = '', 1500);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  }
}

copyBtn.addEventListener('click', copyQuote);


