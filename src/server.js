const express = require('express');
// importing Express.js
// import express from 'express';

const server = express();

server.use(express.json());

server.get('/', (req, res) => res.status(200).json({ ok: 'OK' }));

server.listen(3333);
