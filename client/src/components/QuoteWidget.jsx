import React, { useState, useEffect } from 'react';
import './Widgets.css';

const QUOTES = [
    { text: "Failure is the mother of success.", author: "Thomas Edison" },
    { text: "At the end of hardship comes happiness.", author: "Korean Proverb" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "There is no royal road to learning.", author: "Euclid" },
    { text: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas Edison" },
    { text: "Continuous small efforts lead to big achievements.", author: "Robert Collier" },
    { text: "The best jewel is relentless effort.", author: "Bertolt Brecht" },
    { text: "Success is the meeting of preparation and opportunity.", author: "Bobby Unser" },
    { text: "If you can dream it, you can achieve it.", author: "Walt Disney" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
    { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
    { text: "Education is the key to unlocking the world.", author: "Oprah Winfrey" }
];

const QuoteWidget = () => {
    const [quote, setQuote] = useState(QUOTES[0]);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * QUOTES.length);
        setQuote(QUOTES[randomIndex]);
    }, []);

    return (
        <div className="widget-card quote-widget">
            <h3>🌟 Today's Quote</h3>
            <p className="quote-text">"{quote.text}"</p>
            <p className="quote-author">- {quote.author}</p>
        </div>
    );
};

export default QuoteWidget;
