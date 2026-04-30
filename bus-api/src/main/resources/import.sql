-- Marcas de buses
INSERT INTO marca_bus (nombre) VALUES ('Volvo');
INSERT INTO marca_bus (nombre) VALUES ('Scania');
INSERT INTO marca_bus (nombre) VALUES ('Mercedes-Benz');
INSERT INTO marca_bus (nombre) VALUES ('Fiat');

-- Buses registrados
INSERT INTO bus (numero_bus, placa, caracteristicas, marca_id, activo, fecha_creacion) VALUES 
('BUS-001', 'ABC-123', 'Asientos reclinables, aire acondicionado, WiFi a bordo', 1, true, CURRENT_TIMESTAMP),

('BUS-002', 'XYZ-987', 'Asientos semicama, pantallas de entretenimiento', 2, true, CURRENT_TIMESTAMP),

('BUS-003', 'DEF-456', 'WiFi, baño a bordo, puertos USB', 3, true, CURRENT_TIMESTAMP),

('BUS-004', 'GHI-789', 'Bus de dos pisos, asientos VIP', 1, true, CURRENT_TIMESTAMP),

('BUS-005', 'JKL-012', 'Servicio estándar', 2, false, CURRENT_TIMESTAMP),

('BUS-006', 'MNO-345', 'Asientos tipo cama, servicio de snacks', 3, true, CURRENT_TIMESTAMP),

('BUS-007', 'PQR-678', 'Cama suite 180°, máxima comodidad', 1, true, CURRENT_TIMESTAMP),

('BUS-008', 'STU-901', 'Baño, WiFi, pantallas individuales', 2, true, CURRENT_TIMESTAMP),

('BUS-009', 'VWX-234', 'Servicio básico económico', 4, true, CURRENT_TIMESTAMP),

('BUS-010', 'YZA-567', 'Bus de dos pisos, servicio cama suite', 1, false, CURRENT_TIMESTAMP);