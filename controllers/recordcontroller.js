const Record = require('../models/Record');

exports.getRecords = async (req, res) => {
  const records = await Record.find({ userId: req.user.id });
  res.render('records', { records });
};

exports.createRecord = async (req, res) => {
  const { name, description } = req.body;
  await Record.create({ name, description, userId: req.user.id });
  res.redirect('/records');
};

exports.updateRecord = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  await Record.findByIdAndUpdate(id, { name, description });
  res.redirect('/records');
};

exports.deleteRecord = async (req, res) => {
  const { id } = req.params;
  await Record.findByIdAndDelete(id);
  res.redirect('/records');
};
