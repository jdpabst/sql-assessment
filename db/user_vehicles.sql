SELECT * FROM vehicles
JOIN Users ON vehicles.ownerId = users.id
WHERE ownerid = $1