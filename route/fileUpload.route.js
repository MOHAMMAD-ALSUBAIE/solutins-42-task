import  express, { Router }  from "express";
import {distributing} from  '../controller/database.controller.js';
const csvRouter=Router()
csvRouter.post("/upload", distributing)
csvRouter.post("/form", distributing)

export default csvRouter