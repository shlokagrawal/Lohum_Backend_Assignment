const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();
app.use(express.json());

app.get("/", function (req,res) {
    res.send("<h1 style='font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; color: #333333; text-align: center;'>Test it with /price</h1>");
});

app.get("/price", async function(req,res) {
    try {
        const url = "https://www.metal.com/Lithium-ion-Battery/202303240001";
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const price = $(
            "#__next > div > div.main___1ft3R.detail___2oeiJ > div.left___wCEQV > div:nth-child(3) > div.metalsContent___3T_m3 > div.priceContent___3lf_D > div > div:nth-child(1) > span.strong___1JlBD.priceDown___2TbRQ"
        ).text();
        // console.log(price);
        res.status(200).json({Price: price});
    } catch (error) {
        console.log(error);
        res.status(404).json({ Error: "Currently, not able to fetch the price" });
    }
});

app.listen(5000, function() {
    console.log("Server started at port 5000.");
});