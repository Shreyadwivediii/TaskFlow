const express = require("express");
const router = express.Router();

const Todo = require("../models/Todo");
const auth = require("../middlewares/auth");

const sendSuccess = (res, data, status = 200) => {
  return res.status(status).json({
    success: true,
    data,
  });
};

const sendError = (res, message, status = 500) => {
  return res.status(status).json({
    success: false,
    message,
  });
};

const getUserTodo = async (id, userId) => {
  const todo = await Todo.findOne({ _id: id, userId });

  if (!todo) {
    return null;
  }

  return todo;
};

router.post("/", auth, async (req, res) => {
  try {
    const { text, priority, category, dueDate } = req.body;

    if (!text || text.trim() === "") {
      return sendError(res, "Task text is required", 400);
    }

    const todo = await Todo.create({
      userId: req.user.id,
      text: text.trim(),
      priority: priority || "Medium",
      category: category || "General",
      dueDate: dueDate || null,
      completed: false,
    });

    return sendSuccess(res, todo, 201);
  } catch (err) {
    return sendError(res, err.message);
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    return sendSuccess(res, todos);
  } catch (err) {
    return sendError(res, err.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const todo = await getUserTodo(req.params.id, req.user.id);

    if (!todo) {
      return sendError(res, "Todo not found", 404);
    }

    const { text, priority, category, dueDate } = req.body;

    if (text !== undefined) todo.text = text.trim();
    if (priority !== undefined) todo.priority = priority;
    if (category !== undefined) todo.category = category;
    if (dueDate !== undefined) todo.dueDate = dueDate || null;

    await todo.save();

    return sendSuccess(res, todo);
  } catch (err) {
    return sendError(res, err.message);
  }
});

router.patch("/:id/toggle", auth, async (req, res) => {
  try {
    const todo = await getUserTodo(req.params.id, req.user.id);

    if (!todo) {
      return sendError(res, "Todo not found", 404);
    }

    todo.completed = !todo.completed;
    await todo.save();

    return sendSuccess(res, todo);
  } catch (err) {
    return sendError(res, err.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const todo = await getUserTodo(req.params.id, req.user.id);

    if (!todo) {
      return sendError(res, "Todo not found", 404);
    }

    await todo.deleteOne();

    return sendSuccess(res, {
      message: "Todo deleted successfully",
    });
  } catch (err) {
    return sendError(res, err.message);
  }
});

module.exports = router;