CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
('Jane Doe', 'https://example.com/tech-review', 'The Future of Quantum Computing', 150);

INSERT INTO blogs (author, url, title) VALUES
('John Smith', 'https://example.com/cooking-blog', 'My Secret Tiramisu Recipe');