SELECT COUNT(*) FROM vehicles
JOIN Users ON vehicles.ownerId = users.id
WHERE ownerId = $1