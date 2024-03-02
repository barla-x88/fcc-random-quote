import { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PropagateLoader } from 'react-spinners';

function App() {
  const [quote, setQuote] = useState(null);

  const fetchNewQuote = async () => {
    const request = await fetch('https://api.quotable.io/random');
    const newQuote = await request.json();
    setQuote(newQuote);
  };

  useEffect(() => {
    fetchNewQuote();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 p-2"
      id="quote-box"
    >
      <div className="container">
        <div className="row">
          {quote ? (
            <div>
              <q id="text" className="display-5">
                {quote.content}
              </q>
              <cite id="author" className="d-block text-end mt-4 fs-4">
                {quote.author}
              </cite>
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <PropagateLoader color="#36d7b7" />
            </div>
          )}
        </div>
        <div className="row mt-5">
          <button
            type="button"
            className="btn btn-success p-2"
            id="new-quote"
            onClick={fetchNewQuote}
          >
            Get a new quote
          </button>
        </div>
        <div className="row mt-2">
          <a
            className="btn btn-primary p-2"
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
              '"' + quote?.content + '"' + '\n' + quote?.author || ''
            )}`}
            id="tweet-quote"
            target="_blank"
          >
            Tweet This quote
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
