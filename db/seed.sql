INSERT INTO "users"
  ("username", "password")
  VALUES
  ('cactusfox', '$2a$10$SjsbnkvCKXULWpahgf4JRO9KJC.rkZQ3kOw1.Xdnx1ZEkCry683bi'), --123
  ('unicorn10', '$2a$10$8bAccJoswkXyU5iV.AbBCOUg1kgADBSu.jM.hc.nsMHCtDMkW/8Ce'); --123

INSERT INTO "colors"
  ("name", "user_id")
  VALUES
  ('red', 1),
  ('yellow', 1),
  ('blue', 1),
  ('red', 2);
  
INSERT INTO "posts"
  ("title", "text_content", "is_public", "user_id")
  VALUES
  ('Pasta', 'Whoops. I did it again. Ate way too much spaghetti. 🤷‍♂️ What can you do?!', TRUE, 1),
  ('I Have Socks', 'Title says it all. I have socks. Many pairs. Various colors. Various fabrics. They are all good because they fit on my feet.', FALSE, 1),
  ('Moose and Mice', 'It really grinds my gears that both of those capitalized words in the title are plural. It grinds my gears even more that "Moose" can be singular or plural. Who invented this language? It''s like JS for human communication or something.',  TRUE, 2);

INSERT INTO "comments"
  ("text_content", "user_id", "post_id")
  VALUES
  ('I feel this. And I''m not sure what you can do, tbh.', 2, 1),
  ('I am glad to known someone else feels the same.', 1, 1),
  ('Just for the record, I think English is more understandable than JS.', 1, 3);
