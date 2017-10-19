INSERT INTO cart (name,price, quantity,image, authid) VALUES ($1,$2, $3,$4,$5);
SELECT * FROM cart WHERE authid = $5;
