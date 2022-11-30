const router = require("express").Router();

const {default: mongoose} = require("mongoose");
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
        const { title, tasks } = req.body;
        if (!title && !tasks) {
            return res.status(404).json({
                error: "Provide a valid title or tasks array to add",
            });
        }

        if (title) {
            const result = await Task.create({ title });
            return res.status(201).json({ id: result._id });
        }

        if (tasks) {
            const result = await Task.create(tasks);
            const responseArr = result.map(taskObj => {
                return {id: taskObj._id}
            });
            return res.status(201).json({
                tasks: responseArr
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "Some error ocurred while creating the task",
        });
    }
});

//bulk delete

router.delete("/", async (req, res) => {
    try {
        const { tasks } = req.body;
        if (!tasks) {
            return res.status(404).json({ error: "Provide valid tasks array with object containing ids to delete" });
        }

        const deleteQueryArr = tasks.map(taskObj => {
            return taskObj.id
        })
        //console.log(deleteQueryArr)
        const result = await Task.deleteMany({_id: { $in : deleteQueryArr}});

        console.log(result, "deleted");
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

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, is_completed } = req.body;

        if (!id) {
            return res.status(404).json({ error: "Provide valid id" });
        }

        if (title === undefined || is_completed === undefined) {
            return res.status(404).json({
                error: "Provide valid title and is_completed property",
            });
        }

        const result = await Task.findById(id);

        //console.log(result, "deleted");
        if (!result) {
            return res
                .status(404)
                .json({ error: "There is not task at that id" });
        }

        const newTask = await Task.findByIdAndUpdate(
            id,
            { $set: { title, is_completed } },
            { new: true }
        );
        console.log(newTask, "updated task");
        res.status(204).end();
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Some error ocurred while creating the task",
        });
    }
});

module.exports = router;
