CREATE TABLE suit (
                      id SERIAL PRIMARY KEY,
                      name VARCHAR(250),
                      color VARCHAR(250)
);
INSERT INTO suit (name, color)
VALUES ('red', 'red'), ('yellow', 'yellow'), ('black', 'black'), ('green', 'green'), ('rook', 'none');

CREATE TABLE card (
                      id SERIAL PRIMARY KEY,
                      suit INT references suit(id),
                      number INT,
                      value INT
);
INSERT INTO card (suit, number, value)
VALUES (1, 1, 15), (1, 14, 10), (1, 13, 0), (1, 12, 0), (1, 11, 0), (1, 10, 10), (1, 9, 0), (1, 8, 0), (1, 7, 0), (1, 6, 0), (1, 5, 5),
       (2, 1, 15), (2, 14, 10), (2, 13, 0), (2, 12, 0), (2, 11, 0), (2, 10, 10), (2, 9, 0), (2, 8, 0), (2, 7, 0), (2, 6, 0), (2, 5, 5),
       (3, 1, 15), (3, 14, 10), (3, 13, 0), (3, 12, 0), (3, 11, 0), (3, 10, 10), (3, 9, 0), (3, 8, 0), (3, 7, 0), (3, 6, 0), (3, 5, 5),
       (4, 1, 15), (4, 14, 10), (4, 13, 0), (4, 12, 0), (4, 11, 0), (4, 10, 10), (4, 9, 0), (4, 8, 0), (4, 7, 0), (4, 6, 0), (4, 5, 5),
       (5, 0, 20);

CREATE TABLE player (
                        username VARCHAR(250) NOT NULL PRIMARY KEY,
                        password VARCHAR(250)
);

CREATE TABLE game (
                      name VARCHAR(250) NOT NULL PRIMARY KEY
);

CREATE TABLE team (
                      gameName VARCHAR(250) REFERENCES game(name) PRIMARY KEY,
                      players VARCHAR(250) [],
                      team1 VARCHAR(250) [],
                      team2 VARCHAR(250) []
);

CREATE TABLE hand (
                      gameName VARCHAR(250) references game(name),
                      username VARCHAR(250) references player(username),
                      cards INT[]
);

CREATE TABLE trick (
                       gameName VARCHAR(250) REFERENCES game(name) NOT NULL PRIMARY KEY,
                       playerCards VARCHAR(250) []
);

CREATE TABLE bid (
                     gameName VARCHAR(250) references game(name) NOT NULL PRIMARY KEY,
                     bids VARCHAR(250) []
);

CREATE TABLE round (
                       gameName VARCHAR(250) references game(name) NOT NULL PRIMARY KEY,
                       round INT DEFAULT 1,
                       bid INT DEFAULT 0,
                       trump INT REFERENCES suit(id),
                       bidWinner VARCHAR(250) references player(username)
);

CREATE TABLE score (
                       gameName VARCHAR(250) REFERENCES game(name) NOT NULL PRIMARY KEY,
                       gameScore VARCHAR(250) DEFAULT 0,
                       roundScore VARCHAR(250) DEFAULT 0,
                       trickScore VARCHAR(250) DEFAULT 0
);