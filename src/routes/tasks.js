const router = require("express").Router();

const Task = require("../models/Tasks");

router.get("/", async (_req, res) => {
    try {
        const result = await Task.find({});
        res.status(200).json({
            tasks: result,
        });
    } catch (err) {
        res.status(500).json({
            error: "Some error ocurred while querying all the tasks",
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Task.findById(id);

        if (!result) {
            return res.status(404).json({
                error: "There is no task at that id",
            });
        }

        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            error: "Some error ocurred while querying all the tasks",
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const { title } = req.body;
        if (!title) {
            return res.status(404).json({
                error: "Provide a valid title",
            });
        }

        const result = await Task.create({ title });
        res.status(201).json({ id: result._id });
    } catch (err) {
        res.status(500).json({
            error: "Some error ocurred while creating the task",
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({ error: "Provide valid id" });
        }

        const result = await Task.findByIdAndDelete(id);

        //console.log(result, "deleted");
        if (result) {
            res.status(204).end();
        } else {
            res.status(404).json({ error: "No task with that id exists" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Some error ocurred while creating the task",
        });
    }
});


module.exports = router;
