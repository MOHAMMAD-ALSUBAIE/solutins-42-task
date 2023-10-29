import express  from "express";
import multer from "multer";
import csvRouter from "./route/fileUpload.route.js";
import path from "path"
const app = express();
const port = process.env.PORT || 3000;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/file/')
    },
    filename: function (req, file, cb) {

        cb(null, "CSV"+path.extname(file.originalname))
    }
})
 const upload = multer({ storage: storage });
//app.use(express.urlencoded({ extended: true }))
app.use('/CSV/upload', upload.single('csvFile'))
app.set('view engine', 'ejs');
app.use('/css',express.static(__dirname+'/css'));

app.get("/", (req, res) => {
    res.render('Form')
})

app.use("/CSV", csvRouter)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})