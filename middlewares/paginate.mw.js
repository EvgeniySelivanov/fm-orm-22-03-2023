const createError = require('http-errors');

module.exports = async (req, res, next) => {
  try {
    const { query: { limit, offset } } = req;
    // if (!limit || !offset) {
    //   return next(createError(412, 'Precondition Failed'));
    // }
    req.paginate = {
      limit: limit > 100 || limit <= 0 ? 100 : limit,
      offset: offset < 0 ? 0 : offset,
    };

  } catch (error) {
    next(error)
  }
}


