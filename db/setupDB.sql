CREATE USER rookplayer WITH PASSWORD 'rookplayer';
CREATE DATABASE rook OWNER rookplayer;

/* Do not need these if rookplayer is owner */
GRANT SELECT, INSERT, UPDATE ON suit, card TO rookplayer;
GRANT SELECT, INSERT, UPDATE ON bid, bid_win, game, hand, hand_cards, player, player_team, round, round_points, team, trick, trick_cards  TO rookplayer;
GRANT SELECT, USAGE, UPDATE ON suit_id_seq, card_id_seq, bid_id_seq, bid_win_id_seq, game_id_seq, hand_id_seq, hand_cards_id_seq, player_id_seq, round_id_seq, team_id_seq, trick_id_seq TO rookplayer;
GRANT DELETE ON game, hand, player TO rookplayer;


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
    firstName VARCHAR(250),
    lastName VARCHAR(250),
    email VARCHAR(250),
    password VARCHAR(255)
);

/* Need encrypted password
INSERT INTO player (username, firstName, lastName, email, password)
VALUES ('prbowler1', 'Philip', 'Bowler', 'prbowler1@gamil.com','prbowler1'),
       ('prbowler2', 'Philip', 'Bowler', 'prbowler1@gamil.com','prbowler2'),
       ('prbowler3', 'Philip', 'Bowler', 'prbowler1@gamil.com','prbowler3'),
       ('prbowler4', 'Philip', 'Bowler', 'prbowler1@gamil.com','prbowler4');


INSERT INTO player (username, firstName, lastName, email, password)
VALUES ('widow', 'Widow', 'Widow', 'widow','widow');
*/

/* May not be needed
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name VARCHAR(250)
);

INSERT INTO team (name)
VALUES ('prbowler'), ('bobo'), ('momo'), ('test') ;

CREATE TABLE player_team (
    playerID INT references player(id),
    teamID INT references team(id)
);

INSERT INTO player_team (playerID, teamID) VALUES (1,1), (2,2), (3,1), (4,2);
*/

CREATE TABLE game (
    name VARCHAR(250) NOT NULL PRIMARY KEY,
    player1 VARCHAR(250) references player(username),
    player2 VARCHAR(250) references player(username),
    player3 VARCHAR(250) references player(username),
    player4 VARCHAR(250) references player(username),
    score1 INT DEFAULT 0,
    score2 INT DEFAULT 0,
    trump INT references suit(id) DEFAULT 5,
    round INT DEFAULT 1,
    hand INT DEFAULT 1,
    bid INT DEFAULT 0,
    pass VARCHAR(250) [],
    bidwinner VARCHAR(255) REFERENCES player(username)
);

CREATE TABLE round (
    id SERIAL PRIMARY KEY,
    gameID VARCHAR(255) references game(name)
);

INSERT INTO round (gameID)
VALUES (1);

CREATE TABLE round_points (
    teamID INT REFERENCES team(ID),
    gameID INT REFERENCES game(ID),
    points INT
);

CREATE TABLE hand (
    id SERIAL PRIMARY KEY,
    gameName VARCHAR(250) references game(name),
    username VARCHAR(250) references player(username),
    cards INT[]
);

/* May not need
CREATE TABLE hand_cards (
    id SERIAL PRIMARY KEY,
    handID INT references hand(id),
    cardID INT references card(id),
    roundID INT references round(id),
    played BOOLEAN DEFAULT false
);

INSERT INTO hand_cards (handID, cardID, roundID)
VALUES (handID, cardID, roundID);
*/

CREATE TABLE trick (
    id SERIAL PRIMARY KEY,
    gameName VARCHAR(250) REFERENCES game(name) NOT NULL,
    roundID INT NOT NULL,
    trickNumber INT NOT NULL,
    winnerID VARCHAR(250) references player(username),
    points INT
);

CREATE TABLE trick_cards (
    trickID INT references trick(id),
    cardID INT references card(id),
    playerName VARCHAR(250) REFERENCES player(username)
);

CREATE TABLE bid (
    bidGame VARCHAR(250) references game(name),
    round INT,
    pass VARCHAR[],
    amount INT DEFAULT 0,
    bidWinner VARCHAR(250) references player(username)
);

CREATE TABLE bid_win (
    id SERIAL PRIMARY KEY,
    bidID INT references bid(id),
    trump INT references suit(id)
);


SELECT c.id, c.suit, c.number, c.value FROM card as c, hand_cards AS hc WHERE hc.cardID = c.id AND hc.handID = 1;
DELETE FROM hand_cards WHERE roundID = 1;

select c.id, c.suit, c.value from card as c, hand as h where c.id = ANY(h.cards) and h.id = 9;

ALTER TABLE game ADD COLUMN bid INT DEFAULT 0;
ALTER TABLE game ADD COLUMN bidwinner VARCHAR(255) REFERENCES player(username);
ALTER TABLE game ADD COLUMN pass VARCHAR(255) [];
