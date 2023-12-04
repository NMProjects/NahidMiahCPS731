const express = require("express");

const supa = require("./database.js");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
    res.send("Backend API is running 🎉");
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/signUp", async function (req, res) {
    var username = req.body["name"];
    var password = req.body["password"];

    const { error } = await supa.supaClient
        .from("users")
        .insert({ username: username, password: password });

    if (error) {
        res.status(404).json({
            status: 404,
            error: "Cannot make user",
            data: [],
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: "",
        });
    }
});

app.post("/login", async function (req, res) {
    var username = req.body["name"];
    var password = req.body["password"];

    const { data, error } = await supa.supaClient
        .from("users")
        .select()
        .eq("username", username)
        .eq("password", password);

    if (data[0] == null) {
        res.status(404).json({
            status: 404,
            error: "Cannot verify login information",
            data: [],
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: "",
        });
    }
});

app.post("/postReview", async function (req, res) {
    var type = req.body["type"];
    var reviewTitle = req.body["reviewTitle"];
    var user = req.body["user"];
    var review = req.body["review"];
    var rating = req.body["rating"];
    var university = req.body["university"];

    if (type == "course") {
        var course = req.body["course"];
        var difficulty = req.body["difficulty"];
        var enjoyment = req.body["enjoyment"];
        var material = req.body["material"];
        var grade = req.body["grade"];

        const { error } = await supa.supaClient.from("reviews").insert({
            type: type,
            course: course,
            difficulty: difficulty,
            enjoyment: enjoyment,
            material: material,
            review: review,
            grade: grade,
            reviewtitle: reviewTitle,
            user: user,
            rating: rating,
            university: university,
        });

        if (error) {
            res.status(404).json({
                status: 404,
                error: "Cannot submit review",
                data: [],
            });
        } else {
            res.status(200).json({
                status: 200,
                statusText: "OK",
                data: "",
            });
        }
    } else if (type == "professor") {
        var course = req.body["course"];
        var clarity = req.body["clarity"];
        var gradingDifficulty = req.body["gradingDifficulty"];
        var helpfulness = req.body["helpfulness"];
        var professor = req.body["professor"];

        const { error } = await supa.supaClient.from("reviews").insert({
            type: type,
            course: course,
            clarity: clarity,
            gradingdifficulty: gradingDifficulty,
            helpfulness: helpfulness,
            review: review,
            reviewtitle: reviewTitle,
            user: user,
            rating: rating,
            university: university,
            professor: professor,
        });

        if (error) {
            res.status(404).json({
                status: 404,
                error: "Cannot submit review",
                data: [],
            });
        } else {
            res.status(200).json({
                status: 200,
                statusText: "OK",
                data: "",
            });
        }
    } else if (type == "university") {
        const { error } = await supa.supaClient.from("reviews").insert({
            type: type,
            university: university,
            review: review,
            reviewtitle: reviewTitle,
            user: user,
            rating: rating,
        });

        if (error) {
            res.status(404).json({
                status: 404,
                error: "Cannot submit review",
                data: [],
            });
        } else {
            res.status(200).json({
                status: 200,
                statusText: "OK",
                data: "",
            });
        }
    } else {
        res.status(404).json({
            status: 404,
            error: "Cannot submit review!",
            data: [],
        });
        return;
    }
});

app.get("/getProfessor/:professor", async (req, res) => {
    var professor = req.params["professor"];

    const data = await supa.supaClient
        .from("reviews")
        .select(
            "university, course, professor, rating, clarity, gradingdifficulty, helpfulness, review, reviewtitle, user"
        )
        .ilike("professor", `%${professor}%`)
        .eq("type", "professor");

    if (data === null) {
        res.status(404).json({
            status: 404,
            error: "Resource not found",
            data: [],
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: data.data,
        });
    }
    return;
});

app.get("/getUniversity/:university", async (req, res) => {
    var university = req.params["university"];

    const data = await supa.supaClient
        .from("reviews")
        .select("university, rating, review, reviewtitle, user")
        .ilike("university", `%${university}%`)
        .eq("type", "university");

    if (data === null) {
        res.status(404).json({
            status: 404,
            error: "Resource not found",
            data: [],
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: data.data,
        });
    }
    return;
});

app.get("/getCourse/:course", async (req, res) => {
    var course = req.params["course"];

    const data = await supa.supaClient
        .from("reviews")
        .select(
            "university, course, rating, difficulty, enjoyment, material, review, reviewtitle, user, grade"
        )
        .ilike("course", `%${course}%`)
        .eq("type", "course");

    if (data === null) {
        res.status(404).json({
            status: 404,
            error: "Resource not found",
            data: [],
        });
    } else {
        res.status(200).json({
            status: 200,
            statusText: "OK",
            data: data.data,
        });
    }
    return;
});
