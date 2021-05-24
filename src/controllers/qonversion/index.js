exports.webhook = async (req, res, next) => {
  try {
    const { event_name: eventName } = req.body;

    console.log(eventName);

    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};
