SELECT * FROM vehicles
JOIN Users ON vehicles.ownerId = users.id
WHERE users.email = $1
