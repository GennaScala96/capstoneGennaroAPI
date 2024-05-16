import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.get("/get-name", async (req, res) => {
    try {
        const response = await axios.get("https://v2.jokeapi.dev/joke/Any");
        res.render("index.ejs", { joke: JSON.stringify(response.data.setup), 
            answer: JSON.stringify(response.data.delivery) 
        });
    } catch (error) {
        console.log(error.message);
        res.status(500)
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});