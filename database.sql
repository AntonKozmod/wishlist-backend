CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    surname VARCHAR(255),
    is_admin BOOLEAN
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    person_id INT,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    FOREIGN KEY (person_id) REFERENCES person(id)
);

CREATE TABLE image (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255),
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    person_id INT,
    post_id INT,
    FOREIGN KEY (person_id) REFERENCES person(id),
    FOREIGN KEY (post_id) REFERENCES post(id)
);
