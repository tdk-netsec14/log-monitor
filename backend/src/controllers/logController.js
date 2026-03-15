const Log = require("../models/Log");

const createLog = async (req, res) => {
  try {
    const { level, message, source } = req.body;
    const log = await Log.create({ level, message, source });
    res.status(201).json({ success: true, data: log });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

const getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.level) {
      filter.level = req.query.level;
    }

    if (req.query.source) {
      filter.source = req.query.source;
    }

    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    if (req.query.from || req.query.to) {
  filter.timestamp = {};
  if (req.query.from) {
    filter.timestamp.$gte = new Date(req.query.from);
  }
  if (req.query.to) {
    filter.timestamp.$lte = new Date(req.query.to);
  }
}
    const total = await Log.countDocuments(filter);
    const logs = await Log.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { createLog, getLogs };
